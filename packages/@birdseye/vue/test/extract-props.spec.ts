import extractProps from '../src/runtime/extract-props'

describe('Extract props', () => {
  it('returns empty object if falsy value is passed', () => {
    const props = extractProps(null)
    expect(props).toEqual({})
  })

  it('extracts array syntax props', () => {
    const props = extractProps(['foo', 'bar'])
    expect(props).toEqual({
      foo: { type: [] },
      bar: { type: [] }
    })
  })

  it('extracts simple object syntax props', () => {
    const props = extractProps({
      foo: true,
      bar: null
    })
    expect(props).toEqual({
      foo: { type: [] },
      bar: { type: [] }
    })
  })

  it('extracts props types', () => {
    const props = extractProps({
      foo: String,
      bar: {
        type: Number
      }
    })
    expect(props).toEqual({
      foo: { type: ['string'] },
      bar: { type: ['number'] }
    })
  })

  it('extracts default value', () => {
    const props = extractProps({
      foo: {
        default: 'test'
      }
    })
    expect(props).toEqual({
      foo: {
        type: [],
        defaultValue: 'test'
      }
    })
  })

  describe('types', () => {
    it('string', () => {
      const props = extractProps({
        foo: String
      })
      expect(props.foo.type).toEqual(['string'])
    })

    it('number', () => {
      const props = extractProps({
        foo: Number
      })
      expect(props.foo.type).toEqual(['number'])
    })

    it('boolean', () => {
      const props = extractProps({
        foo: Boolean
      })
      expect(props.foo.type).toEqual(['boolean'])
    })

    it('array', () => {
      const props = extractProps({
        foo: Array
      })
      expect(props.foo.type).toEqual(['array'])
    })

    it('object', () => {
      const props = extractProps({
        foo: Object
      })
      expect(props.foo.type).toEqual(['object'])
    })

    it('function', () => {
      const props = extractProps({
        foo: Function
      })
      expect(props.foo.type).toEqual([])
    })

    it('other object', () => {
      class Test {}
      const props = extractProps({
        foo: Test
      })
      expect(props.foo.type).toEqual(['object'])
    })

    it('union', () => {
      const props = extractProps({
        foo: [String, Number]
      })
      expect(props.foo.type).toEqual(['string', 'number'])
    })
  })
})
