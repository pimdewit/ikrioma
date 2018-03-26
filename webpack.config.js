'use strict';

/**
 * @author Jonathan Thaw <https://jthaw.me>
 */

const webpack = require('webpack');
const path = require('path');
const root = path.join(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports ={
  devtool: 'eval-source-map',
  mode: 'development',
  entry: path.join(root, 'src/scripts', 'app.js'),
  output: {
    path: path.join(root, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(root, 'dist'),
    compress: true,
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(jpg|gif|svg|png)$/,
        loader: 'file-loader',
        options: {
          name: 'static/images/[hash].[ext]'
        }
      },
    ]
  }
};
