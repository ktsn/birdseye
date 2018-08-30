<template>
  <div class="panel-pattern">
    <PanelPatternGroup
      :data="props"
      class="group"
      title="props"
    />
    <PanelPatternGroup
      :data="data"
      class="group"
      title="data"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ComponentDataType } from '@birdseye/core'
import PanelPatternGroup from './PanelPatternGroup.vue'

export interface PatternData {
  type: ComponentDataType[]
  name: string
  value: any
}

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
      type: Array as () => PatternData[],
      required: true,
      validator: patternDataValidator
    },

    data: {
      type: Array as () => PatternData[],
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
        - type: string
          name: foo
          value: foo value
      data:
        - type: number
          name: bar
          value: 123
        - type: boolean
          name: baz
          value: true
</birdseye>
