const io = require('socket.io-client');
const socket = io('http://localhost:3001'); // Entorno pruebas
// const socket = io('http://54.74.52.150:3001'); // Entorno producción

socket.on('sincroTickets', (data) => {
    console.log('llego xdxd');
});

socket.emit('resSincronizarTickets');

export { socket };