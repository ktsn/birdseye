import Vue from 'vue'
import birdseye from '@/main'
import { createInstrument } from '@birdseye/vue'
import style from './style.css'

const load = ctx => ctx.keys().map(ctx)
const components = load(require.context('./components', true, /\.vue$/))

// For debug
style.__inject__(document.head)
const instrument = createInstrument(Vue, {
  shadowRoot: document.head
})

birdseye('#app', instrument(components))
