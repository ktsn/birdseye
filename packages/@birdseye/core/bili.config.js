const pkg = require('./package.json')

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
  name: 'core',

  banner,
  format: ['cjs', 'es', 'umd', 'umd-min'],
  exports: 'named',
  moduleName: capitalize(pkg.name),

  global: {
    vue: 'Vue'
  },
  external: ['vue'],

  plugin: ['vue', 'css-only'],

  // Plugin options

  vue: {
    css: false
  },

  typescript2: {
    tsconfig: './tsconfig.main.json',
    clean: true,
    typescript: require('typescript')
  },

  'css-only': {
    output: 'dist/core.css'
  }
}
