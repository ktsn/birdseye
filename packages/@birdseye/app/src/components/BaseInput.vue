<template>
  <div class="base-input">
    <component
      :is="componentForType"
      :value="value"
      @input="$emit('input', arguments[0])"
    />
    <select
      class="select-type"
      :value="typeOfValue"
      @change="$emit('change-type', $event.target.value)"
    >
      <option
        v-for="t in availableTypes"
        :key="t"
        :value="t"
      >{{ t }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputString from './InputString.vue'
import InputNumber from './InputNumber.vue'
import InputBoolean from './InputBoolean.vue'

const typeToComponentName: Record<string, string> = {
  string: 'InputString',
  number: 'InputNumber',
  boolean: 'InputBoolean'
}

const possibleTypes = Object.keys(typeToComponentName)

export default Vue.extend({
  name: 'BaseInput',

  components: {
    InputString,
    InputNumber,
    InputBoolean
  },

  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: undefined
    },

    availableTypes: {
      type: Array as () => string[],
      default: () => possibleTypes,
      validator(types: string[]) {
        return types.every(type => possibleTypes.indexOf(type) >= 0)
      }
    }
  },

  computed: {
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
      availableTypes:
        - string
  - name: Number
    props:
      value: 123
      availableTypes:
        - number
  - name: Boolean
    props:
      value: true
      availableTypes:
        - boolean
</birdseye>
