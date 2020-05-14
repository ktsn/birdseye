import Vue from 'vue'
import { catalogFor } from '@birdseye/vue'
import ScopedSlot from './ScopedSlot.vue'

const Another = Vue.extend({
  props: {
    message: {
      type: String,
      required: true,
    },
  },

  render(h: Function) {
    return h('strong', { style: 'font-weight: bold; color: #ff0000;' }, [
      this.message,
    ])
  },
})

export default catalogFor(ScopedSlot, 'ScopedSlot')
  .add('inject scoped slot', {
    slots: {
      default(props: any) {
        return [this.$createElement('div', ['message: ', props.message])]
      },
    },
  })
  .add('use another component for slot', {
    slots: {
      default(props: any) {
        const h = this.$createElement
        return [
          h('div', ['Top']),
          h(Another, { props: { message: props.message } }),
          h('div', ['Bottom']),
        ]
      },
    },
  })
