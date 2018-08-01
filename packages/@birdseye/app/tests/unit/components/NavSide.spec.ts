import Router from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'
import NavSide from '@/components/NavSide.vue'

describe('NavSide', () => {
  const declarations = [
    {
      name: 'Foo',
      patterns: [
        {
          name: 'Pattern 1'
        },
        {
          name: 'Pattern 2'
        }
      ]
    },
    {
      name: 'Bar',
      patterns: [
        {
          name: 'Pattern 1'
        }
      ]
    }
  ]

  let localVue: any

  beforeEach(() => {
    const router = new Router({
      routes: [
        {
          name: 'preview',
          path: '/:component/:pattern?',
          component: {},
          props: true
        }
      ]
    })
    localVue = createLocalVue().extend({ router })
    localVue.use(Router)
  })

  it('renders declarations', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        declarations
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('highlight current component', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        declarations,
        component: 'Foo'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('highlight current pattern', () => {
    const wrapper = mount(NavSide, {
      localVue,
      propsData: {
        declarations,
        component: 'Foo',
        pattern: 'Pattern 1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
