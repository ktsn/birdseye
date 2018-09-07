import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import { ComponentDeclaration } from '@birdseye/core'
import LazyComponents from 'vue-lazy-components-option'
import router from './router'
import AppStore from './store'
import App from './App.vue'

Vue.use(LazyComponents)

const appTagName = 'birdseye-app'
const Root = Vue.extend({ router })

Vue.config.ignoredElements = [appTagName]
window.customElements.define(appTagName, wrap(Root, App))

export default function birdseye(
  el: string | Element,
  declarations: ComponentDeclaration[]
): void {
  const app = document.createElement(appTagName) as any

  const content = document.createElement('div')
  app.appendChild(content)

  const wrapper = typeof el === 'string' ? document.querySelector(el) : el
  wrapper!.appendChild(app)

  const store = new AppStore({
    declarations
  })

  app.store = store

  new Root({
    el: content,
    render: h =>
      // Preview.vue
      h('router-view', {
        attrs: {
          store
        }
      })
  })
}
