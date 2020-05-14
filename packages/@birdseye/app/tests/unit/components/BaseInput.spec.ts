import { shallowMount, Wrapper } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { ComponentDataType } from '@birdseye/core'

describe('BaseInput', () => {
  describe('rendering', () => {
    it('removes input', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'foo',
          removeInput: true,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('removes type selector', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'foo',
          removeTypes: true,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('supported types', () => {
    it('string', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'string value',
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('number', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 123,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('boolean', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: true,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('array', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: ['foo', 42, true],
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('object', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: {
            a: 'foo',
            b: 42,
            c: true,
          },
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('null', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: null,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('undefined', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: undefined,
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    const Test = {
      name: 'Test',
      render(h: Function): any {
        return h()
      },
    }

    it('ports input event from the field', () => {
      const wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'str',
          availableTypes: ['string'],
        },
        stubs: {
          InputString: Test,
        },
      })

      wrapper.findComponent(Test).vm.$emit('input', 'updated')
      expect(wrapper.emitted('input')![0][0]).toBe('updated')
    })
  })

  describe('will emit input event with empty value when the type is changed', () => {
    function changeType(wrapper: Wrapper<any>, type: ComponentDataType): void {
      const select = wrapper.findComponent(BaseSelect)
      select.vm.$emit('change', type)
    }

    let wrapper: Wrapper<any>
    beforeEach(() => {
      wrapper = shallowMount(BaseInput, {
        propsData: {
          value: 'str',
        },
      })
    })

    it('string', () => {
      changeType(wrapper, 'string')
      expect(wrapper.emitted('input')![0][0]).toBe('')
    })

    it('number', () => {
      changeType(wrapper, 'number')
      expect(wrapper.emitted('input')![0][0]).toBe(0)
    })

    it('boolean', () => {
      changeType(wrapper, 'boolean')
      expect(wrapper.emitted('input')![0][0]).toBe(false)
    })

    it('array', () => {
      changeType(wrapper, 'array')
      expect(wrapper.emitted('input')![0][0]).toEqual([])
    })

    it('object', () => {
      changeType(wrapper, 'object')
      expect(wrapper.emitted('input')![0][0]).toEqual({})
    })

    it('null', () => {
      changeType(wrapper, 'null')
      expect(wrapper.emitted('input')![0][0]).toEqual(null)
    })

    it('undefined', () => {
      changeType(wrapper, 'undefined')
      expect(wrapper.emitted('input')![0][0]).toEqual(undefined)
    })
  })
})
