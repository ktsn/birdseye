import { shallowMount } from '@vue/test-utils'
import PanelPattern from '@/components/PanelPattern.vue'

describe('PanelPattern', () => {
  const StubGroup = {
    name: 'PanelPatternGroup',
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

  it('propagates events from props', () => {
    const wrapper = shallowMount(PanelPattern, {
      propsData: {
        props: [
          {
            type: ['string', 'number'],
            name: 'foo',
            value: 'str'
          }
        ],
        data: []
      },
      stubs: {
        PanelPatternGroup: StubGroup
      }
    })
    const group = wrapper.findAll(StubGroup).at(0)
    group.vm.$emit('input', {
      name: 'foo',
      value: 'test'
    })
    expect(wrapper.emitted('input-prop')[0][0]).toEqual({
      name: 'foo',
      value: 'test'
    })
  })

  it('propagates events from data', () => {
    const wrapper = shallowMount(PanelPattern, {
      propsData: {
        props: [],
        data: [
          {
            type: [],
            name: 'foo',
            value: 'str'
          }
        ]
      },
      stubs: {
        PanelPatternGroup: StubGroup
      }
    })
    const group = wrapper.findAll(StubGroup).at(1)
    group.vm.$emit('input', {
      name: 'foo',
      value: 'test'
    })
    expect(wrapper.emitted('input-data')[0][0]).toEqual({
      name: 'foo',
      value: 'test'
    })
  })
})
