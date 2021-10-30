module.exports = {
  devServer: {
    host: '0.0.0.0', // host改成自己的IP,
    open: false, // 配置后自动启动浏览器
    port: 8080, // 端口号
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个代理
      '/api': {
        target: 'http://192.168.1.153:8080/',
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/styles/variables.scss";',
      },
    },
    sourceMap: true,
  },

  publicPath: '/weWin',
  runtimeCompiler: true,
};
