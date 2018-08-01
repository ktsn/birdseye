import { Component } from 'vue'
import { ComponentDeclaration } from '@birdseye/core'
import { instrument as _instrument } from './instrument'

function isNative(Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

const hasSymbol =
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys)

export function instrument(
  Components: (Component | { default: Component })[]
): ComponentDeclaration[] {
  return Components.map((c: any) => {
    if (c.__esModule || (hasSymbol && c[Symbol.toStringTag] === 'Module')) {
      c = c.default
    }
    return _instrument(c)
  })
}
