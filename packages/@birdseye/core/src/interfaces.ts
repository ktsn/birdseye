import { VueConstructor } from 'vue'

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

export interface ComponentDataInfo {
  type: ComponentDataType[]
  defaultValue?: any
}

export interface ComponentPattern {
  name: string
  props: Record<string, any>
  data: Record<string, any>
}
