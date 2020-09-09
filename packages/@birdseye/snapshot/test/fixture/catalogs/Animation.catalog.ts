import { catalogFor } from '@birdseye/vue'
import Animation from '../components/Animation.vue'

export default catalogFor(Animation, 'Animation')
  .add('Normal', {
    plugins: {
      snapshot: {
        delay: 1000,
      },
    },
  })
  .add('Blink', {
    props: {
      blink: true,
    },
    plugins: {
      snapshot: {
        skip: true,
      },
    },
  })
