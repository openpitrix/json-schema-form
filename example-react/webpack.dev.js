const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    contentBase: [path.resolve(__dirname, 'public')],
    compress: false,
    port: 9000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
