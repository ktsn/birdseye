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
  // We need to mount an individual root so that the users can inject
  // some object to the internal root.
  const Root = Vue.extend({
    data() {
      return {
        props: {} as Record<string, any>,
        data: {} as Record<string, any>
      }
    },

    methods: {
      collectDefaultData(): Record<string, any> {
        const child = this.$refs.child as Vue
        const data = child.$options.data

        if (typeof data !== 'function') {
          return {}
        }

        return data.call(child)
      },

      applyData(newData: Record<string, any>): void {
        const child = this.$refs.child as Vue
        if (child) {
          const defaultData = this.collectDefaultData()

          Object.keys(child.$data).forEach(key => {
            child.$data[key] = key in newData ? newData[key] : defaultData[key]
          })
        }
      },

      updateComponent(component: Component | null): void {
        const vm: any = this
        vm.component = component
        this.$forceUpdate()
      }
    },

    watch: {
      data: 'applyData'
    },

    created() {
      const vm: any = this
      vm.component = null
    },

    updated() {
      this.applyData(this.data)
    },

    mounted() {
      this.applyData(this.data)
    },

    render(h): VNode {
      const vm: any = this
      if (!vm.component) {
        return h()
      }

      return h(vm.component, {
        props: this.props,
        ref: 'child'
      })
    }
  })

  // We need to immediately mount root instance to let devtools detect it
  // To make sure devtools to detect root instance, we need to create placeholder
  // element and attach root instance to it.
  const root = new Root(rootOptions).$mount()
  const placeholder: any = document.createComment('Birdseye placeholder')
  placeholder.__vue__ = root
  document.body.appendChild(placeholder)

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

      computed: {
        filledProps(): Record<string, any> {
          const filled = { ...this.props }
          Object.keys(metaProps).forEach(key => {
            if (filled[key] != null) {
              return
            }
            const meta = metaProps[key]
            filled[key] =
              'defaultValue' in meta
                ? meta.defaultValue
                : inferValueFromType(meta.type)
          })
          return filled
        },

        // We need to clone data to collectly track some dependent value is changed
        clonedData(): Record<string, any> {
          return { ...this.data }
        }
      },

      watch: {
        filledProps: {
          handler(newProps: Record<string, any>): void {
            root.props = newProps
          },
          immediate: true
        },

        clonedData: {
          handler(newData: Record<string, any>): void {
            root.data = newData
          },
          immediate: true
        }
      },

      mounted() {
        root.updateComponent(Component)
        this.$el.appendChild(root.$el)
      },

      beforeDestroy() {
        root.updateComponent(null)
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
