import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    /* eslint-disable @typescript-eslint/no-empty-interface */
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
