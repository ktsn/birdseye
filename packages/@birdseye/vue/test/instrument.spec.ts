import Vue from 'vue'
import { createInstrument } from '../src/instrument'

describe('Instrument', () => {
  let Dummy: any

  const { instrument } = createInstrument(Vue)

  beforeEach(() => {
    Dummy = {
      render(h: Function) {
        return h()
      }
    }
  })

  it('uses component name if available', () => {
    Dummy.name = 'Dummy'
    const result = instrument(Dummy)
    expect(result.meta.name).toBe('Dummy')
  })

  it('extracts meta data', () => {
    Dummy.__birdseye = {
      name: 'Dummy component',
      patterns: [
        {
          name: 'Normal pattern',
          props: {
            test: 'foo'
          },
          data: {
            test2: 'bar'
          },
          slots: {},
          containerStyle: {},
          plugins: {}
        }
      ]
    }
    const result = instrument(Dummy)
    expect(result.meta.name).toBe(Dummy.__birdseye.name)
    expect(result.meta.patterns).toEqual(Dummy.__birdseye.patterns)
  })

  it('extracts from constructor', () => {
    const Ctor: any = Vue.extend(Dummy)
    Ctor.options.__birdseye = {
      name: 'Dummy component',
      patterns: [
        {
          name: 'Normal pattern',
          props: {
            test: 'foo'
          },
          data: {
            test2: 'bar'
          },
          slots: {},
          containerStyle: {},
          plugins: {}
        }
      ]
    }
    const result = instrument(Ctor)
    expect(result.meta.name).toBe(Ctor.options.__birdseye.name)
    expect(result.meta.patterns).toEqual(Ctor.options.__birdseye.patterns)
  })
})
