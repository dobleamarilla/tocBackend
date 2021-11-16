"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const io = require('socket.io-client');
const socket = io('http://localhost:3001');
exports.socket = socket;
socket.on('sincroTickets', (data) => {
    console.log('llego xdxd');
});
socket.emit('resSincronizarTickets');
//# sourceMappingURL=sincro.service.js.map