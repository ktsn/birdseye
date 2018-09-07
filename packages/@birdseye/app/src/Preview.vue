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
      return this.store.state.declarations.find(d => {
        return d.meta.name === this.meta
      })
    }
  },

  render(h): VNode {
    if (!this.targetDeclaration) {
      return h()
    }

    const { Wrapper } = this.targetDeclaration
    const pattern = this.store.getPattern(this.meta, this.pattern)

    return h(Wrapper, {
      props: {
        props: pattern ? pattern.props : {},
        data: pattern ? pattern.data : {}
      }
    })
  }
})
</script>
