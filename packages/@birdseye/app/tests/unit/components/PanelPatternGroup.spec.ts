import { shallowMount } from '@vue/test-utils'
import PanelPatternGroup from '@/components/PanelPatternGroup.vue'

describe('PanelPatternGroup', () => {
  const dummyData = [
    {
      type: ['string'],
      name: 'foo',
      value: 'string value'
    },
    {
      type: ['number'],
      name: 'bar',
      value: 123
    },
    {
      type: ['string', 'number'],
      name: 'baz',
      value: 'test'
    }
  ]

  const StubInputProperty = {
    name: 'InputProperty',
    render(h: Function) {
      return h()
    }
  }

  it('renders title and data', () => {
    const wrapper = shallowMount(PanelPatternGroup, {
      propsData: {
        title: 'title string',
        data: dummyData
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders no data when data is empty', () => {
    const wrapper = shallowMount(PanelPatternGroup, {
      propsData: {
        title: 'no data',
        data: []
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('propagates input events', () => {
    const wrapper = shallowMount(PanelPatternGroup, {
      propsData: {
        title: 'title',
        data: dummyData
      },
      stubs: {
        InputProperty: StubInputProperty
      }
    })

    const input = wrapper.findAll(StubInputProperty).at(1)
    input.vm.$emit('input', 456)
    expect(wrapper.emitted('input')[0][0]).toEqual({
      name: 'bar',
      value: 456
    })
  })
})
