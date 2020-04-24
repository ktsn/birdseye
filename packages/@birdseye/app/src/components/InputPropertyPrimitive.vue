<template>
  <div class="input-property-primitive">
    <ButtonPlusMinus
      type="minus"
      class="remove-button"
      aria-label="Remove"
      @click="$emit('remove')"
    />

    <span class="name">{{ name }}</span>

    <BaseInput
      :value="value"
      :available-types="availableTypes"
      @input="$emit('input', arguments[0])"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from './BaseInput.vue'
import ButtonPlusMinus from './ButtonPlusMinus.vue'

const lazyComponents = () => ({
  BaseInput,
  ButtonPlusMinus,
})

export default Vue.extend({
  name: 'InputPropertyPrimitive',

  components: lazyComponents(),
  lazyComponents,

  props: {
    name: {
      type: [String, Number],
      required: true,
    },

    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => [],
    },
  },
})
</script>

<style scoped>
.input-property-primitive {
  display: flex;
  align-items: center;
}

.name {
  margin-right: 0.5em;
  font-weight: bold;
}

.name::after {
  content: ':';
}

.remove-button {
  margin-right: 5px;
}
</style>
