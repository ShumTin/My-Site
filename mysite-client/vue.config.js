const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: false, // 关闭生产环境 map 文件生成
  transpileDependencies: [],
  lintOnSave: false,
  publicPath: "/", // 绝对路径
  outputDir: "dist",
  devServer: {
    proxy: {
      "/api": { target: "http://127.0.0.1:7001" },
      "/static": { target: "http://127.0.0.1:7001" },
    },
  },
  configureWebpack: require("./webpack.config"),
});
