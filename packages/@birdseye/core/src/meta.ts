import { ComponentMeta, ComponentPattern } from './interfaces'

export function normalizeMeta(meta: any): ComponentMeta {
  return {
    name: meta.name || '<AnonymusComponent>',
    props: meta.props || {},
    data: meta.data || {},
    patterns: meta.patterns ? meta.patterns.map(normalizePattern) : []
  }
}

function normalizePattern(pattern: any): ComponentPattern {
  return {
    name: pattern.name || '<AnonymusPattern>',
    props: pattern.props || {},
    data: pattern.data || {}
  }
}
