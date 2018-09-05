<template>
  <div class="base-input">
    <component
      v-if="!removeInput"
      :is="componentForType"
      :value="value"
      @input="$emit('input', arguments[0])"
    />

    <select
      v-if="!removeTypes"
      :value="typeOfValue"
      class="select-type"
      @change="$emit('change-type', $event.target.value)"
    >
      <option
        v-for="type in realAvailableTypes"
        :key="type"
        :value="type"
      >{{ type }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputString from './InputString.vue'
import InputNumber from './InputNumber.vue'
import InputBoolean from './InputBoolean.vue'
import InputArray from './InputArray.vue'
import InputObject from './InputObject.vue'

const typeToComponentName: Record<string, string> = {
  string: 'InputString',
  number: 'InputNumber',
  boolean: 'InputBoolean',
  array: 'InputArray',
  object: 'InputObject'
}

const possibleTypes = Object.keys(typeToComponentName)

export default Vue.extend({
  name: 'BaseInput',

  components: {
    InputString,
    InputNumber,
    InputBoolean,
    InputArray,
    InputObject
  },

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
  }
})
</script>

<birdseye lang="yml">
name: BaseInput
patterns:
  - name: String
    props:
      value: string value
  - name: Number
    props:
      value: 123
  - name: Boolean
    props:
      value: true
  - name: Array
    props:
      value:
        - foo
        - 42
        - true
      removeTypes: true
  - name: Nested Array
    props:
      value:
        - foo
        - [1, 2, 3]
        - [bar, baz]
      removeTypes: true
  - name: Object
    props:
      value:
        a: foo
        b: 42
        c: true
      removeTypes: true
  - name: Nested Object
    props:
      value:
        a: foo
        b:
          x: 1
          y: 2
          z: 3
        c:
          test1: bar
          test2: baz
      removeTypes: true
</birdseye>
