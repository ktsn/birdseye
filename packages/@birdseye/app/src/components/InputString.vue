<template>
  <input
    :value="value"
    type="text"
    class="input-string"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputString',

  props: {
    value: {
      type: String,
      required: true
    }
  }
})
</script>
