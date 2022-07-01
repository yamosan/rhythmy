const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: {
    player: path.join(__dirname, "src/javascripts/entry/player/index.ts"),
    monitor: path.join(__dirname, "src/javascripts/entry/monitor/index.ts"),
  },
  output: {
    path: path.join(__dirname, "src/builds"),
    filename: "[name].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
});
