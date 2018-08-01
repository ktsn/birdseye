<template>
  <div class="birdseye-app">
    <div class="app-inner">
      <aside class="app-side">
        <NavSide
          :declarations="declarations"
          :component="$route.params.component"
          :pattern="$route.params.pattern" />
      </aside>

      <main
        ref="slot"
        class="app-preview" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComponentDeclaration } from '@birdseye/core'
import NavSide from './components/NavSide.vue'

export default Vue.extend({
  components: {
    NavSide
  },

  props: {
    declarations: {
      type: Array as () => ComponentDeclaration[],
      default: () => []
    }
  },

  mounted() {
    // Hack for avoid processing slot in Vue
    const slot = document.createElement('slot')
    const wrapper = this.$refs.slot as HTMLElement
    wrapper.appendChild(slot)
  }
})
</script>

<style src="k-css/k.css">
</style>

<style>
:host {
  --color-base: #f1f8fd;
  --color-main: #828bec;
  --color-preview-background: #fff;
  --width-side: 280px;
  --padding-preview: 20px;
}
</style>

<style scoped>
.birdseye-app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-inner {
  display: flex;
  width: 100%;
  height: 100%;
}

.app-side {
  overflow: auto;
  flex: none;
  padding: 20px;
  width: var(--width-side);
  background-color: var(--color-base);
}

.app-preview {
  overflow: auto;
  flex: 1 1 auto;
  padding: var(--padding-preview);
  background-color: var(--color-preview-background);
}
</style>
