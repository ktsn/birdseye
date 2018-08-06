import Vue, { Component, VueConstructor, VNode, ComponentOptions } from 'vue'
import { ComponentDeclaration } from '@birdseye/core'

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

    const Wrapper = wrap(Component)
    const meta = options.__birdseye || {
      name: options.name || '<Anonymus Component>',
      patterns: []
    }

    return {
      Wrapper,
      name: meta.name,
      patterns: meta.patterns
    }
  }

  function wrap(Component: Component): VueConstructor {
    // We need to mount an individual root so that the users can inject
    // some object to the internal root.
    const InternalRoot = Vue.extend({
      data() {
        return {
          props: {},
          data: {}
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
          props: this.props,
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
