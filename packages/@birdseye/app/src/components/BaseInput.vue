<template>
  <div class="base-input">
    <Component
      :is="componentForType"
      v-if="!removeInput"
      :value="value"
      @input="$emit('input', arguments[0])"
    />

    <BaseSelect
      v-if="!removeTypes"
      :value="typeOfValue"
      class="select-type"
      @change="onChangeType(arguments[0])"
    >
      <option
        v-for="type in realAvailableTypes"
        :key="type"
        :value="type"
      >{{ type }}</option>
    </BaseSelect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputString from './InputString.vue'
import InputNumber from './InputNumber.vue'
import InputBoolean from './InputBoolean.vue'
import InputArray from './InputArray.vue'
import InputObject from './InputObject.vue'
import InputEmpty from './InputEmpty.vue'
import BaseSelect from './BaseSelect.vue'
import { emptyValue } from '@/utils'
import { ComponentDataType } from '@birdseye/core'

const typeToComponentName: Record<string, string> = {
  string: 'InputString',
  number: 'InputNumber',
  boolean: 'InputBoolean',
  array: 'InputArray',
  object: 'InputObject',
  null: 'InputEmpty',
  undefined: 'InputEmpty'
}

const possibleTypes = Object.keys(typeToComponentName)

const lazyComponents = () => ({
  InputString,
  InputNumber,
  InputBoolean,
  InputArray,
  InputObject,
  InputEmpty,
  BaseSelect
})

export default Vue.extend({
  name: 'BaseInput',

  components: lazyComponents(),
  lazyComponents,

  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: undefined
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => [],
      validator(types: string[]) {
        return types.every(type => possibleTypes.indexOf(type) >= 0)
      }
    },

    removeInput: {
      type: Boolean,
      default: false
    },

    removeTypes: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Replace empty array to possibleTypes
     */
    realAvailableTypes(): string[] {
      return this.availableTypes.length === 0
        ? possibleTypes
        : this.availableTypes
    },

    typeOfValue(): string {
      if (this.value === null) {
        return 'null'
      }

      if (this.value === undefined) {
        return 'undefined'
      }

      if (Array.isArray(this.value)) {
        return 'array'
      }

      return typeof this.value
    },

    componentForType(): string {
      return typeToComponentName[this.typeOfValue]
    }
  },

  methods: {
    onChangeType(type: ComponentDataType): void {
      const empty = emptyValue(type)
      this.$emit('input', empty)
    }
  }
})
</script>

<style scoped>
.base-input {
  display: inline-flex;
  align-items: center;
}

.select-type:not(:first-child) {
  margin-left: 10px;
}
</style>
