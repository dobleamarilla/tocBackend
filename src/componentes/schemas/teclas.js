"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarTeclas = exports.getTecladoMain = exports.insertarTeclasMain = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaTeclas = new conexion_1.mongoose.Schema({
    nomMenu: String,
    idArticle: Number,
    nombreArticulo: String,
    pos: Number,
    color: Number,
    esSumable: Boolean
});
var Teclas = conexion_1.mongoose.model('teclas', schemaTeclas);
function insertarTeclasMain(data) {
    return Teclas.insertMany(data);
}
exports.insertarTeclasMain = insertarTeclasMain;
function getTecladoMain(nombreMenu) {
    return Teclas.find({ nomMenu: nombreMenu }).lean();
}
exports.getTecladoMain = getTecladoMain;
function borrarTeclas() {
    return Teclas.deleteMany({}).catch(err => {
        console.log(err);
    });
}
exports.borrarTeclas = borrarTeclas;
