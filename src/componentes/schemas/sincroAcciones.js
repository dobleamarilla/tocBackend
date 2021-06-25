"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccion = exports.nuevaAccion = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaSincroAcciones = new conexion_1.mongoose.Schema({
    accion: String,
    timestamp: Number
});
var SincroAcciones = conexion_1.mongoose.model('sincro-acciones', schemaSincroAcciones);
function nuevaAccion(data) {
    var aux = new SincroAcciones(data);
    aux.save();
}
exports.nuevaAccion = nuevaAccion;
function getAccion() {
    return SincroAcciones.findOneAndDelete({}, { lean: true });
}
exports.getAccion = getAccion;
