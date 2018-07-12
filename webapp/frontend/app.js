const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const proxy = require('http-proxy-middleware');

const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

const app = express();

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.use(proxy('/model-deleter', {
    pathRewrite: { '^/model-deleter': '' },
    target: 'http://model-deleter:8080/',
}));

app.use(proxy('/model-renamer', {
    pathRewrite: { '^/model-renamer': '' },
    target: 'http://model-renamer:8080/',
}));

app.use(proxy('/model-saver', {
    pathRewrite: { '^/model-saver': '' },
    target: 'http://model-saver:8080/',
}));

app.use(proxy('/model-loader', {
    pathRewrite: { '^/model-loader': '' },
    target: 'http://model-loader:8080/'
}));

const server = app.listen(
    8888,
    () => console.log('listening on *:8888'));

const io = require('socket.io').listen(server);

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => console.log('a user disconnected'));
});


