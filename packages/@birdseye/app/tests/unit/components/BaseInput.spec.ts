import { shallowMount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput', () => {
  describe('supported types', () => {
    it('string', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'string value',
          availableTypes: ['string']
        }
      })

      const select = wrapper.find('.select-type').element as HTMLSelectElement
      expect(select.value).toBe('string')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    const Test = {
      name: 'Test',
      render(h: Function): any {
        return h()
      }
    }

    it('ports input event from the field', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'str',
          availableTypes: ['string']
        },
        stubs: {
          InputString: Test
        }
      })

      wrapper.find(Test).vm.$emit('input', 'updated')
      expect(wrapper.emitted('input')[0][0]).toBe('updated')
    })

    it('emits change-type event', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'str',
          availableTypes: ['string', 'number']
        }
      })

      const select = wrapper.find('.select-type')
      const selectEl = select.element as HTMLSelectElement
      selectEl.value = 'number'
      select.trigger('change')

      expect(wrapper.emitted('change-type')[0][0]).toBe('number')
    })
  })
})
