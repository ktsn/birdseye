module.exports = {
  chainWebpack: config => {
    config.output.filename('app.js')

    if (process.env.NODE_ENV === 'production') {
      // prettier-ignore
      config.optimization
        .splitChunks(false)

      // prettier-ignore
      config
        .plugin("extract-css")
        .tap(() => [{
          filename: "[name].css"
        }]);
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.entry = ['./tests/dummy/main.js']
    }
  }
}
