const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    chunkFilename: '[name].chunk.js',
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
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.mjs', '.json'],
    alias: {
      'schema-form': path.resolve(__dirname, 'schema-form'),
    },
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, 'public'),
      path.resolve(__dirname, 'build'),
    ],
    compress: false,
    port: 9000,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
