import { ComponentDataType } from '@birdseye/core'

export function dedupe(list: string[]): string[] {
  const set: Record<string, true> = {}
  return list.reduce<string[]>((acc, item) => {
    if (set[item]) {
      return acc
    }
    set[item] = true
    return acc.concat(item)
  }, [])
}

export function emptyValue(type: string): any {
  const map: Record<string, any> = {
    string: '',
    number: 0,
    boolean: false,
    array: [],
    object: {},
    null: null,
  }
  return map[type]
}
