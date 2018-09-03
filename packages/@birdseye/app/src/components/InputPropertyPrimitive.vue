<template>
  <div class="input-property-primitive">
    <span class="name">{{ name }}</span>

    <BaseInput
      :value="value"
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

export default Vue.extend({
  name: 'InputPropertyPrimitive',

  props: {
    name: {
      type: [String, Number],
      required: true
    },

    value: {
      type: [String, Number, Boolean],
      default: undefined
    }
  },

  beforeCreate() {
    const components = this.$options.components!
    // To avoid BaseInput to be undefined due to circlar dependency
    if (!components.BaseInput) {
      components.BaseInput = BaseInput
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
