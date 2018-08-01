<script lang="ts">
import Vue, { VNode } from 'vue'
import { ComponentDeclaration, ComponentPattern } from '@birdseye/core'

export default Vue.extend({
  props: {
    component: {
      type: String,
      required: true
    },

    pattern: {
      type: String,
      required: true
    },

    declarations: {
      type: Array as () => ComponentDeclaration[],
      required: true
    }
  },

  computed: {
    targetDeclaration(): ComponentDeclaration | undefined {
      return this.declarations.filter(d => {
        return d.name === this.component
      })[0]
    },

    targetPattern(): ComponentPattern | undefined {
      const decl = this.targetDeclaration

      if (!decl) return

      return decl.patterns.filter(p => {
        return p.name === this.pattern
      })[0]
    }
  },

  render(h): VNode {
    if (!this.targetDeclaration || !this.targetPattern) {
      return h()
    }

    const { Wrapper } = this.targetDeclaration
    const { props, data } = this.targetPattern

    return h(Wrapper, {
      props: {
        props,
        data
      }
    })
  }
})
</script>
