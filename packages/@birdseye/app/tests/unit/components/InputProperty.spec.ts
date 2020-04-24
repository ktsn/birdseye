import { shallowMount } from '@vue/test-utils'
import InputProperty from '@/components/InputProperty.vue'
import InputPropertyPrimitive from '@/components/InputPropertyPrimitive.vue'
import InputPropertyObject from '@/components/InputPropertyObject.vue'

describe('InputProperty', () => {
  it('treats null as primitive', () => {
    const wrapper = shallowMount(InputProperty, {
      context: {
        attrs: {
          name: 'propname',
          value: null,
        },
      },
    })
    expect(wrapper.find(InputPropertyPrimitive).isVisible()).toBe(true)
  })

  it('treats array as object', () => {
    const wrapper = shallowMount(InputProperty, {
      context: {
        attrs: {
          name: 'propname',
          value: [],
        },
      },
    })
    expect(wrapper.find(InputPropertyObject).isVisible()).toBe(true)
  })

  it('treats object as object', () => {
    const wrapper = shallowMount(InputProperty, {
      context: {
        attrs: {
          name: 'propname',
          value: {},
        },
      },
    })
    expect(wrapper.find(InputPropertyObject).isVisible()).toBe(true)
  })
})
