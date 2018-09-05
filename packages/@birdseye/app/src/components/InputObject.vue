<template>
  <div class="input-object">
    <ul>
      <li
        v-for="(item, key) in value"
        :key="key"
        class="item"
      >
        <InputProperty
          :name="key"
          :value="item"
          @input="onInputItem(key, arguments[0])"
          @remove="onClickRemove(key)"
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
  name: 'InputObject',

  components: {
    InputProperty
  },

  props: {
    value: {
      type: Object as () => Record<string, any>,
      required: true
    }
  },

  methods: {
    onClickAdd(): void {
      this.$emit('input', {
        ...this.value,
        '': undefined
      })
    },

    onClickRemove(key: string): void {
      const { [key]: _removed, ...newValue } = this.value
      this.$emit('input', newValue)
    },

    onInputItem(key: string, value: any): void {
      const newValue: Record<string, any> = {}

      // Iterate keys to retain entries order
      Object.keys(this.value).forEach(loopKey => {
        newValue[loopKey] = loopKey === key ? value : this.value[loopKey]
      })

      this.$emit('input', newValue)
    }
  }
})
</script>

<style scoped>
.input-object {
  display: inline-block;
}
</style>
