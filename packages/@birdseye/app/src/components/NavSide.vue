<template>
  <ul class="nav-side">
    <li
      v-for="m in nav"
      :key="m.name"
      class="item"
    >
      <button
        class="anchor"
        :class="{ current: openedMeta === m.name }"
        @click="openedMeta = m.name"
      >
        {{ m.name }}
      </button>

      <TransitionDisclosure name="child">
        <div
          v-if="!isEmptyPatterns(m)"
          v-show="openedMeta === m.name"
          class="child-wrapper"
        >
          <ul class="child-list">
            <li
              v-for="p in m.patterns"
              :key="p.name"
              class="child-item"
            >
              <router-link
                :class="{ current: isCurrent(m.name, p.name) }"
                :to="previewRoute(m.name, p.name)"
                class="child-anchor"
              >
                {{ p.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </TransitionDisclosure>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Location } from 'vue-router'
import { ComponentMeta } from '@birdseye/core'
import { TransitionDisclosure } from 'vue-transition-components'

export default Vue.extend({
  name: 'NavSide',

  components: {
    TransitionDisclosure
  },

  props: {
    meta: {
      type: String as PropType<string | null>,
      default: null
    },

    pattern: {
      type: String as PropType<string | null>,
      default: null
    },

    nav: {
      type: Array as () => ComponentMeta[],
      required: true
    }
  },

  data() {
    return {
      openedMeta: this.meta
    }
  },

  methods: {
    previewRoute(meta: string, pattern?: string): Location {
      const to: Location = {
        name: 'preview',
        params: { meta }
      }

      if (pattern) {
        to.params!.pattern = pattern
      }

      return to
    },

    isCurrent(meta: string, pattern: string): boolean {
      return this.meta === meta && this.pattern === pattern
    },

    isEmptyPatterns(meta: ComponentMeta): boolean {
      return meta.patterns.length === 0
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
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

/**
 * Children
 */
.child-list {
  padding-top: 6px;
}

.child-item {
  margin-bottom: 6px;
}

.child-item:last-child {
  margin-bottom: 0;
}

.child-anchor {
  display: block;
  padding-left: 20px;
}

/**
 * Hover / Current
 */
.anchor:hover,
.anchor.current,
.child-anchor:hover,
.child-anchor.current {
  color: var(--color-main);
}

/**
 * Transition
 */
.child-enter-active,
.child-leave-active {
  transition: height 400ms var(--ease-out-cubic);
}
</style>
