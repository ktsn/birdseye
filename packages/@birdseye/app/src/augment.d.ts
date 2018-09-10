import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $_birdseye_experimental: boolean
  }
}
