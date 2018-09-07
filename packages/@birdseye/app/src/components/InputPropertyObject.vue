<template>
  <div class="input-property-object">
    <div class="header">
      <span class="name">{{ name }}</span>

      <div class="type">
        <BaseInput
          :value="value"
          :available-types="availableTypes"
          remove-input
        />
      </div>

      <button
        type="button"
        class="remove-button"
        aria-label="Remove"
        @click="$emit('remove')"
      >-</button>
    </div>

    <div class="children">
      <BaseInput
        :value="value"
        remove-types
        @input="$emit('input', arguments[0])"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from './BaseInput.vue'

const lazyComponents = () => ({
  BaseInput
})

export default Vue.extend({
  name: 'InputPropertyPrimitive',

  components: lazyComponents(),
  lazyComponents,

  props: {
    name: {
      type: [String, Number],
      required: true
    },

    value: {
      type: [Array, Object],
      required: true
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => []
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
}

.children {
  padding-left: 1.5em;
}

.name {
  margin-right: 0.5em;
  font-weight: bold;
}

.name::after {
  content: ':';
}
</style>
