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

  it('provides placeholder if there are no meta data', () => {
    const result = instrument(Dummy)
    expect(result.name).toBe('<Anonymus Component>')
    expect(result.patterns).toEqual([])
  })

  it('uses component name if available', () => {
    Dummy.name = 'Dummy'
    const result = instrument(Dummy)
    expect(result.name).toBe('Dummy')
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
          }
        }
      ]
    }
    const result = instrument(Dummy)
    expect(result.name).toBe(Dummy.__birdseye.name)
    expect(result.patterns).toEqual(Dummy.__birdseye.patterns)
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
          }
        }
      ]
    }
    const result = instrument(Ctor)
    expect(result.name).toBe(Ctor.options.__birdseye.name)
    expect(result.patterns).toEqual(Ctor.options.__birdseye.patterns)
  })
})
