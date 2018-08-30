<template>
  <div class="panel-pattern-group">
    <strong class="title">
      {{ title }}
    </strong>

    <ul
      v-if="data.length > 0"
      class="list"
    >
      <li
        v-for="item in data"
        :key="item.name"
        class="item"
      >
        <strong class="name">
          {{ item.name }}
        </strong>

        <span class="value">
          {{ item.value }}
        </span>
      </li>
    </ul>

    <p
      v-else
      class="no-data"
    >
      No Data
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PatternData } from './PanelPattern.vue'

export default Vue.extend({
  name: 'PanelPatternGroup',

  props: {
    title: {
      type: String,
      required: true
    },

    data: {
      type: Array as () => PatternData[],
      required: true
    }
  }
})
</script>

<style scoped>
.title {
  display: block;
  font-weight: normal;
  font-size: var(--font-size-large);
}

.item {
  margin-top: 12px;
}

.name,
.value {
  display: inline-block;
}

.name {
  margin-right: 0.5em;
  font-weight: bold;
}

.no-data {
  margin-top: 12px;
  color: #888;
}
</style>
