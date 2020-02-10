const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const config = {
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.glsl$/,
        use: ['webpack-glsl-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: __dirname + '/public/index.html',  // relative to root of the application
        hash: true,
        template: 'src/index.html'
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    compress: true,
    port: 9000,
    open: true,
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
    }
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;
