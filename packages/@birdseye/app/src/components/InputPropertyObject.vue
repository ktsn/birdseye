<template>
  <div class="input-property-object">
    <div class="header">
      <ButtonPlusMinus
        type="minus"
        class="remove-button"
        aria-label="Remove"
        @click="$emit('remove')"
      />

      <span class="name">{{ name }}</span>

      <div class="type">
        <BaseInput
          :value="value"
          :available-types="availableTypes"
          remove-input
          @input="$emit('input', arguments[0])"
        />
      </div>
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
      type: [Array, Object],
      required: true,
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => [],
    },
  },
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.2em;
}

.children {
  padding-left: 1.2em;
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
