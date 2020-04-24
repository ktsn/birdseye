import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import { Catalog } from '@birdseye/core'
import LazyComponents from 'vue-lazy-components-option'
import router from './router'
import AppStore from './store'
import App from './App.vue'

export interface BirdseyePlugin {
  (catalogs: Catalog[]): void
}

export interface BirdseyeOptions {
  experimental?: boolean
  plugins?: BirdseyePlugin[]
}

Vue.use(LazyComponents)

const appTagName = 'birdseye-app'
const Root = Vue.extend({ router })

Vue.config.ignoredElements = [appTagName]
window.customElements.define(appTagName, wrap(Root, App))

export default function birdseye(
  el: string | Element,
  catalogs: Catalog[],
  options: BirdseyeOptions = {}
): void {
  Vue.prototype.$_birdseye_experimental = !!options.experimental

  const app = document.createElement(appTagName) as any

  const content = document.createElement('div')
  app.appendChild(content)

  const wrapper = typeof el === 'string' ? document.querySelector(el) : el
  wrapper!.appendChild(app)

  const store = new AppStore({
    declarations: catalogs.map((c) => c.toDeclaration()),
    fullscreen: !!router.currentRoute.query.fullscreen,
  })

  app.store = store

  new Root({
    el: content,
    render: (h) =>
      // Preview.vue
      h('router-view', {
        attrs: {
          store,
        },
      }),
  })

  // Execute plugins
  if (options.plugins) {
    options.plugins.forEach((f) => f(catalogs))
  }
}
