import { catalogFor } from '@birdseye/vue'
import Foo from '../components/Foo.vue'

export default catalogFor(Foo, 'Foo component')
  .add('Normal', {
    props: {
      foo: 'foo value',
    },
    data: {
      bar: 'bar value',
    },
  })
  .add('Bar number', {
    props: {
      foo: 'string',
    },
    data: {
      bar: 12345,
    },
  })
