import { VueConstructor } from 'vue'

export interface ComponentDeclaration {
  Wrapper: VueConstructor
  name: string
  patterns: ComponentPattern[]
}

export interface ComponentPattern {
  name: string
  props: Record<string, any>
  data: Record<string, any>
}
