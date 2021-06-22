"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonedas = exports.setMonedas = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaMonedas = new conexion_1.mongoose.Schema({
    _id: String,
    infoDinero: [{
            valor: Number,
            style: String
        }]
});
var Monedas = conexion_1.mongoose.model('monedas', schemaMonedas);
function setMonedas(data) {
    var auxInsert = null;
    if (data != null) {
        auxInsert = {
            _id: "INFO_MONEDAS",
            infoDinero: data
        };
    }
    return Monedas.replaceOne({ _id: "INFO_MONEDAS" }, auxInsert, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.setMonedas = setMonedas;
function getMonedas() {
    return Monedas.findById("INFO_MONEDAS", 'infoDinero -_id', { lean: true });
}
exports.getMonedas = getMonedas;
