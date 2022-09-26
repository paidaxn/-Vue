const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //打包后不要map文件（告诉哪里报错）
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint校验工具
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
				// pathRewrite:{'^/api':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    }
  }
})
