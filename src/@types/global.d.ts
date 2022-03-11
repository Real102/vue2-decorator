/**
 * @author wolfBerry
 * @email 906368017@qq.com
 * @create date 2022-03-10 15:20:47
 * @modify date 2022-03-10 15:20:47
 * @desc 全局引入、类型扩充等类型文件
 */

// declare module 'vue/types/vue' {
//   interface Vue {
//     $captcha: Function
//   }
// }

declare namespace myRouter {
  interface IRouter {
    showSideBar: boolean
  }
}
