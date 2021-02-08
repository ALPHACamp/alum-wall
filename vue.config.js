const path = require('path')

module.exports = {
  devServer: {
    https: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('icons', path.resolve(__dirname, 'src/assets/icons'))
      .set('images', path.resolve(__dirname, 'src/assets/images'))
      .set('svgs', path.resolve(__dirname, 'src/assets/svgs'))

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
