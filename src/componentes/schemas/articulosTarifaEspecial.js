"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarArticulosTarifaEspecial = exports.getPreciosTarifaEspecial = exports.getPrecioTarifaEspecial = exports.getNombreArticuloTarifaEspecial = exports.getInfoArticuloTarifaEspecial = exports.buscarArticuloTarifaEspecial = exports.insertarArticulosTarifaEspecial = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaArticulosTarifaEspecial = new conexion_1.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var ArticulosTarifaEspecial = conexion_1.mongoose.model('ArticulosTarifaEspecial', schemaArticulosTarifaEspecial);
function insertarArticulosTarifaEspecial(data) {
    var devolver = new Promise((dev, rej) => {
        ArticulosTarifaEspecial.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarArticulosTarifaEspecial = insertarArticulosTarifaEspecial;
function buscarArticuloTarifaEspecial(busqueda) {
    return ArticulosTarifaEspecial.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }] }, null, { lean: true, limit: 20 });
}
exports.buscarArticuloTarifaEspecial = buscarArticuloTarifaEspecial;
function getInfoArticuloTarifaEspecial(idArticulo) {
    var devolver = new Promise((dev, rej) => {
        ArticulosTarifaEspecial.findById(idArticulo).lean().then((infoArticulo) => {
            if (infoArticulo) {
                dev(infoArticulo);
            }
            else {
                rej(false);
            }
        });
    });
    return devolver;
}
exports.getInfoArticuloTarifaEspecial = getInfoArticuloTarifaEspecial;
function getNombreArticuloTarifaEspecial(id) {
    var devolver = new Promise((dev, rej) => {
        ArticulosTarifaEspecial.findById(id).lean().then(info => {
            dev(info.nombre);
        });
    });
    return devolver;
}
exports.getNombreArticuloTarifaEspecial = getNombreArticuloTarifaEspecial;
function getPrecioTarifaEspecial(id) {
    return ArticulosTarifaEspecial.findById(id).lean();
}
exports.getPrecioTarifaEspecial = getPrecioTarifaEspecial;
function getPreciosTarifaEspecial() {
    return ArticulosTarifaEspecial.find({}, { _id: 0, nombre: 1, precioConIva: 1 }).lean();
}
exports.getPreciosTarifaEspecial = getPreciosTarifaEspecial;
function borrarArticulosTarifaEspecial() {
    return ArticulosTarifaEspecial.deleteMany({});
}
exports.borrarArticulosTarifaEspecial = borrarArticulosTarifaEspecial;
