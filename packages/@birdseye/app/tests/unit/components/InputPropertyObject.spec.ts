import { shallowMount, Wrapper } from '@vue/test-utils'
import InputPropertyObject from '@/components/InputPropertyObject.vue'
import BaseInput from '@/components/BaseInput.vue'

describe('InputPropertyObject', () => {
  function findTypeInput(wrapper: Wrapper<any>) {
    return wrapper
      .findAllComponents(BaseInput)
      .wrappers.find((w) => !w.props().removeType)!
  }

  function findValueInput(wrapper: Wrapper<any>) {
    return wrapper
      .findAllComponents(BaseInput)
      .wrappers.find((w) => !w.props().removeInput)!
  }

  it('ports value to the form component', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo', 'bar'],
      },
    })
    wrapper.findAllComponents(BaseInput).wrappers.forEach((input) => {
      expect(input.props().value).toEqual(['foo', 'bar'])
    })
  })

  it('ports available types to the form component', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['test'],
        availableTypes: ['array', 'object'],
      },
    })
    const input = findTypeInput(wrapper)
    expect(input.props().availableTypes).toEqual(['array', 'object'])
  })

  it('listens input events from the form component', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo'],
      },
    })
    const type = findTypeInput(wrapper)
    type.vm.$emit('input', {})

    const value = findValueInput(wrapper)
    value.vm.$emit('input', ['bar'])

    expect(wrapper.emitted('input')![0][0]).toEqual({})
    expect(wrapper.emitted('input')![1][0]).toEqual(['bar'])
  })

  it('listens remove events', () => {
    const wrapper = shallowMount(InputPropertyObject, {
      propsData: {
        name: 'propname',
        value: ['foo'],
      },
    })
    wrapper.find('[aria-label="Remove"]').vm.$emit('click')
    expect(wrapper.emitted('remove')!.length).toBe(1)
  })
})
