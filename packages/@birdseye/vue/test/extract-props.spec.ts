import extractProps from '../src/extract-props'

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
      foo: { type: ['string', 'null', 'undefined'] },
      bar: { type: ['number', 'null', 'undefined'] }
    })
  })

  it('extracts required type', () => {
    const props = extractProps({
      foo: {
        type: String,
        required: true
      }
    })
    expect(props).toEqual({
      foo: { type: ['string'] }
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

  it('extracts null / undefined as default', () => {
    const props = extractProps({
      foo: {
        default: null
      },
      bar: {
        default: undefined
      }
    })
    expect(props).toEqual({
      foo: {
        type: [],
        defaultValue: null
      },
      bar: {
        type: [],
        defaultValue: undefined
      }
    })
  })

  it('does not extract default value from function', () => {
    const props = extractProps({
      foo: {
        default: () => ['foo', 'bar']
      }
    })
    expect(props).toEqual({
      foo: {
        type: [],
        // since it needs component instance as `this`,
        // we should not choose function style default value.
        // it will be provided by Vue.js side in any cases.
        defaultValue: undefined
      }
    })
  })

  describe('types', () => {
    it('string', () => {
      const props = extractProps({
        foo: String
      })
      expect(props.foo.type).toEqual(['string', 'null', 'undefined'])
    })

    it('number', () => {
      const props = extractProps({
        foo: Number
      })
      expect(props.foo.type).toEqual(['number', 'null', 'undefined'])
    })

    it('boolean', () => {
      const props = extractProps({
        foo: Boolean
      })
      expect(props.foo.type).toEqual(['boolean', 'null', 'undefined'])
    })

    it('array', () => {
      const props = extractProps({
        foo: Array
      })
      expect(props.foo.type).toEqual(['array', 'null', 'undefined'])
    })

    it('object', () => {
      const props = extractProps({
        foo: Object
      })
      expect(props.foo.type).toEqual(['object', 'null', 'undefined'])
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
      expect(props.foo.type).toEqual(['object', 'null', 'undefined'])
    })

    it('union', () => {
      const props = extractProps({
        foo: [String, Number]
      })
      expect(props.foo.type).toEqual(['string', 'number', 'null', 'undefined'])
    })
  })
})
