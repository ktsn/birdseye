import Vue, { Component, VueConstructor, ComponentOptions } from 'vue'
import { Catalog } from '@birdseye/core'
import { createInstrument as create } from './instrument'

function isNative(Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

const hasSymbol =
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys)

export { catalogFor } from './catalog'

export function createInstrument(
  Vue: VueConstructor,
  rootOptions: ComponentOptions<any> = {}
) {
  const { instrument: _instrument } = create(Vue, rootOptions)

  return function instrument(
    Components: (Component | { default: Component })[]
  ): Catalog[] {
    return Components.map((c: any) => {
      if (c.__esModule || (hasSymbol && c[Symbol.toStringTag] === 'Module')) {
        c = c.default
      }
      return { toDeclaration: () => _instrument(c) }
    })
  }
}

export const instrument = createInstrument(Vue)
