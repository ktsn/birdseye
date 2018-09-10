<template>
  <button
    class="button-plus-minus"
    :class="type"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonPlusMinus',

  props: {
    type: {
      type: String,
      default: 'plus',
      validator(value: string) {
        return value === 'plus' || value === 'minus'
      }
    }
  }
})
</script>

<style scoped>
.button-plus-minus {
  display: inline-block;
  position: relative;
  height: 1em;
  width: 1em;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

.button-plus-minus::before,
.button-plus-minus::after {
  content: '';
  position: absolute;
  left: 20%;
  top: 50%;
  margin-top: -1px;
  height: 2px;
  width: 60%;
  background-color: #aaa;
  transition: 150ms background-color var(--ease-out-cubic);
}

.button-plus-minus::after {
  transform: rotate(90deg);
}

.button-plus-minus.minus::after {
  display: none;
}

.button-plus-minus:hover::before,
.button-plus-minus:focus::before,
.button-plus-minus:hover::after,
.button-plus-minus:focus::after {
  background-color: var(--color-main);
}
</style>

<birdseye lang="yml">
name: ButtonPlusMinus
patterns:
  - name: plus (default)
    props:
      type: plus
  - name: minus
    props:
      type: minus
</birdseye>
