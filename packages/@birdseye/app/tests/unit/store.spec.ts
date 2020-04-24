import AppStore from '@/store'

describe('AppStore', () => {
  describe('qualified values', () => {
    let store: AppStore
    beforeEach(() => {
      store = new AppStore({
        fullscreen: false,
        declarations: [
          {
            Wrapper: {} as any,
            meta: {
              name: 'foo',
              props: {
                a: {
                  type: ['string'],
                },
                b: {
                  type: ['string', 'number'],
                },
              },
              data: {
                c: {
                  type: ['boolean'],
                },
              },
              patterns: [
                {
                  name: 'pattern 1',
                  props: {
                    a: 'test1',
                    b: 123,
                  },
                  data: {
                    c: true,
                  },
                  slots: {},
                  containerStyle: {},
                },
                {
                  name: 'pattern 2',
                  props: {
                    a: 'test2',
                    b: '123',
                  },
                  data: {
                    c: false,
                  },
                  slots: {},
                  containerStyle: {},
                },
              ],
            },
          },
          {
            Wrapper: {} as any,
            meta: {
              name: 'bar',
              props: {},
              data: {
                test1: {
                  type: ['string'],
                },
              },
              patterns: [
                {
                  name: 'pattern 3',
                  props: {},
                  data: {
                    test2: 'test value',
                  },
                  slots: {},
                  containerStyle: {},
                },
              ],
            },
          },
        ],
      })
    })

    it('qualifies props', () => {
      const props = store.getQualifiedProps('foo', 'pattern 1')
      expect(props).toEqual([
        {
          type: ['string'],
          name: 'a',
          value: 'test1',
        },
        {
          type: ['string', 'number'],
          name: 'b',
          value: 123,
        },
      ])
    })

    it('qualifies data', () => {
      const data = store.getQualifiedData('foo', 'pattern 2')
      expect(data).toEqual([
        {
          type: ['boolean'],
          name: 'c',
          value: false,
        },
      ])
    })

    it('qualifies props without pattern', () => {
      const props = store.getQualifiedProps('foo')
      expect(props).toEqual([
        {
          type: ['string'],
          name: 'a',
          value: undefined,
        },
        {
          type: ['string', 'number'],
          name: 'b',
          value: undefined,
        },
      ])
    })

    it('qualifies data without pattern', () => {
      const data = store.getQualifiedData('foo')
      expect(data).toEqual([
        {
          type: ['boolean'],
          name: 'c',
          value: undefined,
        },
      ])
    })

    it('merges meta and pattern properties', () => {
      const data = store.getQualifiedData('bar', 'pattern 3')
      expect(data).toEqual([
        {
          type: ['string'],
          name: 'test1',
          value: undefined,
        },
        {
          type: [],
          name: 'test2',
          value: 'test value',
        },
      ])
    })
  })

  describe('others', () => {
    let store: AppStore
    beforeEach(() => {
      store = new AppStore({
        fullscreen: false,
        declarations: [
          {
            Wrapper: {} as any,
            meta: {
              name: 'foo',
              props: {},
              data: {},
              patterns: [
                {
                  name: 'foo pattern 1',
                  props: {
                    a: 'test value',
                  },
                  data: {
                    b: 123,
                    c: true,
                  },
                  slots: {},
                  containerStyle: {
                    padding: '0',
                  },
                },
                {
                  name: 'foo pattern 2',
                  props: {},
                  data: {
                    b: 456,
                  },
                  slots: {},
                  containerStyle: {
                    backgroundColor: 'black',
                  },
                },
              ],
            },
          },
        ],
      })
    })

    it('gets meta', () => {
      const m = store.getMeta('foo')
      expect(m).toBe(store.state.declarations[0].meta)
    })

    it('gets a pattern', () => {
      const p = store.getPattern('foo', 'foo pattern 2')
      expect(p).toBe(store.state.declarations[0].meta.patterns[1])
    })

    it('updates a prop value', () => {
      store.updatePropValue('foo', 'foo pattern 1', 'a', 'updated')
      expect(store.state.declarations[0].meta.patterns[0].props.a).toBe(
        'updated'
      )
    })

    it('updates a data value', () => {
      store.updateDataValue('foo', 'foo pattern 2', 'b', 1000)
      expect(store.state.declarations[0].meta.patterns[1].data.b).toBe(1000)
    })
  })
})
