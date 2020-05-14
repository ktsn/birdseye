# Birdseye

**This project is under work in progress. Some features may not be implemented or have bugs. APIs would be changed near the future**

Next generation component catalog.

## Concept

- No need to write source code for each component guide.
- Essentially both build tool and view library agnostic.
- Use Web Components instead of iframe to encapsulate styles for better dev experience.

## Getting Started

Birdseye currently supports the following view libraries. Please refer the guide for a lib that you are using.

- Vue.js

### Vue.js with Vue CLI v3

Install `@birdseye/app` and `@birdseye/vue` in your Vue CLI project:

```bash
$ npm i -D @birdseye/app @birdseye/vue
```

#### Writing catalog by code

Create catalog file:

```js
// birdseye/catalogs/MyButton.catalog.js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton')
  .add('primary', {
    props: {
      primary: true
    },
    slots: {
      default: 'Button Text'
    }
  })
  .add('hovered state', {
    data: {
      hover: true
    },
    slots: {
      default: 'Hovered'
    }
  })
```

Make `birdseye/preview.js` and bootstrap component catalog:

```js
// birdseye/preview.js
import birdseye from '@birdseye/app'

// Load all your catalogs
const load = ctx => ctx.keys().map(x => ctx(x).default)
const catalogs = load(require.context('./catalogs/', true, /\.catalog\.js$/))

// Mount component catalog
birdseye('#app', catalogs)
```

Serve the component catalog by running vue-cli-service:

```bash
$ npm run serve -- birdseye/preview.js
```

#### Tweaking preview container style

When you want to modify preview container style (such as padding, background-color etc.), specify `containerStyle` option in your catalog:

```js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton').add('white button', {
  props: {
    white: true
  },
  slots: {
    default: 'Button Text'
  },

  // Make background color black
  containerStyle: {
    backgroundColor: 'black'
  }
})
```

The above example makes the preview background color black. You can specify any CSS properties in `containerStyle` option.

#### Injecting slots and scoped slots

You can inject slots and scoped slots by using `slots` option of `add` function. Pass a template string for a slot:

```js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton')
  .add('primary', {
    props: {
      primary: true
    },
    slots: {
      // Directly pass template string for the slot
      default: '<span>Button Text</span>'
    }
  })
```

Pass a function for a scoped slot. The first argument is injected scoped slot props. You can get `$createElement` helper via `this` context:

```js
import { catalogFor } from '@birdseye/vue'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, 'MyButton')
  .add('primary', {
    props: {
      primary: true
    },
    slots: {
      // Pass scoped slot function
      default(props) {
        const h = this.$createElement
        return h('span', ['Button Text ', props.message])
      }
    }
  })
```

#### Wrapping catalog component with another element

You can use `mapRender` option to modify rendered element structure. `mapRender` should be a function that receives [`createElement` function](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments) and original VNode object as arguments respectively.

The following example maps the catalog component with `VApp` component of [Vuetify](https://vuetifyjs.com).

```js
import { catalogFor } from '@birdseye/vue'
import { VApp } from 'vuetify/lib'
import MyButton from '@/components/MyButton.vue'

export default catalogFor(MyButton, {
  name: 'MyButton',

  // Define map function to render
  mapRender: (h, vnode) => {
    return h(VApp, [vnode])
  }
}).add('white button', {
  props: {
    white: true
  },
  slots: {
    default: 'Button Text'
  }
})
```

#### Writing catalog in SFC

Update the webpack config in `vue.config.js`:

```js
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      // Process <birdseye> custom block with @birdseye/vue/webpack-loader
      // prettier-ignore
      config.module
        .rule('birdseye-vue')
          .resourceQuery(/blockType=birdseye/)
          .use('birdseye-vue-loader')
            .loader('@birdseye/vue/webpack-loader')
    }
  }
}
```

You write rendering patterns of a component in `<birdseye>` custom block. In each `patterns` item, you can specify `props` and `data` value which will be passed to the component. For example, in the following code, component guide will have two patterns for this component (named `Test Component`). The first pattern (`Pattern Name 1`) shows the component having `"First pattern"` as `foo` value and `123` as `bar` value.

```vue
<template>
  <div>
    <p>This is Vue.js component</p>
    <p>foo value: {{ foo }}</p>
    <p>bar value: {{ bar }}</p>
  </div>
</template>

<script>
export default {
  props: {
    foo: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      bar: 0
    }
  }
}
</script>

<birdseye>
{
  "name": "Test Component",
  "patterns": [
    {
      "name": "Pattern Name 1",
      "props": {
        "foo": "First pattern"
      },
      "data": {
        "bar": 123
      }
    },
    {
      "name": "Pattern Name 2",
      "props": {
        "foo": "Second pattern"
      },
      "data": {
        "bar": 456
      }
    }
  ]
}
</birdseye>
```

Finally, make `birdseye/preview.js` and bootstrap component catalog:

```js
import birdseye from '@birdseye/app'
import { instrument } from '@birdseye/vue'

// Load all your component
const load = ctx => ctx.keys().map(x => ctx(x).default)
const components = load(require.context('../src/components', true, /\.vue$/))

// Mount component catalog
birdseye('#app', instrument(components))
```

You can serve the component catalog by running vue-cli-service:

```bash
$ npm run serve -- birdseye/preview.js
```

## Visual Regression Testing

If you want to visual regression test your component catalog, use `@birdseye/snapshot` package. See [docs](packages/@birdseye/snapshot/README.md) of `@birdseye/snapshot`

## License

MIT
