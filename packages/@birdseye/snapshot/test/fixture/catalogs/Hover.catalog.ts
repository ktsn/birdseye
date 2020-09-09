import { catalogFor } from '@birdseye/vue'
import Hover from '../components/Hover.vue'

export default catalogFor(Hover, 'Hover').add('hover', {
  slots: {
    default: 'Hover',
  },
  plugins: {
    snapshot: {
      capture: async (page, capture) => {
        await capture()
        await page.hover('[data-test-id=button]')
        await capture()
      },
    },
  },
})
