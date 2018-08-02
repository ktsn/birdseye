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

Then, update the webpack config in `vue.config.js`:

```js
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      // Process <birdseye> custom block with @birdseye/vue/webpack-loader
      config.module
        .rule('birdseye-vue')
          .resourceQuery(/blockType=birdseye/)
          .use('birdseye-vue-loader')
            .loader('@birdseye/vue/webpack-loader')
    }
  },
}
```

You write rendering patterns of a component in `<birdseye>` custom block. In each `patterns` item, you can specify `props` and `data` value which will be passed to the component. For example, in the following code, component guide will have two patterns for this component (named `Test Component`). The first pattern (`Pattern Name 1`) shows the component having `"First pattern"` as `foo` value and `123` as `bar` value.

```vue
<template>
  <p>This is Vue.js component</p>
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

Finally, make `preview.js` and bootstrap component catalog:

```js
import birdseye from '@birdseye/app'
import { instrument } from '@birdseye/vue'

// Load all your component
const load = ctx => ctx.keys().map(ctx)
const components = load(require.context('./src/components', true, /\.vue$/))

// Mount component catalog
birdseye('#app', instrument(components))
```

You can serve the component catalog by running vue-cli-service:

```bash
$ npm run serve preview.js
```

## License

MIT