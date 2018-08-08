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

  it('removes data with undefined', async () => {
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
      data: {
        baz: undefined
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#baz').text()).toBe('')
  })

  it('uses props value for default data', async () => {
    const Test = Vue.extend({
      props: ['foo'],
      data() {
        return {
          bar: this.foo
        }
      },
      render(h): any {
        return h('div', ['data - ' + this.bar])
      }
    })

    const wrapper = shallowMount(wrap(Test), {
      propsData: {
        props: {
          foo: 'first'
        },
        data: {}
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('data - first')

    wrapper.setProps({
      props: {
        foo: 'second'
      },
      data: {}
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('data - second')
  })

  it('does not remove data when not specified', async () => {
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

    expect(wrapper.find('#baz').text()).toBe('baz')
  })

  it('can be injected Vue constructor', async () => {
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

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('injected')
  })

  it('can be injected root constructor options', async () => {
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

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('injected')
  })

  it('fills props value from meta default value', async () => {
    const Test = Vue.extend({
      props: {
        foo: {
          type: String,
          default: 'test'
        }
      },

      render(h) {
        return h('div', this.foo)
      }
    })

    const Wrapper = wrap(Test, {
      foo: { type: ['string'], defaultValue: 'test1' }
    })

    const wrapper = shallowMount(Wrapper, {
      propsData: { props: {}, data: {} }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('test1')
  })

  it('fills props value from meta type', async () => {
    const Test = Vue.extend({
      props: {
        foo: Number
      },

      render(h) {
        return h('div', String(this.foo))
      }
    })

    const Wrapper = wrap(Test, {
      foo: { type: ['number'] }
    })

    const wrapper = shallowMount(Wrapper, {
      propsData: { props: {}, data: {} }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('0')
  })

  it('does not overwrite specified props with default value', async () => {
    const Test = Vue.extend({
      props: {
        foo: {
          type: String
        }
      },

      render(h) {
        return h('div', this.foo)
      }
    })

    const Wrapper = wrap(Test, {
      foo: { type: ['string'], defaultValue: 'test' }
    })

    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: { foo: 'foo' },
        data: {}
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('foo')
  })
})
