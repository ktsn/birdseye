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
        <template v-if="!$_birdseye_experimental">
          <strong class="name">
            {{ item.name }}
          </strong>

          <span class="value">
            {{ item.value }}
          </span>
        </template>

        <InputProperty
          v-else
          :name="item.name"
          :value="item.value"
          :available-types="item.type"
          @input="onInput(item.name, arguments[0])"
        />
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
import InputProperty from './InputProperty.vue'
import { QualifiedData } from '@/store'

export default Vue.extend({
  name: 'PanelPatternGroup',

  components: {
    InputProperty
  },

  props: {
    title: {
      type: String,
      required: true
    },

    data: {
      type: Array as () => QualifiedData[],
      required: true
    }
  },

  methods: {
    onInput(name: string, value: any): void {
      this.$emit('input', {
        name,
        value
      })
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
