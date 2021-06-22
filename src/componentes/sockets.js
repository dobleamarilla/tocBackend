"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.io = exports.http = exports.app = exports.express = void 0;
const express = require('express');
exports.express = express;
const app = express();
exports.app = app;
const http = require('http').Server(app);
exports.http = http;
const io = require('socket.io')(http);
exports.io = io;
const port = 3000;
exports.port = port;
app.use(express.static('web'));
app.get('/', function (req, res) {
    res.sendFile('./web/index.html', { root: __dirname });
});
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    socket.on('test', (data => {
        console.log(data);
    }));
});
http.listen(port, function () {
    console.log('listening on *:', port);
});
