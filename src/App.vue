<template>
<div id="app">
    <router-view/>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobile'
export default {
  name: 'App',
  mixins: [isMobile],
  mounted () {
    if (this.isMobile()) {
      document.documentElement.style.setProperty('--bg-color-black', 'rgba(0, 0, 0, 0)')
    } else {
      document.documentElement.style.setProperty('--bg-color-black', '#2c2635')
    }
  }
}
</script>
<style lang="less">

</style>
