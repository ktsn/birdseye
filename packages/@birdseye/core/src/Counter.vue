<template>
  <div class="counter">
    <p class="counter-value">{{ value }}</p>
    <div class="counter-controls">
      <button
        type="button"
        @click="increment">+</button>
      <button
        type="button"
        @click="decrement">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default Vue.extend({
  name: 'Counter',

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  methods: {
    increment(): void {
      this.$emit('increment')
    },

    decrement(): void {
      this.$emit('decrement')
    }
  }
})
</script>

<style>
.conter,
.counter-value,
.counter-controls {
  display: inline-block;
}

.counter-value,
.counter-controls {
  vertical-align: middle;
}

.counter-value {
  margin: 0 5px 0 0;
}
</style>
