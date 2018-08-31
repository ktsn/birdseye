<template>
  <input
    :value="value"
    type="number"
    class="input-number"
    @input="$emit('input', Number($event.target.value))"
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputString',

  props: {
    value: {
      type: Number,
      required: true
    }
  }
})
</script>
