<template>
  <BaseInputText
    :value="String(value)"
    type="number"
    @input="$emit('input', Number(arguments[0]))"
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
      type: Number,
      required: true,
    },
  },
})
</script>
