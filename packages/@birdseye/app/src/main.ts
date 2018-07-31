import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import App from './App.vue'

const appTagName = 'birdseye-app'

Vue.config.ignoredElements = [appTagName]
window.customElements.define(appTagName, wrap(Vue, App))

export default function birdseye(el: string | Element) {
  const app = document.createElement(appTagName)
  const content = document.createElement('div')
  app.appendChild(content)

  const wrapper = typeof el === 'string' ? document.querySelector(el) : el
  wrapper!.appendChild(app)

  new Vue({
    el: content,
    render: h => h('p', 'placeholder')
  })
}
