import { normalizeMeta } from '../src/meta'

describe('Meta', () => {
  it('normalizes meta', () => {
    const meta = normalizeMeta({})

    expect(meta.name).toBe('<AnonymusComponent>')
    expect(meta.props).toEqual({})
    expect(meta.data).toEqual({})
    expect(meta.patterns).toEqual([])
  })

  it('normalizes pattern', () => {
    const meta = normalizeMeta({
      patterns: [{}],
    })

    const { patterns } = meta
    const p = patterns[0]

    expect(patterns.length).toBe(1)
    expect(p.name).toBe('<AnonymusPattern>')
    expect(p.props).toEqual({})
    expect(p.data).toEqual({})
    expect(p.slots).toEqual({})
  })
})
