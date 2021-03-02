const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
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
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.front.json' })],
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
      {
        loader: 'file-loader',
        test: /\.mp3$/,
        options: {
          outputPath: '../sounds',
        }
      },
    ],
  },
  devtool: 'inline-source-map',
}