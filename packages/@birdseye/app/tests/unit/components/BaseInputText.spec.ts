import { shallowMount } from '@vue/test-utils'
import BaseInputText from '@/components/BaseInputText.vue'

describe('BaseInputText', () => {
  it('ports value', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test'
      }
    })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('test')
  })

  it('propagates input event', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test'
      }
    })
    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).value = 'updated'
    input.trigger('input')
    expect(wrapper.emitted('input')[0][0]).toBe('updated')
  })

  it('throws type error when input type is number and validation result is invalid and badInput', () => {
      const wrapper = shallowMount(BaseInputText, {
        propsData: {
          type: 'number',
          value: 'test'
        }
      })

      const action = () => {
        const stub = { validity: { isValid: false, badInput: true }}
        ;(wrapper.vm as any).onInput(stub)
      }
      expect(action).toThrowError(new TypeError("The input value must be numeric"))
  })
})
