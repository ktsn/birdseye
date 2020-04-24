import { catalogFor } from '@birdseye/vue'
import BaseSelect from '@/components/BaseSelect.vue'

export default catalogFor(BaseSelect, {
  name: 'BaseSelect',
  rootOptions: {
    shadowRoot: document.head,
  },
}).add('default', {
  props: {
    value: 'bar',
  },
  slots: {
    default: `
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
      <option value="baz">Baz</option>
    `,
  },
})
