module.exports = {
  entry: {
    app: 'play/app.js',
    preview: 'play/preview.js'
  },
  outDir: 'dist-play',
  port: 5000,
  html: [
    {
      chunks: ['app'],
      filename: 'index.html'
    },
    {
      chunks: ['preview'],
      filename: 'preview.html'
    }
  ],

  vue: {
    fullBuild: true
  },

  chainWebpack: config => {
    // prettier-ignore
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/]
        })

    config.optimization.splitChunks(false)
  }
}
