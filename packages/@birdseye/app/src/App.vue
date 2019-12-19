<template>
  <div class="birdseye-app">
    <div class="app-inner">
      <aside v-if="!fullscreen" class="app-side app-reset">
        <NavSide
          :nav="meta"
          :meta="$route.params.meta"
          :pattern="$route.params.pattern"
        />
      </aside>

      <div class="app-content">
        <main ref="slot" class="app-preview" />

        <div v-if="!fullscreen" class="app-panel app-reset">
          <PanelPattern
            :props="props"
            :data="data"
            @input-prop="onInputProp"
            @input-data="onInputData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComponentMeta, ComponentPattern } from '@birdseye/core'
import AppStore, { QualifiedData } from './store'
import NavSide from './components/NavSide.vue'
import PanelPattern from './components/PanelPattern.vue'

export default Vue.extend({
  components: {
    NavSide,
    PanelPattern
  },

  props: {
    store: {
      type: Object as () => AppStore | undefined,

      // Actually required
      // Since it is wrapped by WebComponents and props are passed
      // after the component is instantiated, we cannot just use `required`.
      default: undefined
    }
  },

  computed: {
    meta(): ComponentMeta[] {
      return this.store ? this.store.state.declarations.map(d => d.meta) : []
    },

    props(): QualifiedData[] {
      const { meta, pattern } = this.$route.params
      return this.store ? this.store.getQualifiedProps(meta, pattern) : []
    },

    data(): QualifiedData[] {
      const { meta, pattern } = this.$route.params
      return this.store ? this.store.getQualifiedData(meta, pattern) : []
    },

    fullscreen(): boolean {
      return this.store ? this.store.fullscreen() : false
    }
  },

  mounted() {
    // Hack for avoid processing slot in Vue
    const slot = document.createElement('slot')
    const wrapper = this.$refs.slot as HTMLElement
    wrapper.appendChild(slot)
  },

  methods: {
    onInputProp({ name, value }: { name: string; value: any }): void {
      if (!this.store) return

      const { meta, pattern } = this.$route.params
      this.store.updatePropValue(meta, pattern, name, value)
    },

    onInputData({ name, value }: { name: string; value: any }): void {
      if (!this.store) return

      const { meta, pattern } = this.$route.params
      this.store.updateDataValue(meta, pattern, name, value)
    }
  }
})
</script>

<style src="k-css/k.css"></style>

<style>
:host {
  --color-base: #f1f8fd;
  --color-main: #828bec;
  --color-border: #e0e0e0;
  --width-side: 280px;
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Segoe UI', sans-serif;
  --font-size-normal: 14px;
  --font-size-large: 18px;
}
</style>

<style scoped>
.birdseye-app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.app-reset {
  all: initial;
  font-family: var(--font-family-base);
  font-size: var(--font-size-normal);
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

.app-content {
  display: flex;
  flex-direction: column;
  flex: 1 1 1px;
  min-width: 0;
}

.app-panel {
  overflow: auto;
  flex: 0 0 30%;
  padding: 20px;
  min-height: 200px;
  background-color: #fff;
  border-top: 1px solid var(--color-border);
}

.app-preview {
  overflow: auto;
  flex: 1 1 auto;
}
</style>
