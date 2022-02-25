<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'subItem'
})
export default class subItem extends Vue {
  @Prop({ required: true }) subRouteData
  render() {
    const { path, meta } = this.subRouteData
    return (
      <router-link to={path} active-class='activeSubItemClass'>
        <div class='subItem'>
          <span>{meta?.title || '默认子title'}</span>
        </div>
      </router-link>
    )
  }
}
</script>
<style lang="less" scoped>
.subItem {
  color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 54px;
  }
}
</style>
