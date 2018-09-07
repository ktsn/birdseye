import Vue from 'vue'
import { ComponentDeclaration } from '@birdseye/core'

class Store<S> {
  private vm: Vue

  constructor(initialState: S) {
    this.vm = new Vue({
      data: initialState
    })
  }

  get state(): S {
    return this.vm.$data as S
  }
}

interface AppState {
  declarations: ComponentDeclaration[]
}

/**
 * Light-weight store to handle changing pattern values
 */
export default class AppStore extends Store<AppState> {}
