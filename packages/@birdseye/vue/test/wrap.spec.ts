import Vue, { VNode } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { wrap } from '../src/instrument'

describe('Wrap', () => {
  const Dummy = Vue.extend({
    name: 'Dummy',

    props: {
      foo: {
        type: String,
        required: true
      },

      bar: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        baz: true
      }
    },

    render(h): VNode {
      return h()
    }
  })

  const Wrapper = wrap(Dummy)

  it('applies initial props and data', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: false
        }
      }
    })

    const dummy = wrapper.find(Dummy)
    expect(dummy.props()).toEqual({
      foo: 'test',
      bar: 123
    })
    expect(dummy.vm.$data).toEqual({
      baz: false
    })
  })

  it('updates props', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: false
        }
      }
    })

    wrapper.setProps({
      props: {
        foo: 'updated',
        bar: 123
      }
    })

    const dummy = wrapper.find(Dummy)

    expect(dummy.props()).toEqual({
      foo: 'updated',
      bar: 123
    })
  })

  it('updates data', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: false
        }
      }
    })

    wrapper.setProps({
      data: {
        baz: true
      }
    })

    const dummy = wrapper.find(Dummy)

    expect(dummy.vm.$data).toEqual({
      baz: true
    })
  })

  it('removes props', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 42
        },
        data: {}
      }
    })

    wrapper.setProps({
      props: {
        foo: 'test'
      }
    })

    const dummy = wrapper.find(Dummy)

    expect(dummy.props()).toEqual({
      foo: 'test',
      bar: 0
    })
  })

  it('removes data', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 42
        },
        data: {
          baz: 'baz'
        }
      }
    })

    wrapper.setProps({
      data: {}
    })

    const dummy = wrapper.find(Dummy)

    expect(dummy.vm.$data).toEqual({
      baz: undefined
    })
  })
})
