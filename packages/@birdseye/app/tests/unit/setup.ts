import Vue from 'vue'
import LazyComponents from 'vue-lazy-components-option'
import { config } from '@vue/test-utils'

Vue.use(LazyComponents)

Vue.prototype.$_birdseye_experimental = true
