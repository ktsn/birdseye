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

  it('allows to set class', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test',
        inputClass: 'test-input'
      }
    })
    expect(wrapper.find('input').classes()).toContain('test-input')
  })

  it('allows to set style', () => {
    const wrapper = shallowMount(BaseInputText, {
      propsData: {
        value: 'test',
        inputStyle: {
          width: '200px'
        }
      }
    })
    expect(wrapper.find('input').element.style.width).toBe('200px')
  })

  it('allows to provide input DOM element', done => {
    const hook = (input: any) => {
      expect(input).toBeInstanceOf(HTMLInputElement)
      done()
    }

    shallowMount(BaseInputText, {
      propsData: {
        value: 'test',
        refInput: hook
      }
    })
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
})
