const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [new BundleAnalyzerPlugin()],
  };
} else {
  module.exports = {};
}
