import { shallowMount } from '@vue/test-utils'
import Counter from '@/Counter.vue'

describe('Counter', () => {
  it('accepts value prop', () => {
    const wrapper = shallowMount(Counter, {
      propsData: {
        value: 3
      }
    })

    expect(wrapper.find('.counter-value').text()).toBe('3')
  })
})
