const path = require('path')
module.exports = {
  entry: {
    player: "./src/fe/player/index.ts",
    monitor: "./src/fe/monitor/index.ts"
  },
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        options: {
          transpileOnly: true,
          configFile: "tsconfig.front.json",
        }
      },
    ],
  },
  devtool: 'inline-source-map',
}