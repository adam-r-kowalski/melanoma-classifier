const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',

    output: {
	filename: 'bundle.js',
	path: `${__dirname}/dist`,
    },

    devtool: 'source-map',

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
	    meta: [
		{
		    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
		    name: 'viewport',
		},
	    ],
	    mobile: true,
	    template: HtmlWebpackTemplate,
	    title: 'Melanoma Classifier',
	}),
    ],
};
