<template>
  <input
    type="text"
    class="input-string"
    :value="value"
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
