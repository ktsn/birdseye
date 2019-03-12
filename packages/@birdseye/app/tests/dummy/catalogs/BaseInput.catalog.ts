import { catalogFor } from '@birdseye/vue'
import BaseInput from '@/components/BaseInput.vue'

export default catalogFor(BaseInput, {
  name: 'BaseInput',
  rootOptions: {
    shadowRoot: document.head
  }
})
  .add('String', {
    props: {
      value: 'string value'
    }
  })
  .add('Number', {
    props: {
      value: 123
    }
  })
  .add('Boolean', {
    props: {
      value: true
    }
  })
  .add('Array', {
    props: {
      value: ['foo', 42, true],
      removeTypes: true
    }
  })
  .add('Nested Array', {
    props: {
      value: ['foo', [1, 2, 3], ['bar', 'baz']],
      removeTypes: true
    }
  })
  .add('Object', {
    props: {
      value: {
        a: 'foo',
        b: 42,
        c: true
      }
    }
  })
  .add('Nested Object', {
    props: {
      value: {
        a: 'foo',
        b: {
          x: 1,
          y: 2,
          z: 3
        },
        c: {
          test1: 'bar',
          test2: 'baz'
        }
      },
      removeTypes: true
    }
  })
