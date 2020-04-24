<script lang="ts">
import Vue, { VNode } from 'vue'
import InputPropertyPrimitive from './InputPropertyPrimitive.vue'
import InputPropertyObject from './InputPropertyObject.vue'

function isPrimitive(value: any): boolean {
  return value === null || typeof value !== 'object'
}

export default Vue.extend({
  name: 'InputProperty',
  functional: true,

  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: undefined,
    },
  },

  render(h, { data, props }): VNode {
    data.props = props
    return isPrimitive(props.value)
      ? h(InputPropertyPrimitive, data)
      : h(InputPropertyObject, data)
  },
})
</script>
