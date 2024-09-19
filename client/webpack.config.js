const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');
const PORT = 3000;

// 환경 변수 설정
let envKeys = {};

if (process.env.VERCEL) {
  envKeys = Object.keys(process.env).reduce((prev, key) => {
    prev[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return prev;
  }, {});
} else {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + process.env.NODE_ENV;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
}

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    allowedHosts: 'all',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
