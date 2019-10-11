<template>
  <div class="input-array">
    <ul>
      <li v-for="(item, index) in value" :key="index" class="item">
        <InputProperty
          :name="index"
          :value="item"
          @input="onInputItem(index, arguments[0])"
          @remove="onClickRemove(index)"
        />
      </li>
    </ul>

    <ButtonPlusMinus
      type="plus"
      class="add-button"
      aria-label="Add"
      @click="onClickAdd"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputProperty from './InputProperty.vue'
import ButtonPlusMinus from './ButtonPlusMinus.vue'

const lazyComponents = () => ({
  InputProperty,
  ButtonPlusMinus
})

export default Vue.extend({
  name: 'InputArray',

  components: lazyComponents(),
  lazyComponents,

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

.item {
  margin-bottom: 0.2em;
}
</style>
