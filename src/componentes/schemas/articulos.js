"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarArticulos = exports.getPrecios = exports.getPrecio = exports.getNombreArticulo = exports.getInfoArticulo = exports.buscarArticulo = exports.insertarArticulos = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaArticulos = new conexion_1.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var Articulos = conexion_1.mongoose.model('articulos', schemaArticulos);
function insertarArticulos(data) {
    var devolver = new Promise((dev, rej) => {
        Articulos.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
    // var devolver = new Promise((dev, rej)=>{
    //     Articulos.updateMany({}, data, {upsert: true}).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
}
exports.insertarArticulos = insertarArticulos;
function buscarArticulo(busqueda) {
    return Articulos.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }] }, null, { lean: true, limit: 20 });
}
exports.buscarArticulo = buscarArticulo;
function getInfoArticulo(idArticulo) {
    var devolver = new Promise((dev, rej) => {
        Articulos.findById(idArticulo).lean().then((infoArticulo) => {
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
exports.getInfoArticulo = getInfoArticulo;
function getNombreArticulo(id) {
    var devolver = new Promise((dev, rej) => {
        Articulos.findById(id).lean().then(info => {
            dev(info.nombre);
        });
    });
    return devolver;
}
exports.getNombreArticulo = getNombreArticulo;
function getPrecio(id) {
    return Articulos.findById(id).lean();
}
exports.getPrecio = getPrecio;
function getPrecios() {
    return Articulos.find({}, { _id: 0, nombre: 1, precioConIva: 1 }).lean();
}
exports.getPrecios = getPrecios;
function borrarArticulos() {
    return Articulos.deleteMany({});
}
exports.borrarArticulos = borrarArticulos;
