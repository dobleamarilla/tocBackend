"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanCajas = exports.confirmarEnvioCaja = exports.getCaja = exports.nuevoItemSincroCajas = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaSincro = new conexion_1.mongoose.Schema({
    _id: Number,
    inicioTime: Number,
    finalTime: Number,
    idDependienta: Number,
    totalApertura: Number,
    totalCierre: Number,
    descuadre: Number,
    recaudado: Number,
    nClientes: Number,
    primerTicket: Number,
    infoExtra: {
        cambioInicial: Number,
        cambioFinal: Number,
        totalSalidas: Number,
        totalEntradas: Number,
        totalEnEfectivo: Number,
        totalTarjeta: Number,
        totalDeuda: Number
    },
    ultimoTicket: Number,
    calaixFetZ: Number,
    detalleApertura: [{
            _id: String,
            valor: Number,
            unidades: Number
        }],
    detalleCierre: [{
            _id: String,
            valor: Number,
            unidades: Number
        }],
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    totalDatafono3G: Number,
    totalClearOne: Number
});
var SincroCajas = conexion_1.mongoose.model('sincro-cajas', schemaSincro);
function nuevoItemSincroCajas(data) {
    data._id = Date.now();
    var aux = new SincroCajas(data);
    aux.save();
}
exports.nuevoItemSincroCajas = nuevoItemSincroCajas;
function getCaja() {
    return SincroCajas.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.getCaja = getCaja;
function confirmarEnvioCaja(data) {
    SincroCajas.updateOne({ _id: data }, { enviado: true, enTransito: false }).catch(err => {
        console.log(err);
    });
}
exports.confirmarEnvioCaja = confirmarEnvioCaja;
function cleanCajas() {
    SincroCajas.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Cajas pendientes enviados al servidor");
        }
    });
}
exports.cleanCajas = cleanCajas;
