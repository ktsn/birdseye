import { shallowMount } from '@vue/test-utils'
import PanelPatternGroup from '@/components/PanelPatternGroup.vue'

describe('PanelPatternGroup', () => {
  it('renders title and data', () => {
    const data = [
      {
        type: ['string'],
        name: 'foo',
        value: 'string value'
      },
      {
        type: ['number'],
        name: 'bar',
        value: 123
      }
    ]

    const wrapper = shallowMount(PanelPatternGroup, {
      propsData: {
        title: 'title string',
        data
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
})
