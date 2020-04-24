<template>
  <BaseInputText
    :value="value"
    type="text"
    @input="$emit('input', arguments[0])"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInputText from './BaseInputText.vue'

export default Vue.extend({
  name: 'InputString',

  components: {
    BaseInputText,
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },
})
</script>
