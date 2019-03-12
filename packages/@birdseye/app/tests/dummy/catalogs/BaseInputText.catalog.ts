import { catalogFor } from '@birdseye/vue'
import BaseInputText from '@/components/BaseInputText.vue'

export default catalogFor(BaseInputText, {
  name: 'BaseInputText',
  rootOptions: {
    shadowRoot: document.head
  }
})
  .add('with value', {
    props: {
      value: 'text value'
    }
  })
  .add('number type', {
    props: {
      type: 'number',
      value: 42
    }
  })
