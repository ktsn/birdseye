import Vue, { VNode } from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { createInstrument } from '../src/instrument'

describe('Wrap', () => {
  const { wrap } = createInstrument(Vue)

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
        baz: 'baz'
      }
    },

    render(h): VNode {
      const el = (id: string, content: any) => {
        return h('div', { attrs: { id } }, [content])
      }

      return h('div', [
        el('foo', this.foo),
        el('bar', this.bar),
        el('baz', this.baz)
      ])
    }
  })

  const Wrapper = wrap(Dummy)

  it('applies initial props and data', async () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: 'baz data'
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#foo').text()).toBe('test')
    expect(wrapper.find('#bar').text()).toBe('123')
    expect(wrapper.find('#baz').text()).toBe('baz data')
  })

  it('updates props', async () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: 'baz data'
        }
      }
    })

    wrapper.setProps({
      props: {
        foo: 'updated',
        bar: 123
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#foo').text()).toBe('updated')
  })

  it('updates data', async () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'test',
          bar: 123
        },
        data: {
          baz: 'baz data'
        }
      }
    })

    wrapper.setProps({
      data: {
        baz: 'baz updated'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#baz').text()).toBe('baz updated')
  })

  it('removes props', async () => {
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

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#bar').text()).toBe('0')
  })

  it('removes data', async () => {
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

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#baz').text()).toBe('')
  })

  it('can be injected Vue constructor', () => {
    const localVue = createLocalVue()
    localVue.prototype.$test = 'injected'

    const Test = {
      render(h: Function): any {
        return h('div', (this as any).$test)
      }
    }

    const { wrap } = createInstrument(localVue)
    const Wrapper = wrap(Test)

    const wrapper = shallowMount(Wrapper, {
      localVue,
      propsData: {
        props: {},
        data: {}
      }
    })
    expect(wrapper.text()).toBe('injected')
  })

  it('can be injected root constructor options', () => {
    const { wrap } = createInstrument(Vue, {
      test: 'injected'
    } as any)

    const Test = {
      render(h: Function): any {
        return h('div', (this as any).$root.$options.test)
      }
    }

    const Wrapper = wrap(Test)

    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {},
        data: {}
      }
    })
    expect(wrapper.text()).toBe('injected')
  })
})
