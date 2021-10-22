"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const trabajadores_clase_1 = require("./trabajadores/trabajadores.clase");
const cestas_clase_1 = require("./cestas/cestas.clase");
const tickets_clase_1 = require("./tickets/tickets.clase");
const movimientos_clase_1 = require("./movimientos/movimientos.clase");
const parametros_clase_1 = require("./parametros/parametros.clase");
const net = require('net');
let SocketGateway = class SocketGateway {
    async cobrarConClearone(params) {
        let total = params.total;
        let idCesta = params.idCesta;
        const infoTrabajador = await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador();
        const nuevoIdTicket = (await tickets_clase_1.ticketsInstance.getUltimoTicket()) + 1;
        const cesta = await cestas_clase_1.cestas.getCesta(idCesta);
        console.log("La cesta es", cesta, idCesta);
        if (cesta == null || cesta.lista.length == 0) {
            console.log("Error, la cesta es null o está vacía");
            this.server.emit('resDatafono', {
                error: true,
                mensaje: 'Error, la cesta es null o está vacía',
            });
        }
        const info = {
            _id: nuevoIdTicket,
            timestamp: Date.now(),
            total: total,
            lista: cesta.lista,
            tipoPago: "TARJETA",
            idTrabajador: infoTrabajador._id,
            tiposIva: cesta.tiposIva,
            cliente: null,
            infoClienteVip: {
                esVip: false,
                nif: '',
                nombre: '',
                cp: '',
                direccion: '',
                ciudad: ''
            }
        };
        const client = new net.Socket();
        const aux = this;
        client.connect(8890, '127.0.0.1', function () {
            var ventaCliente = 547;
            var nombreDependienta = '';
            var numeroTicket = info._id;
            var tienda = 73;
            var tpv = 1;
            var tipoOperacion = 1;
            var importe = info.total;
            var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
            console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
            client.write(venta_t);
        });
        client.on('error', function (err) {
            console.log(err);
            aux.server.emit('resDatafono', {
                error: true,
                mensaje: 'Error, mirar log en backend'
            });
        });
        client.on('data', async function (data) {
            var objEnviar = {
                data: data,
                objTicket: info,
                idCesta: idCesta
            };
            console.log('Recibido: ' + data);
            let respuestaTexto = "";
            for (let i = 0; i < objEnviar.data.length; i++) {
                respuestaTexto += String.fromCharCode(objEnviar.data[i]);
            }
            if (respuestaTexto.includes("DENEGADA") == false && respuestaTexto.includes("denegada") == false && respuestaTexto.includes("ERROR") == false && respuestaTexto.includes("error") == false && objEnviar.data[0] == 2 && objEnviar.data[1] == 48 && objEnviar.data[2] == 59) {
                movimientos_clase_1.movimientosInstance.nuevaSalida(objEnviar.objTicket.total, 'Targeta', 'TARJETA', true, objEnviar.objTicket._id);
                if (await tickets_clase_1.ticketsInstance.insertarTicket(objEnviar.objTicket)) {
                    if (await cestas_clase_1.cestas.borrarCesta(objEnviar.idCesta)) {
                        if (await parametros_clase_1.parametrosInstance.setUltimoTicket(objEnviar.objTicket._id)) {
                            aux.server.emit('resDatafono', {
                                error: false,
                            });
                        }
                        else {
                            console.log("Error no se ha podido cambiar el último id ticket");
                        }
                    }
                    else {
                        console.log("Error, no se ha podido borrar la cesta");
                    }
                }
                else {
                    console.log("Error, no se ha podido insertar el ticket");
                }
            }
            else {
                console.log("Data clearOne: ", objEnviar.data);
            }
            client.write('\x02ACK\x03');
            client.destroy();
        });
        client.on('close', function () {
            console.log('Conexión cerrada');
            client.destroy();
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('enviarAlDatafono'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "cobrarConClearone", null);
SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            credentials: true,
            transports: ['websocket', 'polling'],
        },
        allowEIO3: true
    })
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=sockets.gateway.js.map