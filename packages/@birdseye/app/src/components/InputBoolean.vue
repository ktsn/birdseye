<template>
  <input
    type="checkbox"
    class="input-boolean"
    :checked="value"
    @change="$emit('input', $event.target.checked)"
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputBoolean',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
})
</script>
