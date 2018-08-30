import { shallowMount } from '@vue/test-utils'
import PanelPattern from '@/components/PanelPattern.vue'

describe('PanelPattern', () => {
  const StubGroup = {
    props: ['title', 'data'],

    render(this: any, h: Function): any {
      return h('div', [
        h('p', [`title: ${this.title}`]),
        h('p', [`data: ${JSON.stringify(this.data)}`])
      ])
    }
  }

  it('renders for props and data', () => {
    const wrapper = shallowMount(PanelPattern, {
      propsData: {
        props: [
          {
            type: ['string'],
            name: 'foo',
            value: 'string value'
          }
        ],
        data: [
          {
            type: [],
            name: 'bar',
            value: true
          }
        ]
      },
      stubs: {
        PanelPatternGroup: StubGroup
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
