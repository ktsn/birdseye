import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import InputBoolean from '@/components/InputBoolean.vue'

describe('InputBoolean', () => {
  it('applies input prop to actual element checked', async () => {
    const wrapper = shallowMount(InputBoolean, {
      propsData: {
        value: true,
      },
    })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.checked).toBe(true)

    wrapper.setProps({
      value: false,
    })
    await Vue.nextTick()
    expect(input.checked).toBe(false)
  })

  it('emit input event when checkbox is changed', () => {
    const wrapper = shallowMount(InputBoolean, {
      propsData: {
        value: true,
      },
    })
    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).checked = false
    input.trigger('change')

    expect(wrapper.emitted('input')![0][0]).toBe(false)
  })
})
