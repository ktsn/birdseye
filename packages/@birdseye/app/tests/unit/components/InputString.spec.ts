import { shallowMount } from '@vue/test-utils'
import InputString from '@/components/InputString.vue'

describe('InputString', () => {
  it('applies input prop to actual element', () => {
    const wrapper = shallowMount(InputString, {
      propsData: {
        value: 'prop value'
      }
    })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('prop value')
  })

  it('ports input event', () => {
    const wrapper = shallowMount(InputString, {
      propsData: {
        value: 'prop value'
      }
    })
    const input = wrapper.find('input')
    const inputEl = input.element as HTMLInputElement
    inputEl.value = 'updated'
    input.trigger('input')

    expect(wrapper.emitted('input')[0][0]).toBe('updated')
  })
})
