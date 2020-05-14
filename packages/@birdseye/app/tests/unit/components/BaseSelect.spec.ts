import { shallowMount } from '@vue/test-utils'
import BaseSelect from '@/components/BaseSelect.vue'

describe('BaseSelect', () => {
  it('ports value', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        value: 'bar',
      },
      slots: {
        default: `
          <option>foo</option>
          <option>bar</option>
          <option>baz</option>
        `,
      },
    })
    const select = wrapper.find('select').element as HTMLSelectElement
    expect(select.value).toBe('bar')
  })

  it('propagates change event', () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        value: 'bar',
      },
      slots: {
        default: `
          <option id="foo">foo</option>
          <option>bar</option>
          <option>baz</option>
        `,
      },
    })
    const option = wrapper.find('#foo').element as HTMLOptionElement
    option.selected = true
    wrapper.find('select').trigger('change')
    expect(wrapper.emitted('change')![0][0]).toBe('foo')
  })
})
