import { shallowMount, Wrapper } from '@vue/test-utils'
import InputPropertyObject from '@/components/InputPropertyObject.vue'
import BaseInput from '@/components/BaseInput.vue'

describe('InputPropertyObject', () => {
  function findValueInput(wrapper: Wrapper<any>) {
    return wrapper
      .findAll(BaseInput)
      .wrappers.find(w => !w.props().removeInput)!
  }

  it('ports value to the form component', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo', 'bar']
      }
    })
    wrapper.findAll(BaseInput).wrappers.forEach(input => {
      expect(input.props().value).toEqual(['foo', 'bar'])
    })
  })

  it('listens input events from the form component', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo']
      }
    })
    const input = findValueInput(wrapper)
    input.vm.$emit('input', ['bar'])
    expect(wrapper.emitted('input')[0][0]).toEqual(['bar'])
  })

  it('listens remove events', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo']
      }
    })
    wrapper.find('[aria-label="Remove"]').trigger('click')
    expect(wrapper.emitted('remove').length).toBe(1)
  })
})
