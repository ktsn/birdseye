import { shallowMount } from '@vue/test-utils'
import InputNumber from '@/components/InputNumber.vue'

describe('InputNumber', () => {
  it('applies input prop to actual element', () => {
    const wrapper = shallowMount(InputNumber, {
      propsData: {
        value: 123
      }
    })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('123')
  })

  it('ports input event with converting value to number', () => {
    const wrapper = shallowMount(InputNumber, {
      propsData: {
        value: 123
      }
    })
    const input = wrapper.find('input')
    const inputEl = input.element as HTMLInputElement
    inputEl.value = '456'
    input.trigger('input')

    expect(wrapper.emitted('input')[0][0]).toBe(456)
  })
})
