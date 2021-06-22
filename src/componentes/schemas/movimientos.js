"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanMovimientos = exports.confirmarMovimiento = exports.getParaSincronizarMovimientos = exports.getMovimientosRango = exports.insertarMovimiento = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaMovimientos = new conexion_1.mongoose.Schema({
    _id: Number,
    tipo: String,
    valor: Number,
    concepto: String,
    idTrabajador: Number,
    codigoBarras: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    tipoExtra: String,
    idTicket: Number
});
var Movimientos = conexion_1.mongoose.model('movimientos', schemaMovimientos);
function insertarMovimiento(data) {
    var nuevo = new Movimientos(data);
    nuevo.save();
}
exports.insertarMovimiento = insertarMovimiento;
function getMovimientosRango(fechaInicio, fechaFinal) {
    return Movimientos.find({ _id: { $lte: fechaFinal, $gte: fechaInicio } }).lean();
}
exports.getMovimientosRango = getMovimientosRango;
function getParaSincronizarMovimientos() {
    return Movimientos.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.getParaSincronizarMovimientos = getParaSincronizarMovimientos;
function confirmarMovimiento(id) {
    Movimientos.updateOne({ _id: id }, { enviado: true, enTransito: false }).catch(err => { console.log(err); });
}
exports.confirmarMovimiento = confirmarMovimiento;
function cleanMovimientos() {
    Movimientos.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Movimientos pendientes enviados al servidor");
        }
    });
}
exports.cleanMovimientos = cleanMovimientos;
