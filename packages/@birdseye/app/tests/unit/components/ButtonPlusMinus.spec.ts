import { shallowMount } from '@vue/test-utils'
import ButtonPlusMinus from '@/components/ButtonPlusMinus.vue'

describe('ButtonPlusMinus', () => {
  it('propagates click event', () => {
    const wrapper = shallowMount(ButtonPlusMinus)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click').length).toBe(1)
  })
})
