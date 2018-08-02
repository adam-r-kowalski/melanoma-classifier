// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const proxy = require('http-proxy-middleware');
const WebSocket = require('ws');

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

app.use(proxy('/model-predictor', {
    pathRewrite: { '^/model-predictor': '' },
    target: 'http://model-predictor:8080/'
}));

const server = app.listen(
    8888,
    () => console.log('listening on *:8888'));

const io = require('socket.io').listen(server);

io.on('connection', socket => {
    const modelRunner = new WebSocket('ws://model-runner:8080')

    modelRunner.on('open', () => {
	console.log('model runner open');

	socket.on('message', message => {
	    console.log('socket message', message);
	    modelRunner.send(message);
	});
    });

    modelRunner.on('message', message => {
	console.log('model runner message', message);
	socket.emit('message', message);
    });

    socket.on('disconnect', () => {
	console.log('socket disconnected');
	modelRunner.close();
    });

    modelRunner.on('close', () => console.log('model runner closed'));
});

