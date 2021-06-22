"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTickets = exports.confirmarEnvio = exports.getParaSincronizar = exports.getUltimoTicket = exports.getTicketsCajaActual = exports.getTicketsIntervalo = exports.getTickets = exports.getInfoTicket = exports.insertarTicket = void 0;
const conexion_1 = require("../bbdd/conexion");
var sincroEnCurso = false;
var schemaTickets = new conexion_1.mongoose.Schema({
    _id: Number,
    timestamp: Number,
    total: Number,
    lista: [{
            _id: Number,
            nombre: String,
            promocion: {
                _id: {
                    type: String,
                    default: ''
                },
                esPromo: Boolean,
                infoPromo: {
                    idPrincipal: Number,
                    cantidadPrincipal: Number,
                    idSecundario: Number,
                    cantidadSecundario: Number,
                    precioRealPrincipal: Number,
                    precioRealSecundario: Number,
                    unidadesOferta: Number
                }
            },
            subtotal: Number,
            unidades: Number
        }],
    tipoPago: String,
    idTrabajador: Number,
    tiposIva: {
        base1: Number,
        base2: Number,
        base3: Number,
        valorIva1: Number,
        valorIva2: Number,
        valorIva3: Number,
        importe1: Number,
        importe2: Number,
        importe3: Number
    },
    cliente: {
        type: String,
        default: null,
        required: false
    },
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    infoClienteVip: {
        esVip: Boolean,
        nif: String,
        nombre: String,
        cp: String,
        direccion: String,
        ciudad: String
    }
});
var Tickets = conexion_1.mongoose.model('tickets', schemaTickets);
function insertarTicket(unTicket) {
    var aux = new Tickets(unTicket);
    aux.save((err) => {
        if (err !== null) {
            console.log(err);
        }
    });
}
exports.insertarTicket = insertarTicket;
function getInfoTicket(idTicket) {
    return Tickets.findById(idTicket).lean();
}
exports.getInfoTicket = getInfoTicket;
function getTickets() {
    return Tickets.find({}).sort({ _id: -1 }).limit(100).lean();
}
exports.getTickets = getTickets;
function getTicketsIntervalo(unaCaja) {
    return Tickets.find({ timestamp: { $lte: unaCaja.finalTime, $gte: unaCaja.inicioTime } }, null, { sort: { _id: 1 } }, (err, respuesta) => {
        if (err) {
            console.log(err);
        }
    }).lean();
}
exports.getTicketsIntervalo = getTicketsIntervalo;
function getTicketsCajaActual(fechaInicioCaja) {
    return Tickets.find({ timestamp: { $gte: fechaInicioCaja } }, null, { lean: true }, (err, respuesta) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.getTicketsCajaActual = getTicketsCajaActual;
function getUltimoTicket() {
    return Tickets.find({}, null, { lean: true }).sort({ _id: -1 }).limit(1);
}
exports.getUltimoTicket = getUltimoTicket;
function getParaSincronizar() {
    var devolver = new Promise((dev, rej) => {
        Tickets.find({ enviado: false, enTransito: false }, null, { lean: true, sort: { _id: 1 } }).then(resultado => {
            Tickets.updateMany({ enviado: false, enTransito: false }, { enTransito: true }).then(() => {
                dev(resultado);
            });
        });
    });
    return devolver;
}
exports.getParaSincronizar = getParaSincronizar;
function confirmarEnvio(data) {
    Tickets.updateOne({ _id: data.idTicket }, { enviado: true, enTransito: false }).catch(err => {
        console.log(err);
    });
}
exports.confirmarEnvio = confirmarEnvio;
function cleanTickets() {
    Tickets.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Tickets pendientes enviados al servidor");
        }
    });
}
exports.cleanTickets = cleanTickets;
