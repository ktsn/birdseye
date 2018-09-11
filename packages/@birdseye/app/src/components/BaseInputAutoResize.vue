<template>
  <BaseInputText
    class="base-input-text"
    input-class="auto-resize"
    :input-style="{ width: width + 'px' }"
    :ref-input="registerInput"
    :value="value"
    @input="$emit('input', arguments[0])"
  />
</template>


<script lang="ts">
import Vue from 'vue'
import BaseInputText from './BaseInputText.vue'

export default Vue.extend({
  name: 'BaseInputAutoResize',

  components: {
    BaseInputText
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      width: 0
    }
  },

  mounted() {
    this.calcWidth()
  },

  updated() {
    this.calcWidth()
  },

  methods: {
    registerInput(input: HTMLInputElement): void {
      ;(this as any).input = input
    },

    calcWidth(): void {
      const input: HTMLElement = (this as any).input
      const tmp = input.style.width
      input.style.width = '0'
      this.width = input.scrollWidth
      input.style.width = tmp
    }
  }
})
</script>

<style scoped>
.base-input-text >>> .auto-resize {
  min-width: 1em;
  width: 0;
}
</style>

<birdseye lang="yml">
name: BaseInputAutoResize
patterns:
  - name: auto resize
    props:
      value: value
</birdseye>
