<template>
  <div class="test">this is test</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUserInfo } from '@/api/user'

@Component({
  name: 'Test'
})
export default class Test extends Vue {
  mounted() {
    this.initUserInfo()
  }

  initUserInfo() {
    getUserInfo()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
