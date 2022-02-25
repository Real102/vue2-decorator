const path = require('path')
// 用于pathrewrite，这样可以在setting文件统一设置接口前缀
const prefixReg = '^' + process.env.VUE_APP_PROXY_PREFIX
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
    // 需要删除 "vue-cli-plugin-style-resources-loader" 插件，不然会报错
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
    open: true, // 自动打开浏览器
    proxy: {
      // 在axios全局拦截器增加了/api前缀，因此需要rewrite一下。
      // 但要注意，只有经过axios拦截器的才能重写，没有经过axios拦截器的都需要额外写proxy
      [process.env.VUE_APP_PROXY_PREFIX]: {
        target: process.env.VUE_APP_BASE_URL,
        pathRewrite: {
          [prefixReg]: ''
        }
      }
    }
  }
}
