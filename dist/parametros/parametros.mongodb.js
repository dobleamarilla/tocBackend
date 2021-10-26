"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUltimoTicket = exports.setParametros = exports.getParametros = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getParametros() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.findOne({ _id: "PARAMETROS" });
    return resultado;
}
exports.getParametros = getParametros;
async function setParametros(params) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.updateOne({ _id: "PARAMETROS" }, { $set: {
            "codigoTienda": params.codigoTienda,
            "database": params.database,
            "licencia": params.licencia,
            "nombreEmpresa": params.nombreEmpresa,
            "nombreTienda": params.nombreTienda,
            "tipoDatafono": params.tipoDatafono,
            "tipoImpresora": params.tipoImpresora,
            "impresoraCafeteria": params.impresoraCafeteria,
            "botonesConPrecios": params.botonesConPrecios,
            "prohibirBuscarArticulos": params.prohibirBuscarArticulos,
            "ultimoTicket": params.ultimoTicket,
            "idCurrentTrabajador": params.idCurrentTrabajador,
            "token": params.token
        } }, { upsert: true });
    return resultado;
}
exports.setParametros = setParametros;
async function setUltimoTicket(idTicket) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.updateOne({ _id: "PARAMETROS" }, { $set: { "ultimoTicket": idTicket } }, { upsert: true });
    return resultado;
}
exports.setUltimoTicket = setUltimoTicket;
//# sourceMappingURL=parametros.mongodb.js.map