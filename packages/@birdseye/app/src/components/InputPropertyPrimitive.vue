<template>
  <div class="input-property-primitive">
    <span class="name">{{ name }}</span>

    <BaseInput
      :value="value"
      :available-types="availableTypes"
      @input="$emit('input', arguments[0])"
    />

    <button
      type="button"
      class="remove-button"
      aria-label="Remove"
      @click="$emit('remove')"
    >-</button>
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
      type: [String, Number, Boolean],
      default: undefined
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => []
    }
  }
})
</script>

<style scoped>
.input-property-primitive {
  display: flex;
}

.name {
  margin-right: 0.5em;
  font-weight: bold;
}

.name::after {
  content: ':';
}
</style>
