<template>
  <div id="app">
    <div class="menuBox" ref="menuRef">
      <el-menu
      class="menu"
      :default-active="activePath"
      mode="horizontal"
      background-color="#29292e"
      text-color="#ffffff"
      active-text-color="#d097ff"
      router
    >
      <el-menu-item disable>
        <img src="@/assets/logo.png" class="headImg" alt="logo" />
        hello-enen
      </el-menu-item>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item :index="isMobile()?'/gptMobile':'/gpt'">ChatGpt</el-menu-item>
        <el-menu-item index="/owner">个人博客</el-menu-item>
      </el-menu>
    </div>
    <router-view class="routerView" :style="{'padding-top': navBlock, 'height': myClientHeight}" ref="routerRef"></router-view>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobile'
import { clientHeightNow as myClientHeight } from '@/mixins/clientHeightNow'
export default {
  mixins: [isMobile, myClientHeight],
  data () {
    return {
      navBlock: '' // 导航栏高度，让router-view页面不会与导航栏重叠
    }
  },
  computed: {
    activePath () {
      return this.$route.path
    }
  },
  watch: {
    activePath: {
      handler (newVal) {
        if (newVal === '/gptMobile') {
          this.navBlock = '0px'
        } else {
          this.navBlock = this.$refs.menuRef.offsetHeight + 'px'
        }
      }
    }
  },
  mounted () {
    this.activeIndex = this.$route.path
    if (this.activeIndex === '/gptMobile') {
      this.navBlock = '0px'
    } else {
      this.navBlock = this.$refs.menuRef.offsetHeight + 'px'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#app {
  border-radius: 4px;
  .routerView{
    position: relative;
    overflow: auto;
    background: fixed no-repeat center/12% url('@/assets/background.png'),linear-gradient(to bottom right, rgba(30, 29, 67), rgba(43, 29, 99,0.6));
  }
  .is-active {
    border-bottom-color: #d097ff;
  }
  .headImg {
    height: 50%;
  }
  .el-menu{
    border-radius: 4px 4px 0 0;
  }
  .menuBox {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1;
    opacity: 0.9;
  }
}
@media (max-width: 768px){
  #app{
    .routerView{
      position: fixed;
      overflow: auto;
      margin: 0;
      left: 0;
      top: 0;
      width: 100%;
      background: fixed no-repeat center/28% url('@/assets/background.png'),linear-gradient(to bottom right, rgba(30, 29, 67), rgba(43, 29, 99,0.6));
    }
  }
}

</style>
