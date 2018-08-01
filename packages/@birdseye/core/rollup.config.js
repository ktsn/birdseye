const pkg = require('./package.json')
const vue = require('rollup-plugin-vue').default
const css = require('rollup-plugin-css-only')
const ts = require('rollup-plugin-typescript2')

const banner = `/*!
* ${pkg.name} v${pkg.version}
* ${pkg.homepage}
*
* @license
* Copyright (c) 2018 ${pkg.author}
* Released under the MIT license
*/`

function capitalize(name) {
  const camelized = name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
  return camelized[0].toUpperCase() + camelized.slice(1)
}

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/core.es.js',
    banner,
    format: 'es',
    exports: 'named',
    moduleName: capitalize(pkg.name),
    global: {
      vue: 'Vue'
    }
  },

  external: ['vue'],
  plugins: [
    vue({
      css: false
    }),

    ts({
      tsconfig: './tsconfig.main.json',
      clean: true,
      typescript: require('typescript')
    }),

    css({
      output: 'dist/core.css'
    })
  ]
}
