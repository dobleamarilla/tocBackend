"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
exports.app = app;
// Middleware
app.use(morgan_1.default('tiny'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join("../../public")));
// Rutas
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port ' + app.get('puerto'));
});
// import express from 'express';
// import { io } from "socket.io-client";
// import cors from "cors";
// const bp = require('body-parser')
// const app = express();
// app.use(cors());
// const http = require('http').Server(app);
// const ioToc = require('socket.io')(http);
// const port = 3000;
// var servidor: string;
// if(process.argv[2] == 'test')
// {
//     servidor = 'http://localhost:8080';
// }
// else
// {
//     servidor =  'http://54.74.52.150:8080';
// }
// const socketSanPedro = io(servidor);
// app.use(express.static('web'));
// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))
// app.get('/', function(req, res) {
//     res.sendFile('./web/index.html', { root: __dirname });
// });
// ioToc.on('connection', function(socket) {
//     console.log('A user connected');
//     socket.on('disconnect', function () {
//        console.log('A user disconnected');
//     });
//     socket.on('test', (data=>{
//         console.log(data);
//     }));
//  });
// http.listen(port, function() {
//    console.log(`Server: http://localhost:${port}`);
// });
// export {express, app, http, ioToc, port, socketSanPedro}
