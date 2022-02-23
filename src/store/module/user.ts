import { Action, Module, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'User'
})
export default class User extends VuexModule {
  userInfo = {
    name: 'wolfBerry',
    phone: '18819490370',
    email: '906368017@qq.com'
  }

  @Action
  logout(payload: any) {
    console.log(payload)
    console.log('logout')
  }
}

export const UserModule = getModule(User)
