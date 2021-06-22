"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarFamilias = exports.insertarFamilias = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaFamilias = new conexion_1.mongoose.Schema({
    nombre: String,
    padre: String
});
var Familias = conexion_1.mongoose.model('familias', schemaFamilias);
function insertarFamilias(data) {
    var devolver = new Promise((dev, rej) => {
        Familias.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarFamilias = insertarFamilias;
function borrarFamilias() {
    return Familias.deleteMany({}).catch(err => {
        console.log(err);
    });
}
exports.borrarFamilias = borrarFamilias;
