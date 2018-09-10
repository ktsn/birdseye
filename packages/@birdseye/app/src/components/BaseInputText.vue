<template>
  <div class="base-input-text">
    <input
      class="input"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseInputText',

  props: {
    type: {
      type: String,
      default: 'text'
    },

    value: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.base-input-text {
  display: inline-block;
  position: relative;
  border-bottom: 1px solid var(--color-border);
}

.base-input-text::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background-color: var(--color-main);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 150ms var(--ease-out-cubic);
}

.base-input-text:focus-within::before {
  transform: scaleX(1);
}

.input {
  border: none;
  outline: none;
}
</style>

<birdseye lang="yml">
name: BaseInputText
patterns:
  - name: with value
    props:
      value: text value
  - name: number type
    props:
      type: number
      value: 42
</birdseye>
