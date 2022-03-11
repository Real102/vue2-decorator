import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

// 雪碧图样式文件
import './styles/sprite/sprite.less'
// 全局图形验证码弹框
import captcha from '@/plugins/captcha'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(captcha)

// 全局插件、组件等都需要在这里注册后才能使用
declare module 'vue/types/vue' {
  interface Vue {
    $captcha: Function
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
