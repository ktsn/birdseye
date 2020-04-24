import Router from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'
import NavSide from '@/components/NavSide.vue'

describe('NavSide', () => {
  const nav = [
    {
      name: 'Foo',
      patterns: [
        {
          name: 'Pattern 1',
        },
        {
          name: 'Pattern 2',
        },
      ],
    },
    {
      name: 'Bar',
      patterns: [
        {
          name: 'Pattern 1',
        },
      ],
    },
  ]

  let localVue: any

  beforeEach(() => {
    const router = new Router({
      routes: [
        {
          name: 'preview',
          path: '/:meta/:pattern?',
          component: {},
          props: true,
        },
      ],
    })
    localVue = createLocalVue().extend({ router })
    localVue.use(Router)
  })

  it('renders declarations', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        nav,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('highlight current component', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        nav,
        meta: 'Foo',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('highlight current pattern', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        nav,
        meta: 'Foo',
        pattern: 'Pattern 1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('avoid including children dom when patterns are empty', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        nav: [
          {
            name: 'Empty',
            patterns: [],
          },
          {
            name: 'Empty Selected',
            patterns: [],
          },
        ],
        meta: 'Empty Selected',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
