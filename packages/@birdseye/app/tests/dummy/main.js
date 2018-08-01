import birdseye from '@/main'
import { instrument } from '@birdseye/vue'
import style from './style.css'

const load = ctx => ctx.keys().map(ctx)
const components = load(require.context('./components', true, /\.vue$/))

style.__inject__(document.head)

birdseye('#app', instrument(components))
