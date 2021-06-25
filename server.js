"use strict";
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import path from 'path';
// import {createServer} from "http";
// import {Server, Socket} from "socket.io";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketSanPedro = exports.port = exports.ioToc = exports.http = exports.app = exports.express = void 0;
// const puertoApp = 3000;
// const puertoSocket = 3001;
// const httpServer = createServer();
// const ioToc = new Server(httpServer);
// ioToc.on("connection", (socket: Socket)=>{
//   console.log("Conexión entrante de algún cliente");
// })
// const app = express();
// // Middleware
// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));
// // Rutas
// // app.get('/', (req, res) => {
// //   res.send('Hello World!');
// // });
// // Middleware para Vue.js router modo history
// const history = require('connect-history-api-fallback');
// app.use(history());
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('puerto', puertoApp);
// app.listen(app.get('puerto'), () => {
//   console.log('Example app listening on port '+ app.get('puerto'));
// });
// httpServer.listen(puertoSocket);
// export {app}
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const io = require("socket.io-client");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const bp = require('body-parser');
const app = express_1.default();
exports.app = app;
const http = require('http').Server(app);
exports.http = http;
const ioToc = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080" //poner 8080, era un cambio temporal
    }
});
exports.ioToc = ioToc;
const port = 80;
exports.port = port;
const history = require('connect-history-api-fallback');
app.use(cors_1.default());
app.use(history());
var servidor;
// if(process.argv[2] == 'test')
// {
//     servidor = 'http://localhost:8080';
// }
// else
// {
//     servidor =  'http://54.74.52.150:8080';
// }
servidor = 'http://localhost:8080';
var socketSanPedro = io(servidor);
exports.socketSanPedro = socketSanPedro;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.post("/lolaso", (req, res) => {
    console.log("Hey: ", req.body);
});
ioToc.on('connection', function (socket) {
    socket.on('test', (data) => {
        console.log(data);
    });
});
http.listen(port, function () {
    console.log(`Server: http://localhost:${port}`);
});
console.log(socketSanPedro);
