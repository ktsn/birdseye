import { Component } from 'vue'
import { ComponentDeclaration } from '@birdseye/core'
import { instrument as _instrument } from './instrument'

export function instrument(Components: Component[]): ComponentDeclaration[] {
  return Components.map(_instrument)
}
