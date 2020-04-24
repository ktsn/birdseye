const pkg = require('./package.json')

const externals = Object.keys(pkg.dependencies).concat('vue')

process.env.VUE_CLI_CSS_SHADOW_MODE = true

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname,
        },
      },
    },
  },

  configureWebpack: {
    externals: (context, request, callback) => {
      if (
        process.env.NODE_ENV === 'production' &&
        externals.includes(request)
      ) {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    },
  },

  chainWebpack: (config) => {
    // prettier-ignore
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })

    const birdseyeLoader =
      process.env.NODE_ENV !== 'production'
        ? '@birdseye/vue/webpack-loader'
        : './dummy-birdseye-loader.js'

    // prettier-ignore
    config.module
      .rule('birdseye-vue')
        .resourceQuery(/blockType=birdseye/)
        .use('birdseye-vue-loader')
          .loader(birdseyeLoader)
  },
}
