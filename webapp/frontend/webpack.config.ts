import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as HtmlWebpackTemplate from 'html-webpack-template';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },

  devtool: 'source-map',

  devServer: {
    contentBase: `${__dirname}/dist`,
    host: '0.0.0.0',
    overlay: {
      errors: true,
      warnings: true,
    },
    port: 8888,
    proxy: {
      '/model-saver': {
        pathRewrite: { '^/model-saver': '' },
        target: 'http://model-saver:8080/',
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      inject: false,
      links: ['https://fonts.googleapis.com/css?family=Roboto:300,400,500'],
      mobile: true,
      template: HtmlWebpackTemplate,
      title: 'Melanoma Classifier',
    }),
  ],
};

export default config;
