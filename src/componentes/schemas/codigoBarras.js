"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetContador = exports.getUltimoCodigoBarras = exports.actualizarUltimoCodigoBarras = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaCodigoBarras = new conexion_1.mongoose.Schema({
    _id: String,
    ultimo: Number
});
var CodigoBarras = conexion_1.mongoose.model('codigo-barras', schemaCodigoBarras);
function actualizarUltimoCodigoBarras(codBarras) {
    return CodigoBarras.updateOne({ _id: "CUENTA" }, { ultimo: codBarras }, { upsert: true });
}
exports.actualizarUltimoCodigoBarras = actualizarUltimoCodigoBarras;
function getUltimoCodigoBarras() {
    return CodigoBarras.findById("CUENTA", null, { lean: true });
}
exports.getUltimoCodigoBarras = getUltimoCodigoBarras;
function resetContador() {
    return CodigoBarras.updateOne({ _id: "CUENTA" }, { ultimo: 0 }, { upsert: true }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
exports.resetContador = resetContador;
