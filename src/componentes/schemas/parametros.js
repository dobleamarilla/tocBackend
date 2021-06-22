"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setParams = exports.getParams = exports.setUltimoTicket = exports.insertParams = void 0;
const conexion_1 = require("../bbdd/conexion");
var params = new conexion_1.mongoose.Schema({
    _id: String,
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String,
    impresoraCafeteria: String,
    tipoDatafono: String,
    ultimoTicket: Number,
    clearOneCliente: Number,
    clearOneTienda: Number,
    clearOneTpv: Number,
    botonesConPrecios: String,
    prohibirBuscarArticulos: String
});
var Parametros = conexion_1.mongoose.model('Parametros', params);
function insertParams(data) {
    return Parametros.replaceOne({ _id: "PARAMETROS" }, data, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.insertParams = insertParams;
function setUltimoTicket(ultimoTicket) {
    Parametros.updateOne({ _id: "PARAMETROS" }, { ultimoTicket: ultimoTicket });
}
exports.setUltimoTicket = setUltimoTicket;
function getParams() {
    return Parametros.findById('PARAMETROS', (err, parametros) => {
        if (err != null) {
            console.log(err);
        }
    }).lean();
}
exports.getParams = getParams;
function setParams(info) {
    return Parametros.updateOne({ _id: "PARAMETROS" }, {
        tipoImpresora: info.impresora,
        impresoraCafeteria: info.impresoraCafeteria,
        tipoDatafono: info.datafono,
        clearOneCliente: info.clearOneCliente,
        clearOneTienda: info.clearOneTienda,
        clearOneTpv: info.clearOneTpv,
        botonesConPrecios: info.botonesConPrecio,
        prohibirBuscarArticulos: info.prohibirBuscarArticulos
    });
}
exports.setParams = setParams;
