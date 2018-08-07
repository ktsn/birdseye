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
    props.forEach(name => {
      res[name] = { type: [] }
    })
    return res
  }

  Object.keys(props).forEach(name => {
    const def = props[name]
    if (def && typeof def === 'object' && !Array.isArray(def)) {
      res[name] = {
        type: toTypeStrings(def.type),
        defaultValue:
          typeof def.default !== 'function' ? def.default : undefined
      }
    } else {
      res[name] = { type: toTypeStrings(def) }
    }
  })

  return res
}

function toTypeStrings(type: any): ComponentDataType[] {
  if (!Array.isArray(type)) {
    return toTypeStrings([type])
  }

  return type
    .map(
      (t): ComponentDataType | null => {
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
      }
    )
    .filter(nonNull)
}

function nonNull<T>(val: T): val is NonNullable<T> {
  return val != null
}
