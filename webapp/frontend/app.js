const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const proxy = require('http-proxy-middleware');

const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler));

app.use(proxy('/model-deleter', {
    pathRewrite: { '^/model-deleter': '' },
    target: 'http://model-deleter:8080/',
}));

app.use(proxy('/model-renamer', {
    pathRewrite: { '^/model-renamer': '' },
    target: 'http://model-renamer:8080/',
}));

app.use(proxy('/model-runner', {
    pathRewrite: { '^/model-runner': '' },
    target: 'ws://model-runner:8080/',
    ws: true,
}));

app.use(proxy('/model-saver', {
    pathRewrite: { '^/model-saver': '' },
    target: 'http://model-saver:8080/',
}));

app.use(proxy('/model-loader', {
    pathRewrite: { '^/model-loader': '' },
    target: 'http://model-loader:8080/'
}));

app.listen(8888, () => console.log('Example app listening on port 8888!'));
