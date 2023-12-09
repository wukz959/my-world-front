const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 2365,
    proxy: {
      '/myworld': {
        target: 'http://localhost:7777',
        changeOrigin: true
        // pathRewrite: { '^/myworld': '' }
      }
    }
  }
})
