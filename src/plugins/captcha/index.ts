/**
 * @author wolfBerry
 * @email 906368017@qq.com
 * @create date 2022-03-07 10:33:57
 * @modify date 2022-03-08 16:51:02
 * @desc 全局获取手机验证码前的图形验证码弹框插件
 * @use this.$captcha()
 */

/**
 * this.$captcha() 默认返回的是一个Promise
 * 当用于校验通过图形验证码时，会触发关闭事件，并且返回 resolve
 * 如果图形验证码校验失败，则直接返回失败 reject
 */

import CaptchaComp from './index.vue'
type ElementType = HTMLElement | null

class Captcha {
  instance: any
  bodyDom: ElementType
  constructor() {
    this.instance = null
    this.bodyDom = document.getElementsByTagName('body')[0]
  }
  install(Vue: any) {
    Vue.prototype.$captcha = () => {
      this.createVueSubComponent(Vue)
      this.openCaptcha()
    }
  }
  createVueSubComponent(Vue: any) {
    const MsgConstructor = Vue.extend(CaptchaComp)
    // 参数可以是vue选项中的任意一个，并且在子组件可以直接访问
    this.instance = new MsgConstructor({
      propsData: { captcha: this },
      data: function () {
        return {
          options: 'test'
        }
      }
    })

    // 将vue实例挂在在DOM上，并插入到HTML中
    // instance.$el是vue实例的DOM对象
    // instance.vm是vue实例对象
    // 可以指定挂载到某一个元素下
    this.instance.vm = this.instance.$mount()
    this.instance.dom = this.instance.$el
  }
  openCaptcha() {
    if (this.bodyDom) {
      this.bodyDom.appendChild(this.instance.dom)
      // 控制背景不滚动
      this.bodyDom.style.overflow = 'hidden'
    }
  }
  closeCaptcha() {
    return new Promise((resolve, reject) => {
      if (this.bodyDom) {
        this.bodyDom.removeChild(this.instance.dom)
        this.bodyDom.style.overflow = 'auto'
        this.bodyDom = null
        resolve('已移除DOM节点')
      } else {
        reject(new Error('异常错误，请刷新后重试'))
      }
    })
  }
}
export default new Captcha()
