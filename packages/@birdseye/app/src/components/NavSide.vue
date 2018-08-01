<template>
  <ul class="nav-side">
    <li
      v-for="decl in declarations"
      :key="decl.name"
      class="item">
      <router-link
        class="anchor"
        :class="{ current: isCurrent(decl.name) }"
        :to="previewRoute(decl.name)">
        {{ decl.name }}
      </router-link>

      <ul class="child-list">
        <li
          v-for="p in decl.patterns"
          :key="p.name"
          class="child-item">
          <router-link
            class="child-anchor"
            :class="{ current: isCurrent(decl.name, p.name) }"
            :to="previewRoute(decl.name, p.name)">
            {{ p.name }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Location } from 'vue-router'
import { ComponentDeclaration } from '@birdseye/core'

export default Vue.extend({
  name: 'NavSide',

  props: {
    component: {
      type: String,
      default: null
    },

    pattern: {
      type: String,
      default: null
    },

    declarations: {
      type: Array as () => ComponentDeclaration[],
      required: true
    }
  },

  methods: {
    previewRoute(component: string, pattern?: string): Location {
      const to: Location = {
        name: 'preview',
        params: { component }
      }

      if (pattern) {
        to.params!.pattern = pattern
      }

      return to
    },

    isCurrent(component: string, pattern: string | null = null): boolean {
      return this.component === component && this.pattern === pattern
    }
  }
})
</script>

<style scoped>
.item {
  margin-bottom: 12px;
}

.item:last-child {
  margin-bottom: 0;
}

.anchor {
  display: block;
  font-weight: bold;
}

.child-item {
  margin-top: 6px;
}

.child-anchor {
  display: block;
  padding-left: 20px;
}

.anchor:hover,
.anchor.current,
.child-anchor:hover,
.child-anchor.current {
  color: var(--color-main);
}
</style>
