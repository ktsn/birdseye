import { catalogFor } from '@birdseye/vue'
import PanelPattern from '@/components/PanelPattern.vue'

export default catalogFor(PanelPattern, {
  name: 'PanelPattern',
  rootOptions: {
    shadowRoot: document.head,
  },
}).add('Normal', {
  props: {
    props: {
      type: ['string'],
      name: 'foo',
      value: 'foo value',
    },
    data: [
      {
        type: ['string', 'number'],
        name: 'bar',
        value: 123,
      },
      {
        type: ['boolean'],
        name: 'baz',
        value: true,
      },
    ],
  },
})
