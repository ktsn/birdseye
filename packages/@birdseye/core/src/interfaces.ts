import { VueConstructor, VNode } from 'vue'

export interface Catalog {
  toDeclaration(): ComponentDeclaration
}

export interface ComponentDeclaration {
  Wrapper: VueConstructor
  meta: ComponentMeta
}

export interface ComponentMeta {
  name: string
  props: Record<string, ComponentDataInfo>
  data: Record<string, ComponentDataInfo>
  patterns: ComponentPattern[]
}

export type ComponentDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null'
  | 'undefined'

export interface ComponentDataInfo {
  type: ComponentDataType[]
  defaultValue?: any
}

export interface ComponentPattern {
  name: string
  props: Record<string, any>
  data: Record<string, any>
  slots: Record<string, (props: any) => VNode[]>
}

export interface ComponentEvent {
  name: string
  args: any[]
}
