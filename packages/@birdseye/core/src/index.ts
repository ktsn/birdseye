import { VueConstructor } from 'vue'
import Counter from './Counter.vue'

export { Counter }

export default function install(Vue: VueConstructor): void {
  Vue.component('counter', Counter)
}

declare const window: any
if (typeof window !== 'undefined' && typeof window.Vue === 'function') {
  window.Vue.use(install)
}
