<template>
  <div class="panel-pattern">
    <PanelPatternGroup
      :data="props"
      class="group"
      title="props"
      @input="$emit('input-prop', arguments[0])"
    />
    <PanelPatternGroup
      :data="data"
      class="group"
      title="data"
      @input="$emit('input-data', arguments[0])"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComponentDataType } from '@birdseye/core'
import PanelPatternGroup from './PanelPatternGroup.vue'
import { QualifiedData } from '@/store'

function patternDataValidator(value: any[]) {
  return value.every(v => {
    return (
      typeof Array.isArray(v.type) && typeof v.name === 'string' && 'value' in v
    )
  })
}

export default Vue.extend({
  name: 'PanelPattern',

  components: {
    PanelPatternGroup
  },

  props: {
    props: {
      type: Array as () => QualifiedData[],
      required: true,
      validator: patternDataValidator
    },

    data: {
      type: Array as () => QualifiedData[],
      required: true,
      validator: patternDataValidator
    }
  }
})
</script>

<style scoped>
.group {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.group:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>

<birdseye lang="yml">
name: PanelPattern
patterns:
  - name: Normal
    props:
      props:
        - type:
            - string
          name: foo
          value: foo value
      data:
        - type:
            - string
            - number
          name: bar
          value: 123
        - type:
            - boolean
          name: baz
          value: true
</birdseye>
