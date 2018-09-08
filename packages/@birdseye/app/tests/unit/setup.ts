import Vue from 'vue'
import LazyComponents from 'vue-lazy-components-option'
import { config } from '@vue/test-utils'

Vue.use(LazyComponents)

config.logModifiedComponents = false
