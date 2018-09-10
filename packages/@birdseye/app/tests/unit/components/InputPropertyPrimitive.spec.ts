import { shallowMount } from '@vue/test-utils'
import InputPropertyPrimitive from '@/components/InputPropertyPrimitive.vue'
import BaseInput from '@/components/BaseInput.vue'

describe('InputPropertyPrimitive', () => {
  it('ports value to the form component', () => {
    const wrapper = shallowMount(InputPropertyPrimitive, {
      propsData: {
        name: 'propname',
        value: 'foo'
      }
    })
    const input = wrapper.find(BaseInput)
    expect(input.props().value).toBe('foo')
  })

  it('ports available types to the form component', () => {
    const wrapper = shallowMount(InputPropertyPrimitive, {
      propsData: {
        name: 'propname',
        value: 'test',
        availableTypes: ['string', 'number']
      }
    })
    const input = wrapper.find(BaseInput)
    expect(input.props().availableTypes).toEqual(['string', 'number'])
  })

  it('listens input events from the form component', () => {
    const wrapper = shallowMount(InputPropertyPrimitive, {
      propsData: {
        name: 'propname',
        value: 'foo'
      }
    })
    const input = wrapper.find(BaseInput)
    input.vm.$emit('input', 'bar')
    expect(wrapper.emitted('input')[0][0]).toBe('bar')
  })

  it('listens remove events', () => {
    const wrapper = shallowMount(InputPropertyPrimitive, {
      propsData: {
        name: 'propname',
        value: 'foo'
      }
    })
    wrapper.find('[aria-label="Remove"]').vm.$emit('click')
    expect(wrapper.emitted('remove').length).toBe(1)
  })
})
