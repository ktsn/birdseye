import { PropOptions } from 'vue'
import { ComponentDataInfo, ComponentDataType } from '@birdseye/core'

type Prop = PropOptions | (new () => any) | (new () => any)[] | null | true

type PropsDefinition = string[] | Record<string, Prop>

export default function extractProps(
  props: PropsDefinition | null | undefined
): Record<string, ComponentDataInfo> {
  if (!props) {
    return {}
  }

  const res: Record<string, ComponentDataInfo> = {}
  if (Array.isArray(props)) {
    props.forEach((name) => {
      res[name] = { type: [] }
    })
    return res
  }

  Object.keys(props).forEach((name) => {
    const def = props[name]
    if (def && typeof def === 'object' && !Array.isArray(def)) {
      res[name] = {
        type: toTypeStrings(def.type, !!def.required),
      }

      if ('default' in def && typeof def.default !== 'function') {
        res[name].defaultValue = def.default
      }
    } else {
      res[name] = { type: toTypeStrings(def, false) }
    }
  })

  return res
}

function toTypeStrings(type: any, required: boolean): ComponentDataType[] {
  if (!Array.isArray(type)) {
    return toTypeStrings([type], required)
  }

  const res = type
    .map((t): ComponentDataType | null => {
      if (t === String) {
        return 'string'
      }

      if (t === Number) {
        return 'number'
      }

      if (t === Boolean) {
        return 'boolean'
      }

      if (t === Array) {
        return 'array'
      }

      if (typeof t === 'function' && t !== Function) {
        return 'object'
      }

      return null
    })
    .filter(nonNull)

  return !required && res.length > 0 ? res.concat(['null', 'undefined']) : res
}

function nonNull<T>(val: T): val is NonNullable<T> {
  return val != null
}
