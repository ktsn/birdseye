import { catalogFor } from '@birdseye/vue'
import Fill from '../components/Fill.vue'

export default catalogFor(Fill, 'Fill preview area').add('style', {
  containerStyle: {
    backgroundColor: '#aaa',
    height: '100%',
  },
})
