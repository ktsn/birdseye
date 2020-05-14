import { shallowMount } from '@vue/test-utils'
import BaseInputText from '@/components/BaseInputText.vue'

describe('BaseInputText', () => {
  it('ports value', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test',
      },
    })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('test')
  })

  it('propagates input event', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test',
      },
    })
    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).value = 'updated'
    input.trigger('input')
    expect(wrapper.emitted('input')![0][0]).toBe('updated')
  })
})
