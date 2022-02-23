<template>
  <div class="sideBar">
    <item
      v-for="item in routerData"
      :key="item.path"
      :routeData="item"
      @handleExpand="handleExpand"
    >
      <template v-if="item.children">
        <subItem v-for="sub in item.children" :key="sub.path" :subRouteData="sub"></subItem>
      </template>
    </item>
  </div>
</template>
<script lang="ts">
import item from './components/item.vue'
import subItem from './components/subItem.vue'
import { routes } from '@/router/index'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IMyRouterConfig } from '@/router'
@Component({
  name: 'SideBar',
  components: {
    item,
    subItem
  }
})
export default class SideBar extends Vue {
  routerData: Array<IMyRouterConfig> = []

  // 监听路由，刷新页面时，如果打开了某子页面，那么自动展开该父列
  @Watch('$route', { immediate: true, deep: true })
  watchRoute() {
    this.$nextTick(() => {
      this.routerData.forEach(item => {
        const res = item.children?.find(sub => sub.path === this.$route.path)
        if (res) {
          item.expanded = true
        }
      })
    })
  }

  mounted() {
    this.routerData = []
    routes.forEach(rt => {
      // 处理路由格式，区分只有一个子页面和多个子页面的情况
      // 统一数据格式，便于遍历
      if (!['/404', '*'].includes(rt.path)) {
        if (!rt.meta?.hideSideBar) {
          const res = rt.children?.filter(i => !i.meta?.hideSideBar)
          if (typeof res === 'object' && res.length > 1) {
            // 这里判断是否有多个子路由，并且子路由都是要显示的
            this.routerData.push({
              path: rt.path,
              meta: rt.meta || {},
              expanded: false,
              children: rt.children
            })
          } else if (rt.children?.filter(i => !i.meta?.hideSideBar).length === 1) {
            const sub = rt.children[0]
            this.routerData.push({
              path: sub.path,
              meta: Object.assign(rt.meta, sub.meta),
              expanded: false
            })
          }
        }
      }
    })
  }

  // 点击展开子项事件
  handleExpand(path: string) {
    this.routerData.forEach(i => {
      if (i.path === path) {
        i.expanded = !i.expanded
      }
    })
  }
}
</script>
<style lang="less" scoped>
.sideBar {
  width: 100%;
  background-color: #1f1f1f;
  padding-top: @topBar-h;
  box-sizing: border-box;
  .activeItemClass,
  .activeSubItemClass {
    display: block;
    width: 100%;
    height: 50px;
    overflow: hidden;
    background-color: rgb(84, 92, 100);
  }
  .activeSubItemClass {
    height: 40px;
  }
}
</style>
