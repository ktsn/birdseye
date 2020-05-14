import { shallowMount } from '@vue/test-utils'
import InputString from '@/components/InputString.vue'
import BaseInputText from '@/components/BaseInputText.vue'

describe('InputString', () => {
  it('applies input prop to actual element', () => {
    const wrapper = shallowMount(InputString, {
      propsData: {
        value: 'prop value',
      },
    })
    const input = wrapper.findComponent(BaseInputText)
    expect(input.props().value).toBe('prop value')
  })

  it('ports input event', () => {
    const wrapper = shallowMount(InputString, {
      propsData: {
        value: 'prop value',
      },
    })
    const input = wrapper.findComponent(BaseInputText)
    input.vm.$emit('input', 'updated')

    expect(wrapper.emitted('input')![0][0]).toBe('updated')
  })
})
