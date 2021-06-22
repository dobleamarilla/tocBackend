"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanFichajes = exports.testeoGuapo = exports.confirmarEnvioFichajes = exports.getFichajes = exports.nuevoItem = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaSincroFichajes = new conexion_1.mongoose.Schema({
    _id: Number,
    infoFichaje: {
        idTrabajador: Number,
        fecha: {
            year: Number,
            month: Number,
            day: Number,
            hours: Number,
            minutes: Number,
            seconds: Number
        }
    },
    tipo: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var SincroFichajes = conexion_1.mongoose.model('sincro-fichajes', schemaSincroFichajes);
function nuevoItem(data) {
    var aux = new SincroFichajes(data);
    aux.save();
}
exports.nuevoItem = nuevoItem;
function getFichajes() {
    //return SincroFichajes.find({enviado: false, enTransito: false}, null, {lean: true});
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.getFichajes = getFichajes;
function confirmarEnvioFichajes(data) {
    SincroFichajes.updateOne({ _id: data }, { enviado: true, enTransito: false }).catch(err => {
        console.log(err);
    });
}
exports.confirmarEnvioFichajes = confirmarEnvioFichajes;
function testeoGuapo() {
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.testeoGuapo = testeoGuapo;
function cleanFichajes() {
    SincroFichajes.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("SincroFichajes pendientes enviados al servidor");
        }
    });
}
exports.cleanFichajes = cleanFichajes;
