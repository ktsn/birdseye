<template>
  <select
    class="base-select"
    :value="value"
    @change="$emit('change', $event.target.value)"
  >
    <slot />
  </select>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseSelect',

  props: {
    value: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.base-select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  color: #aaa;
  text-decoration: underline;
  cursor: pointer;
  outline: none;
  transition: color 150ms var(--ease-out-cubic);
}

.base-select:hover,
.base-select:focus {
  color: var(--color-main);
}
</style>
