process.env.VUE_CLI_CSS_SHADOW_MODE = true

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname
        }
      }
    }
  },

  chainWebpack: config => {
    // prettier-ignore
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })

    if (process.env.NODE_ENV !== 'production') {
      // prettier-ignore
      config.module
        .rule('birdseye-vue')
          .resourceQuery(/blockType=birdseye/)
          .use('birdseye-vue-loader')
            .loader('@birdseye/vue/webpack-loader')
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.entry = ['./tests/dummy/main.js']
    }
  }
}
