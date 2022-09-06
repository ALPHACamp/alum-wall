const path = require('path')

module.exports = {
  publicPath: '/2021/',
  devServer: {
    https: false
  },
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('/2021/icons', path.resolve(__dirname, 'src/assets/icons'))
      .set('/2021/images', path.resolve(__dirname, 'src/assets/images'))
      .set('/2021/svgs', path.resolve(__dirname, 'src/assets/svgs'))

    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({
        addAttributes: { class: 'svg-inline' }
      })

    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()
  }
}
