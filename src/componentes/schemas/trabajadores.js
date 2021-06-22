"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarFichados = exports.desficharTrabajador = exports.ficharTrabajador = exports.getTrabajadorPorId = exports.buscarTrabajador = exports.insertarTrabajadores = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaTrabajadores = new conexion_1.mongoose.Schema({
    _id: Number,
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String,
    fichado: {
        type: Boolean,
        default: false
    }
});
var Trabajadores = conexion_1.mongoose.model('trabajadores', schemaTrabajadores);
function insertarTrabajadores(data) {
    return Trabajadores.insertMany(data, { ordered: false }, function (error, docs) {
        if (error) {
            console.log(error);
        }
    });
}
exports.insertarTrabajadores = insertarTrabajadores;
function buscarTrabajador(busqueda) {
    return Trabajadores.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, "i") } }, { "nombreCorto": { '$regex': new RegExp(busqueda, "i") } }] }, null, { lean: true, limit: 20 });
}
exports.buscarTrabajador = buscarTrabajador;
function getTrabajadorPorId(id) {
    return Trabajadores.findById(id).lean();
}
exports.getTrabajadorPorId = getTrabajadorPorId;
function ficharTrabajador(idTrabajador) {
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.ficharTrabajador = ficharTrabajador;
function desficharTrabajador(idTrabajador) {
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: false }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.desficharTrabajador = desficharTrabajador;
function buscarFichados() {
    return Trabajadores.find({ fichado: true }).lean();
}
exports.buscarFichados = buscarFichados;
