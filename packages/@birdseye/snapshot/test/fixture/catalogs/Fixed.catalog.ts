import { catalogFor } from '@birdseye/vue'
import Fixed from '../components/Fixed.vue'

export default catalogFor(Fixed, 'Fixed').add('fixed', {
  plugins: {
    snapshot: {
      target: '.fixed',
    },
  },
})
