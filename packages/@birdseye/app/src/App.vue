<template>
  <div class="birdseye-app">
    <aside>
      <ul>
        <li
          v-for="decl in declarations"
          :key="decl.name">
          <strong>{{ decl.name }}</strong>

          <ul>
            <li
              v-for="p in decl.patterns"
              :key="p.name">
              <router-link
                :to="{ name: 'preview', params: { component: decl.name, pattern: p.name } }">
                {{ p.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    <div ref="slot" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComponentDeclaration } from '@birdseye/core'

export default Vue.extend({
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

<style scoped>
.birdseye-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
