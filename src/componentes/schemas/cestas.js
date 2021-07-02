"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearCestaVacia = exports.contarCestas = exports.nuevaCesta = exports.getAllCestas = exports.borrarCesta = exports.getCestaConcreta = exports.getUnaCesta = exports.setCesta = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaCestas = new conexion_1.mongoose.Schema({
    _id: Number,
    tiposIva: {
        base1: Number,
        base2: Number,
        base3: Number,
        valorIva1: Number,
        valorIva2: Number,
        valorIva3: Number,
        importe1: Number,
        importe2: Number,
        importe3: Number
    },
    lista: [{
            _id: Number,
            nombre: String,
            promocion: {
                _id: {
                    type: String,
                    default: ''
                },
                esPromo: Boolean,
                infoPromo: {
                    idPrincipal: Number,
                    cantidadPrincipal: Number,
                    idSecundario: Number,
                    cantidadSecundario: Number,
                    precioRealPrincipal: Number,
                    precioRealSecundario: Number,
                    unidadesOferta: Number
                }
            },
            subtotal: Number,
            unidades: Number
        }]
});
var Cestas = conexion_1.mongoose.model('cestas', schemaCestas);
function setCesta(cesta) {
    if (cesta.lista.length > 0) {
        Cestas.replaceOne({ _id: cesta._id }, cesta, { upsert: true }, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
exports.setCesta = setCesta;
function getUnaCesta(_id = -1) {
    if (_id !== -1) {
        return Cestas.findById(_id, null, { lean: true });
    }
    else {
        return Cestas.findOne({}, null, { lean: true });
    }
}
exports.getUnaCesta = getUnaCesta;
function getCestaConcreta(idCesta) {
    return Cestas.findById(idCesta, (err, lal) => {
        if (err) {
            console.log(err, lal);
        }
    }).lean();
}
exports.getCestaConcreta = getCestaConcreta;
function borrarCesta(id) {
    console.log('Borro realmente: ', id);
    return Cestas.deleteOne({ _id: id }, null, function (res) {
        console.log(res);
    });
}
exports.borrarCesta = borrarCesta;
function getAllCestas() {
    return Cestas.find({}, null, { lean: true });
}
exports.getAllCestas = getAllCestas;
function nuevaCesta(cesta) {
    var nuevo = new Cestas(cesta);
    nuevo.save();
}
exports.nuevaCesta = nuevaCesta;
function contarCestas() {
    return Cestas.countDocuments({});
}
exports.contarCestas = contarCestas;
function crearCestaVacia() {
    const cestaVacia = {
        _id: Date.now(),
        tiposIva: {
            base1: 0,
            base2: 0,
            base3: 0,
            valorIva1: 0,
            valorIva2: 0,
            valorIva3: 0,
            importe1: 0,
            importe2: 0,
            importe3: 0
        },
        lista: []
    };
    return cestaVacia;
}
exports.crearCestaVacia = crearCestaVacia;
