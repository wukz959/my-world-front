const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: process.env.outputDir,
  devServer: {
    open: true, // 自动打开浏览器
    port: process.env.SERVER_PORT,
    allowedHosts: 'all'
    // proxy: {
    //   '/myworld': {
    //     target: process.env.VUE_APP_BASE_URL,
    //     changeOrigin: true
    //     // pathRewrite: { '^/myworld': '' }
    //   }
    // }
  }
})
