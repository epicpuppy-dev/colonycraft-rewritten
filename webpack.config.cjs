const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      title: 'Factortree'
    })
  ]
};

module.exports = config;