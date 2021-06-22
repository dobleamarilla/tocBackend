"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamsTicket = exports.insertarParametrosTicket = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaParametrosTicket = new conexion_1.mongoose.Schema({
    nombreDato: String,
    valorDato: String
});
var ParametrosTicket = conexion_1.mongoose.model('parametros-ticket', schemaParametrosTicket);
function insertarParametrosTicket(data) {
    var devolver = new Promise((dev, rej) => {
        ParametrosTicket.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarParametrosTicket = insertarParametrosTicket;
function getParamsTicket() {
    return ParametrosTicket.find({}, ((err, resultado) => {
        if (err) {
            console.log(err);
        }
    })).lean();
}
exports.getParamsTicket = getParamsTicket;
