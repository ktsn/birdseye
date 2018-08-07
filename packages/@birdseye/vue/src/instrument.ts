import Vue, { Component, VueConstructor, VNode, ComponentOptions } from 'vue'
import {
  normalizeMeta,
  ComponentDeclaration,
  ComponentDataInfo,
  ComponentDataType
} from '@birdseye/core'

export function createInstrument(
  Vue: VueConstructor,
  rootOptions: ComponentOptions<any> = {}
) {
  return {
    instrument,
    wrap
  }

  function instrument(Component: Component): ComponentDeclaration {
    const options =
      typeof Component === 'function' ? (Component as any).options : Component

    const rawMeta = options.__birdseye || {}
    const meta = normalizeMeta({
      name: rawMeta.name || options.name,
      props: rawMeta.props,
      data: rawMeta.data,
      patterns: rawMeta.patterns
    })

    const Wrapper = wrap(Component, meta.props)

    return {
      Wrapper,
      meta
    }
  }

  function wrap(
    Component: Component,
    metaProps: Record<string, ComponentDataInfo> = {}
  ): VueConstructor {
    // We need to mount an individual root so that the users can inject
    // some object to the internal root.
    const InternalRoot = Vue.extend({
      data() {
        return {
          props: {} as Record<string, any>,
          data: {} as Record<string, any>
        }
      },

      computed: {
        filledProps(): Record<string, any> {
          const filled = { ...this.props }
          Object.keys(metaProps).forEach(key => {
            if (filled[key] != null) {
              return
            }
            const meta = metaProps[key]
            filled[key] =
              meta.defaultValue != null
                ? meta.defaultValue
                : inferValueFromType(meta.type)
          })
          return filled
        }
      },

      methods: {
        applyData(newData: Record<string, any>): void {
          const child = this.$refs.child as Vue
          Object.keys(child.$data).forEach(key => {
            child.$data[key] = newData[key]
          })
        }
      },

      watch: {
        data(newData: Record<string, any>) {
          this.applyData(newData)
        }
      },

      mounted() {
        this.applyData(this.data)
      },

      render(h): VNode {
        return h(Component, {
          props: this.filledProps,
          ref: 'child'
        })
      }
    })

    return Vue.extend({
      name: 'ComponentWrapper',

      props: {
        props: {
          type: Object,
          required: true
        },

        data: {
          type: Object,
          required: true
        }
      },

      watch: {
        props(newProps: Record<string, any>): void {
          const vm: any = this
          vm.internalRoot.props = newProps
        },

        data(newData: Record<string, any>): void {
          const vm: any = this
          vm.internalRoot.data = newData
        }
      },

      created() {
        const vm: any = this
        const root = (vm.internalRoot = new InternalRoot(rootOptions))
        root.props = this.props
        root.data = this.data
      },

      mounted() {
        const root = (this as any).internalRoot
        root.$mount()
        this.$el.appendChild(root.$el)
      },

      beforeDestroy() {
        const vm: any = this
        vm.internalRoot.$destroy()
      },

      render(h): VNode {
        return h('div')
      }
    })
  }
}

function inferValueFromType(
  type: ComponentDataType | ComponentDataType[]
): any {
  if (Array.isArray(type)) {
    return inferValueFromType(type[0])
  }

  switch (type) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'object':
      return {}
    case 'array':
      return []
    default:
      return undefined
  }
}
