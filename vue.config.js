const path = require('path')

module.exports = {
  publicPath: './',
  outputDir: 'dist', // TODO: 修改为项目名称，便于打包构建
  lintOnSave: 'warning', // 每次保存时检测lint，并输出为warning
  filenameHashing: true, // 文件名哈希值
  productionSourceMap: false, // 生产环境不需要sourcemap可以设置为false
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [require('autoprefixer')]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/_variables.less')]
    }
  },
  transpileDependencies: ['vuex-module-decorators'],
  devServer: {
    host: 'localhost',
    port: 8082, // TODO: 设置端口
    openPage: '#/', // 默认打开首页
    open: true // 自动打开浏览器
  }
}
