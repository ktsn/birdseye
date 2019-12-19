<script lang="tsx">
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
      required: true
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
    const data = {
      props: {
        props: pattern ? pattern.props : {},
        data: pattern ? pattern.data : {}
      },
      scopedSlots: pattern ? pattern.slots : {}
    }

    const containerStyle: Partial<CSSStyleDeclaration> = {
      boxSizing: 'border-box',
      padding: '20px',
      height: '100%',
      ...(pattern ? pattern.containerStyle : {})
    }

    return (
      <div id="__birdseye_preview__" style={containerStyle}>
        <Wrapper {...data} />
      </div>
    )
  }
})
</script>
