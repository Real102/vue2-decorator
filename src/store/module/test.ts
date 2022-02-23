import { Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'Test'
})
export default class Test extends VuexModule {
  count = 0

  @Mutation
  SET_COUNT(num: number): void {
    this.count = num
  }
}

export const TestModule = getModule(Test)
