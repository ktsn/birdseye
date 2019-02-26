import Vue, { Component, VNode } from 'vue'
import { compileToFunctions } from 'vue-template-compiler'
import { Catalog as BaseCatalog, ComponentPattern } from '@birdseye/core'
import { wrap } from './instrument'
import extractProps from './extract-props'

export interface Catalog extends BaseCatalog {
  add(name: string, options?: CatalogOptions): Catalog
}

export interface CatalogOptions {
  props?: Record<string, any>
  data?: Record<string, any>
  slots?: Record<string, string>
}

export function catalogFor(Comp: Component, name: string): Catalog {
  const Wrapper = wrap(Comp)
  const options = typeof Comp === 'function' ? (Comp as any).options : Comp
  const props = extractProps(options.props)

  function catalog(patterns: ComponentPattern[]): Catalog {
    return {
      add(patternName, options = {}) {
        const originalSlots = options.slots || {}

        const slots = Object.keys(originalSlots).reduce<
          Record<string, (props: any) => VNode[]>
        >((acc, key) => {
          acc[key] = _props => {
            return [compileSlot(key, originalSlots[key])]
          }
          return acc
        }, {})

        return catalog(
          patterns.concat({
            name: patternName,
            props: options.props || {},
            data: options.data || {},
            slots
          })
        )
      },

      toDeclaration() {
        return {
          Wrapper,
          meta: {
            name,
            props,
            data: {},
            patterns
          }
        }
      }
    }
  }

  return catalog([])
}

function compileSlot(slotName: string, slot: string): VNode {
  const compiled = compileToFunctions(`
    <div><template slot="${slotName}">${slot}</template></div>
  `)

  const ctx: any = new Vue({
    staticRenderFns: compiled.staticRenderFns
  })
  const vnode = compiled.render.call(ctx._renderProxy)
  return vnode.children![0]
}
