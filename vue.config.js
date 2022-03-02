const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
// 用于pathrewrite，这样可以在setting文件统一设置接口前缀
const prefixReg = '^' + process.env.VUE_APP_PROXY_PREFIX
const templateFunction = function (data) {
  var shared =
    '.icon { display: inline-block; vertical-align: middle; background-image: url(I) }'.replace(
      'I',
      data.sprites[0].image
    )

  var perSprite = data.sprites
    .map(function (sprite) {
      return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y)
    })
    .join('\n')

  return shared + '\n' + perSprite
}
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
  chainWebpack: config => {
    /* 拼接雪碧图 */
    config.plugin('webpack-spritesmith').use(SpritesmithPlugin, [
      {
        src: {
          cwd: path.resolve(__dirname, 'src/assets/sprite'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/styles/sprite/sprite.png'),
          css: [
            [
              path.resolve(__dirname, 'src/styles/sprite/sprite.less'),
              {
                format: 'function_based_template'
              }
            ]
          ]
        },
        apiOptions: {
          // 在sprite.less文件中引用的图片地址
          cssImageRef: '~@/styles/sprite/sprite.png'
        },
        customTemplates: {
          // sprite样式模板
          function_based_template: templateFunction
        }
      }
    ])
    return config
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
