const pkg = require('./package.json')
const { rollup } = require('rollup')
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

const base = {
  input: 'src/index.ts',
  output: {
    banner,
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

async function build(type) {
  const start = Date.now()

  const bundle = await rollup(base)

  const file = `dist/core.${type}.js`
  await bundle.write(
    Object.assign({}, base.output, {
      file,
      format: type
    })
  )

  const end = Date.now()

  console.log(`\u001b[32mcreated ${file} in ${(end - start) / 1000}s\u001b[0m`)
}

build('cjs')
  .then(() => build('es'))
  .catch(err => {
    console.error(String(err))
    process.exit(1)
  })
