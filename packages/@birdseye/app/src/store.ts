import Vue from 'vue'
import {
  ComponentDeclaration,
  ComponentPattern,
  ComponentMeta,
  ComponentDataType
} from '@birdseye/core'
import { dedupe } from './utils'

class Store<S> {
  private vm: Vue

  constructor(initialState: S) {
    this.vm = new Vue({
      data: initialState
    })
  }

  get state(): S {
    return this.vm.$data as S
  }
}

interface AppState {
  declarations: ComponentDeclaration[]
}

export interface QualifiedData {
  type: ComponentDataType[]
  name: string
  value: any
}

/**
 * Light-weight store to handle changing pattern values
 */
export default class AppStore extends Store<AppState> {
  getMeta(metaName: string): ComponentMeta | undefined {
    return this.state.declarations
      .map(d => d.meta)
      .find(m => m.name === metaName)
  }

  getPattern(
    metaName: string,
    patternName: string
  ): ComponentPattern | undefined {
    const meta = this.getMeta(metaName)

    if (!meta) return

    return meta.patterns.find(p => p.name === patternName)
  }

  getQualifiedProps(metaName: string, patternName?: string): QualifiedData[] {
    return this.genericQualifiedData(metaName, patternName, 'props')
  }

  getQualifiedData(metaName: string, patternName?: string): QualifiedData[] {
    return this.genericQualifiedData(metaName, patternName, 'data')
  }

  updatePropValue(
    meta: string,
    pattern: string,
    key: string,
    value: any
  ): void {
    const p = this.getPattern(meta, pattern)
    if (!p) return

    p.props[key] = value
  }

  updateDataValue(
    meta: string,
    pattern: string,
    key: string,
    value: any
  ): void {
    const p = this.getPattern(meta, pattern)
    if (!p) return

    p.data[key] = value
  }

  private genericQualifiedData(
    metaName: string,
    patternName: string | undefined,
    type: 'props' | 'data'
  ): QualifiedData[] {
    const meta = this.getMeta(metaName)
    if (!meta) return []

    const pattern = patternName && this.getPattern(metaName, patternName)
    const names = dedupe([
      ...Object.keys(meta[type]),
      ...(pattern ? Object.keys(pattern[type]) : [])
    ])

    return names.map(name => {
      const info = meta[type][name]
      const value = pattern ? pattern[type][name] : undefined
      return {
        type: info ? info.type : [],
        name,
        value
      }
    })
  }
}
