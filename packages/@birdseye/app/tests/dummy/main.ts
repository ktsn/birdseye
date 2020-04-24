import Vue from 'vue'
import birdseye from '@/main'
import { createInstrument } from '@birdseye/vue'
// @ts-ignore
import { snapshotPlugin } from '../../../snapshot/lib/plugin' // Avoid circular dependencies
import style from './style.css'

const load = (ctx: any) => ctx.keys().map((x: any) => ctx(x).default)
const components = load(require.context('./components', true, /\.vue$/))
const catalogs = load(require.context('./catalogs', true, /\.catalog\.ts$/))

// For debug
style.__inject__(document.head)
const instrument = createInstrument(Vue, {
  shadowRoot: document.head,
})

birdseye('#app', catalogs.concat(instrument(components)), {
  experimental: true,
  plugins: [snapshotPlugin],
})
