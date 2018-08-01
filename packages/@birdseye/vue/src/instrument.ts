import Vue, { Component, VueConstructor, VNode } from 'vue'
import { ComponentDeclaration } from '@birdseye/core'

export function instrument(Component: any): ComponentDeclaration {
  const options =
    typeof Component === 'function' ? Component.options : Component

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

export function wrap(Component: Component): VueConstructor {
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
      return h(Component, { props: this.props, ref: 'child' })
    }
  })
}
