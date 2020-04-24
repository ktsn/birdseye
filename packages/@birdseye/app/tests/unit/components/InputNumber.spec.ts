import { shallowMount } from '@vue/test-utils'
import InputNumber from '@/components/InputNumber.vue'
import BaseInputText from '@/components/BaseInputText.vue'

describe('InputNumber', () => {
  it('applies input prop to actual element', () => {
    const wrapper = shallowMount(InputNumber, {
      propsData: {
        value: 123,
      },
    })
    const input = wrapper.find(BaseInputText)
    expect(input.props().value).toBe('123')
  })

  it('ports input event with converting value to number', () => {
    const wrapper = shallowMount(InputNumber, {
      propsData: {
        value: 123,
      },
    })
    const input = wrapper.find(BaseInputText)
    input.vm.$emit('input', 456)

    expect(wrapper.emitted('input')[0][0]).toBe(456)
  })
})
