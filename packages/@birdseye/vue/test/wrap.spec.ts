import Vue, { VNode } from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { ComponentDataType } from '@birdseye/core'
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
        // props, data
        el('foo', this.foo),
        el('bar', this.bar),
        el('baz', this.baz),

        // slots
        el('default-slot', this.$slots.default),
        el('named-slot', this.$slots.named)
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

  it('applies initial slots', async () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: ''
        },
        data: {}
      },
      slots: {
        default: 'default slot',
        named: 'named slot'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#default-slot').text()).toBe('default slot')
    expect(wrapper.find('#named-slot').text()).toBe('named slot')
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

  it('allows to map render function', async () => {
    const { wrap } = createInstrument(Vue, {}, (h, vnode) => {
      return h('div', { attrs: { 'data-test': 'wrapper' } }, [vnode])
    })

    const Test = Vue.extend({
      props: ['foo'],

      data() {
        return {
          bar: 123
        }
      },

      render(h): VNode {
        return h('div', [`foo: ${this.foo}, bar: ${this.bar}`])
      }
    })

    const Wrapper = wrap(Test)

    const wrapper = shallowMount(Wrapper, {
      propsData: {
        props: {
          foo: 'Test'
        },
        data: {
          bar: 456
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div style=\\"height: 100%;\\">
        <div data-test=\\"wrapper\\">
          <div>foo: Test, bar: 456</div>
        </div>
      </div>"
    `)
  })

  describe('props default', () => {
    async function test(
      meta: { type: ComponentDataType[]; defaultValue?: any },
      prop: any,
      expected: any
    ) {
      const Test = Vue.extend({
        props: ['__test__'],

        render(h) {
          const rendered =
            typeof this.__test__ === 'object'
              ? JSON.stringify(this.__test__)
              : this.__test__
          return h('div', rendered)
        }
      })

      const Wrapper = wrap(Test, {
        __test__: meta
      })

      const wrapper = shallowMount(Wrapper, {
        propsData: {
          props:
            prop === undefined
              ? {}
              : {
                  __test__: prop
                },
          data: {}
        }
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toBe(expected)
    }

    it('fills props value from meta default value', () => {
      return test({ type: ['string'], defaultValue: 'test' }, undefined, 'test')
    })

    it('fills props value from meta type', () => {
      return test({ type: ['number'] }, undefined, '0')
    })

    it('does not auto fills with null value', () => {
      return test({ type: ['string'] }, null, 'null')
    })

    it('does not auto fills props value when default is specified even if it is null or undefined', async () => {
      await test({ type: ['array'], defaultValue: null }, undefined, 'null')
      await test({ type: ['array'], defaultValue: undefined }, undefined, '')
    })

    it('does not overwrite specified props with default value', () => {
      return test({ type: ['string'], defaultValue: 'test' }, 'foo', 'foo')
    })
  })
})
