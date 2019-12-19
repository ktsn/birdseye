// @ts-ignore
import birdseye from '@birdseye/app'
import './style.css'

const load = (ctx: any) => ctx.keys().map((x: any) => ctx(x).default)
const catalogs = load(require.context('./catalogs', true, /\.catalog\.ts$/))

birdseye('#app', catalogs)
