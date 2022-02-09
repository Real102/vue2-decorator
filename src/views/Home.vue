<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    {{ userInfo }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { State, namespace } from 'vuex-class'

const userModule = namespace('user')

interface IUserInfo {
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
  @userModule.State userInfo!: IUserInfo
  // @namespace('user').State userInfo!: IUserInfo
  @State foo!: IUserInfo
  created() {
    console.log(this.userInfo)
    // console.log(this.foo)
  }
}
</script>
