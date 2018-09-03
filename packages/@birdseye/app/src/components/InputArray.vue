<template>
  <div class="input-array">
    <ul>
      <li
        v-for="(item, index) in value"
        :key="index"
        class="item"
      >
        <InputProperty
          :name="index"
          :value="item"
          @input="onInputItem(index, arguments[0])"
          @remove="onClickRemove(index)"
        />
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
import InputProperty from './InputProperty.vue'

export default Vue.extend({
  name: 'InputArray',

  components: {
    InputProperty
  },

  props: {
    value: {
      type: Array as () => any[],
      required: true
    }
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
</style>
