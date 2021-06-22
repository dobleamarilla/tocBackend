"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarPromociones = exports.getPromociones = exports.insertarPromociones = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaPromociones = new conexion_1.mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: [{
            _id: Number
        }],
    cantidadPrincipal: Number,
    secundario: [{
            _id: Number
        }],
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = conexion_1.mongoose.model('promociones', schemaPromociones);
function insertarPromociones(data) {
    var devolver = new Promise((dev, rej) => {
        Promociones.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarPromociones = insertarPromociones;
function getPromociones() {
    return Promociones.find().lean();
}
exports.getPromociones = getPromociones;
function borrarPromociones() {
    return Promociones.deleteMany({}).catch(err => {
        console.log(err);
    });
}
exports.borrarPromociones = borrarPromociones;
