// @ts-ignore
import birdseye from '@birdseye/app'
import { snapshotPlugin } from '../../src/plugin'
import './style.css'

const load = (ctx: any) => ctx.keys().map((x: any) => ctx(x).default)
const catalogs = load(require.context('./catalogs', true, /\.catalog\.ts$/))

birdseye('#app', catalogs, {
  plugins: [snapshotPlugin],
})
