import { VueConstructor } from 'vue'

export interface ComponentDeclaration {
  Wrapper: VueConstructor
  meta: ComponentMeta
}

export interface ComponentMeta {
  name: string
  patterns: ComponentPattern[]
}

export interface ComponentPattern {
  name: string
  props: Record<string, any>
  data: Record<string, any>
}
