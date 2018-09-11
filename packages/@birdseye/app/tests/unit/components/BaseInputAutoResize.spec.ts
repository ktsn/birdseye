import { shallowMount } from '@vue/test-utils'
import BaseInputAutoResize from '@/components/BaseInputAutoResize.vue'

describe('BaseInputAutoResize', () => {
  const BaseInputText = {
    name: 'BaseInputText',

    props: ['value', 'inputClass', 'inputStyle', 'refInput'],

    mounted(this: any) {
      // mock scrollWidth based on value length
      Object.defineProperty(this.$el, 'scrollWidth', {
        get: () => this.value.length
      })
      this.refInput(this.$el)
    },

    render(h: Function) {
      return h('input')
    }
  }

  describe('features as wrapper', () => {
    it('ports value', () => {
      const wrapper = shallowMount(BaseInputAutoResize, {
        propsData: {
          value: 'test'
        },
        stubs: {
          BaseInputText
        }
      })
      expect(wrapper.find(BaseInputText).props().value).toBe('test')
    })

    it('propagates input event', () => {
      const wrapper = shallowMount(BaseInputAutoResize, {
        propsData: {
          value: 'test'
        },
        stubs: {
          BaseInputText
        }
      })
      wrapper.find(BaseInputText).vm.$emit('input', 'updated')
      expect(wrapper.emitted('input')[0][0]).toBe('updated')
    })
  })

  describe('auto resize', () => {
    it('sets class and style initially', () => {
      const wrapper = shallowMount(BaseInputAutoResize, {
        propsData: {
          value: 'test'
        },
        stubs: {
          BaseInputText
        }
      })
      const child = wrapper.find(BaseInputText)
      expect(child.props().inputClass).toBe('auto-resize')
      expect(child.props().inputStyle).toEqual({ width: '0px' })
    })

    it('updates width style based on input scrollWidth', async () => {
      const wrapper = shallowMount(BaseInputAutoResize, {
        propsData: {
          value: 'test'
        },
        stubs: {
          BaseInputText
        }
      })

      await wrapper.vm.$nextTick()

      const child = wrapper.find(BaseInputText)
      expect(child.props().inputStyle).toEqual({ width: '4px' })

      wrapper.setProps({
        value: 'updated'
      })
      expect(child.props().inputStyle).toEqual({ width: '7px' })
    })
  })
})
