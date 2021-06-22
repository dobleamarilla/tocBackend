"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDevoluciones = exports.confirmarEnvioDevo = exports.getParaSincronizarDevo = exports.getDevoluciones = exports.insertarDevolucion = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaDevoluciones = new conexion_1.mongoose.Schema({
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
var Devoluciones = conexion_1.mongoose.model('devoluciones', schemaDevoluciones);
function insertarDevolucion(devo) {
    var aux = new Devoluciones(devo);
    aux.save((err) => {
        console.log(err);
    });
}
exports.insertarDevolucion = insertarDevolucion;
function getDevoluciones() {
    return Devoluciones.find({}).sort({ _id: -1 }).limit(100).lean();
}
exports.getDevoluciones = getDevoluciones;
function getParaSincronizarDevo() {
    return Devoluciones.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.getParaSincronizarDevo = getParaSincronizarDevo;
function confirmarEnvioDevo(data) {
    Devoluciones.updateOne({ _id: data.idTicket }, { enviado: true, enTransito: false });
}
exports.confirmarEnvioDevo = confirmarEnvioDevo;
function cleanDevoluciones() {
    Devoluciones.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Devoluciones pendientes enviados al servidor");
        }
    });
}
exports.cleanDevoluciones = cleanDevoluciones;
