<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <i class="icon icon-1"></i>
    <button @click="handleChange">修改修改</button>
    <el-button type="danger" size="small" @click="handleCaptcha">发送验证码</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
// import { namespace } from 'vuex-class'
import { UserModule } from '@/store/module/user'
import { TestModule } from '@/store/module/test'

// const userModule = namespace('user')

export interface IUserInfo {
  name: string
  phone: string
  email: string
  [propName: string]: any
}

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // @userModule.State userInfo!: IUserInfo
  // @namespace('Test').Mutation('SET_COUNT') setCount: any
  // @namespace('user').State userInfo!: IUserInfo
  created() {
    // 动态module，通过import引入后直接使用
    console.log(UserModule.userInfo)
    console.log(window)
  }

  handleChange() {
    TestModule.SET_COUNT(2)
  }
  handleCaptcha() {
    this.$captcha()
  }
}
</script>
