import { shallowMount } from '@vue/test-utils'
import InputArray from '@/components/InputArray.vue'

describe('InputArray', () => {
  const InputProperty = {
    name: 'InputProperty',
    props: ['value'],
    render(this: any, h: Function) {
      return h('input', {
        attrs: {
          'data-value': this.value
        }
      })
    }
  }

  it('applies array item value for each input', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 1, true]
      },
      stubs: {
        InputProperty
      }
    })

    const inputs = wrapper.findAll(InputProperty)
    expect(inputs.at(0).props().value).toBe('foo')
    expect(inputs.at(1).props().value).toBe(1)
    expect(inputs.at(2).props().value).toBe(true)
  })

  it('emits input event when an item is added', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo']
      }
    })

    wrapper.find('[aria-label="Add"]').vm.$emit('click')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', undefined])
  })

  it('emits input event when an item is removed', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 'bar', 'baz']
      },
      stubs: {
        InputProperty
      }
    })

    wrapper
      .findAll(InputProperty)
      .at(1)
      .vm.$emit('remove')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', 'baz'])
  })

  it('emits input event when an item is updated', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 'bar', 'baz']
      },
      stubs: {
        InputProperty
      }
    })

    const bar = wrapper.findAll(InputProperty).at(1)
    bar.vm.$emit('input', 'updated')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', 'updated', 'baz'])
  })
})
