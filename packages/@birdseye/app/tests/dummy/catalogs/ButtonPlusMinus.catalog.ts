import { catalogFor } from '@birdseye/vue'
import ButtonPlusMinus from '@/components/ButtonPlusMinus.vue'

export default catalogFor(ButtonPlusMinus, {
  name: 'ButtonPlusMinus',
  rootOptions: {
    shadowRoot: document.head
  }
})
  .add('plus (default)', {
    props: {
      type: 'plus'
    }
  })
  .add('minus', {
    props: {
      type: 'minus'
    }
  })
