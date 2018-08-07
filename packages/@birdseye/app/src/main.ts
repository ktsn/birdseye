import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import { ComponentDeclaration } from '@birdseye/core'
import router from './router'
import App from './App.vue'

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

  app.nav = declarations.map(d => d.meta)

  new Root({
    el: content,
    render: h =>
      // Preview.vue
      h('router-view', {
        attrs: {
          declarations
        }
      })
  })
}
