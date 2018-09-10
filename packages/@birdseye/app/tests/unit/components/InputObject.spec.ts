import { shallowMount } from '@vue/test-utils'
import InputObject from '@/components/InputObject.vue'

describe('InputObject', () => {
  const InputProperty = {
    name: 'InputProperty',
    props: ['name', 'value'],
    render(this: any, h: Function) {
      return h('input', {
        attrs: {
          'data-name': this.name,
          'data-value': this.value
        }
      })
    }
  }

  it('applies array item value for each input', () => {
    const wrapper = shallowMount(InputObject, {
      propsData: {
        value: {
          a: 'foo',
          b: 1,
          c: true
        }
      },
      stubs: {
        InputProperty
      }
    })

    const inputs = wrapper.findAll(InputProperty)
    expect(inputs.at(0).props().name).toBe('a')
    expect(inputs.at(1).props().name).toBe('b')
    expect(inputs.at(2).props().name).toBe('c')
    expect(inputs.at(0).props().value).toBe('foo')
    expect(inputs.at(1).props().value).toBe(1)
    expect(inputs.at(2).props().value).toBe(true)
  })

  it('emits input event when an item is added', () => {
    const wrapper = shallowMount(InputObject, {
      propsData: {
        value: {
          a: 'foo'
        }
      }
    })

    wrapper.find('[aria-label="Add"]').vm.$emit('click')
    expect(wrapper.emitted('input')[0][0]).toEqual({
      a: 'foo',
      '': undefined
    })
  })

  it('emits input event when an item is removed', () => {
    const wrapper = shallowMount(InputObject, {
      propsData: {
        value: {
          a: 'foo',
          b: 'bar',
          c: 'baz'
        }
      },
      stubs: {
        InputProperty
      }
    })

    wrapper
      .findAll(InputProperty)
      .at(1)
      .vm.$emit('remove')
    expect(wrapper.emitted('input')[0][0]).toEqual({
      a: 'foo',
      c: 'baz'
    })
  })

  it('emits input event when an item is updated', () => {
    const wrapper = shallowMount(InputObject, {
      propsData: {
        value: {
          a: 'foo',
          b: 'bar',
          c: 'baz'
        }
      },
      stubs: {
        InputProperty
      }
    })

    const bar = wrapper.findAll(InputProperty).at(1)
    bar.vm.$emit('input', 'updated')
    expect(wrapper.emitted('input')[0][0]).toEqual({
      a: 'foo',
      b: 'updated',
      c: 'baz'
    })
  })
})
