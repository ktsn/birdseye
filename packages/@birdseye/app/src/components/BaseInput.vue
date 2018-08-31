<template>
  <div class="base-input">
    <component
      :is="componentForType"
      :value="value"
      @input="$emit('input', arguments[0])"
    />
    <select
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

const typeToComponentName: Record<string, string> = {
  string: 'InputString',
  number: 'InputNumber',
  boolean: 'InputBoolean',
  array: 'InputArray'
}

const possibleTypes = Object.keys(typeToComponentName)

export default Vue.extend({
  name: 'BaseInput',

  components: {
    InputString,
    InputNumber,
    InputBoolean,
    InputArray
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
      if (Array.isArray(this.value)) {
        return 'array'
      }

      if (this.value && typeof this.value === 'object') {
        return 'object'
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
</birdseye>
