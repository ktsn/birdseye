import Vue, { Component, VNode, ComponentOptions, CreateElement } from 'vue'
import { compileToFunctions } from 'vue-template-compiler'
import {
  Catalog as BaseCatalog,
  ComponentPattern,
  PluginOptions,
} from '@birdseye/core'
import { createInstrument } from './instrument'
import extractProps from './extract-props'

export interface Catalog extends BaseCatalog {
  add(name: string, options?: CatalogPatternOptions): Catalog
}

export interface CatalogOptions {
  name: string
  rootVue?: typeof Vue
  rootOptions?: ComponentOptions<Vue>
  mapRender?: (this: Vue, h: CreateElement, wrapped: VNode) => VNode
}

export type Slot = string | ((this: Vue, props: any) => VNode[] | undefined)

export interface CatalogPatternOptions {
  props?: Record<string, any>
  data?: Record<string, any>
  slots?: Record<string, Slot>
  containerStyle?: Partial<CSSStyleDeclaration>
  plugins?: PluginOptions
}

export function catalogFor(
  Comp: Component,
  nameOrOptions: string | CatalogOptions
): Catalog {
  const name =
    typeof nameOrOptions === 'string' ? nameOrOptions : nameOrOptions.name
  const options = typeof nameOrOptions === 'string' ? { name } : nameOrOptions

  const { wrap } = createInstrument(
    options.rootVue || Vue,
    options.rootOptions || {},
    options.mapRender
  )

  const Wrapper = wrap(Comp)
  const compOptions = typeof Comp === 'function' ? (Comp as any).options : Comp
  const props = extractProps(compOptions.props)

  function catalog(patterns: ComponentPattern[]): Catalog {
    return {
      add(patternName, options = {}) {
        const rawSlots = options.slots || {}

        const slots = Object.keys(rawSlots).reduce<
          Record<string, (props: any) => VNode[] | undefined>
        >((acc, key) => {
          const raw = rawSlots[key]
          acc[key] =
            typeof raw === 'function'
              ? raw.bind(getRenderProxy())
              : (_props) => {
                  return compileSlot(raw)
                }
          return acc
        }, {})

        return catalog(
          patterns.concat({
            name: patternName,
            props: options.props || {},
            data: options.data || {},
            slots,
            containerStyle: options.containerStyle || {},
            plugins: options.plugins || {},
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
            patterns,
          },
        }
      },
    }
  }

  return catalog([])
}

function compileSlot(slot: string): VNode[] {
  const compiled = compileToFunctions(`
    <div>${slot}</div>
  `)

  const vnode = compiled.render.call(getRenderProxy(compiled.staticRenderFns))
  return vnode.children!
}

function getRenderProxy(staticRenderFns?: (() => VNode)[]): Vue {
  const ctx: any = new Vue({
    staticRenderFns,
  })
  return ctx._renderProxy
}
