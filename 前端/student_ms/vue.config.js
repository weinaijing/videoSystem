const { defineConfig } = require('@vue/cli-service')
const path = require("path")


module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint 检查
  transpileDependencies: true,
  devServer: {
    port: 8888,
    proxy: {  // 进行代理转换
      '/api': {
        target: "http://localhost:9999", // 跨域的请求路径
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {  // 重写地址
          '/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // svg 图标加载
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons/svg'))
      .end();

    config.module
      .rule('icons') // 定义一个icons的规则
      .test('/\.svg$/')  // 设置icons的匹配
      // 设置当前规则作用目录,只有在当前目录下才执行
      .include.add(path.join(__dirname, 'src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')  // 制定svg-sprite 的 loader 配置
      .loader('svg-sprite-loader')
      .options({
        SymbolId: 'icon-[name]'
      }).end()
  }
})
