import index from '../src/index'

describe('Entry point', () => {
  it('should provide module', () => {
    const actual = index
    expect(actual).toEqual({})
  })
})
