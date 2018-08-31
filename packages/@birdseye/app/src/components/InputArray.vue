<template>
  <div class="input-array">
    <ul>
      <li
        v-for="(item, index) in value"
        :key="index"
        class="item"
      >
        <span class="index">{{ index }}</span>

        <BaseInput
          :value="item"
          @input="onInputItem(index, arguments[0])"
        />

        <button
          type="button"
          class="remove-button"
          aria-label="Remove"
          @click="onClickRemove(index)"
        >-</button>
      </li>
    </ul>

    <button
      type="button"
      class="add-button"
      aria-label="Add"
      @click="onClickAdd"
    >+</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from './BaseInput.vue'

export default Vue.extend({
  name: 'InputArray',

  props: {
    value: {
      type: Array as () => any[],
      required: true
    }
  },

  beforeCreate() {
    // To avoid BaseInput to be undefined due to circlar dependency
    this.$options.components!.BaseInput = BaseInput
  },

  methods: {
    onClickAdd(): void {
      this.$emit('input', [...this.value, undefined])
    },

    onClickRemove(index: number): void {
      this.$emit('input', [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1)
      ])
    },

    onInputItem(index: number, value: any): void {
      this.$emit('input', [
        ...this.value.slice(0, index),
        value,
        ...this.value.slice(index + 1)
      ])
    }
  }
})
</script>

<style scoped>
.input-array {
  display: inline-block;
}

.item {
  display: flex;
  align-items: flex-start;
}

.index {
  margin-right: 0.5em;
  font-weight: bold;
}

.index::after {
  content: ':';
}
</style>
