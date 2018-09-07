<script lang="ts">
import Vue, { VNode } from 'vue'
import { ComponentDeclaration, ComponentPattern } from '@birdseye/core'
import AppStore from './store'

export default Vue.extend({
  props: {
    meta: {
      type: String,
      required: true
    },

    pattern: {
      type: String,
      default: null
    },

    store: {
      type: Object as () => AppStore,
      required: true
    }
  },

  computed: {
    targetDeclaration(): ComponentDeclaration | undefined {
      return this.store.state.declarations.filter(d => {
        return d.meta.name === this.meta
      })[0]
    },

    targetPattern(): ComponentPattern | undefined {
      const decl = this.targetDeclaration

      if (!decl || !this.pattern) return

      return decl.meta.patterns.filter(p => {
        return p.name === this.pattern
      })[0]
    }
  },

  render(h): VNode {
    if (!this.targetDeclaration) {
      return h()
    }

    const { Wrapper } = this.targetDeclaration
    const { props, data } = this.targetPattern || { props: {}, data: {} }

    return h(Wrapper, {
      props: {
        props,
        data
      }
    })
  }
})
</script>
