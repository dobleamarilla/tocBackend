"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInfoCaja = exports.getInfoCaja = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaCajas = new conexion_1.mongoose.Schema({
    _id: String,
    inicioTime: Number,
    finalTime: Number,
    idDependienta: Number,
    totalApertura: Number,
    totalCierre: Number,
    descuadre: Number,
    recaudado: Number,
    nClientes: Number,
    ultimoTicket: Number,
    calaixFetZ: Number,
    infoExtra: {
        cambioInicial: Number,
        cambioFinal: Number,
        totalSalidas: Number,
        totalEntradas: Number,
        totalEnEfectivo: Number,
        totalTarjeta: Number,
        totalDeuda: Number
    },
    primerTicket: Number,
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
    enviado: Boolean,
    enTransito: Boolean,
    totalDatafono3G: Number,
    totalClearOne: Number
});
var Cajas = conexion_1.mongoose.model('cajas', schemaCajas);
function getInfoCaja() {
    return Cajas.findById("CAJA", function (err, kes) {
        if (err) {
            console.log(err, kes);
        }
    }).lean();
}
exports.getInfoCaja = getInfoCaja;
function setInfoCaja(data) {
    return Cajas.replaceOne({ _id: "CAJA" }, data, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.setInfoCaja = setInfoCaja;
