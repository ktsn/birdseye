import Vue, { ComponentOptions } from 'vue'
import wrap from '@vue/web-component-wrapper'
import { ComponentDeclaration } from '@birdseye/core'
import router from './router'
import App from './App.vue'

interface BirdseyeOptions {
  // @internal
  __shadowRoot?: HTMLElement
}

const appTagName = 'birdseye-app'

Vue.config.ignoredElements = [appTagName]
window.customElements.define(appTagName, wrap(Vue, App.extend({ router })))

export default function birdseye(
  el: string | Element,
  declarations: ComponentDeclaration[],
  options: BirdseyeOptions = {}
): void {
  const app = document.createElement(appTagName) as any

  const content = document.createElement('div')
  app.appendChild(content)

  const wrapper = typeof el === 'string' ? document.querySelector(el) : el
  wrapper!.appendChild(app)

  app.declarations = declarations

  const compOptions: ComponentOptions<Vue> = {
    router,
    render: h =>
      // Preview.vue
      h('router-view', {
        attrs: {
          declarations
        }
      })
  }

  if (options.__shadowRoot) {
    ;(compOptions as any).shadowRoot = options.__shadowRoot
  }

  new Vue(compOptions).$mount(content)
}
