declare module '*.css' {
  const _default: any
  export default _default
}

declare module '*.vue' {
  import Vue from 'vue'
  const _default: typeof Vue
  export default _default
}
