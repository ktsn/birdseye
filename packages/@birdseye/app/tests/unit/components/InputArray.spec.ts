import { shallowMount } from '@vue/test-utils'
import InputArray from '@/components/InputArray.vue'
import BaseInput from '@/components/BaseInput.vue'

describe('InputArray', () => {
  it('applies array item value for each input', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 1, true]
      }
    })

    const inputs = wrapper.findAll(BaseInput)
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

    wrapper.find('[aria-label="Add"]').trigger('click')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', undefined])
  })

  it('emits input event when an item is removed', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 'bar', 'baz']
      }
    })

    wrapper
      .findAll('[aria-label="Remove"]')
      .at(1)
      .trigger('click')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', 'baz'])
  })

  it('emits input event when an item is updated', () => {
    const wrapper = shallowMount(InputArray, {
      propsData: {
        value: ['foo', 'bar', 'baz']
      }
    })

    const bar = wrapper.findAll(BaseInput).at(1)
    bar.vm.$emit('input', 'updated')
    expect(wrapper.emitted('input')[0][0]).toEqual(['foo', 'updated', 'baz'])
  })
})
