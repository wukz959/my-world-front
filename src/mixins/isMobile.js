export default {
  created () {},
  methods: {
    // isMobile () {
    //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    // }
    isMobile () {
      // 检查用户代理字符串
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      }
      // 检查iPad的用户代理字符串
      if (/iPad/i.test(navigator.userAgent) && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return true
      }
      // 检查屏幕宽度和触摸功能
      if (window.innerWidth <= 1024 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return true
      }
      return false
    }

  }
}
