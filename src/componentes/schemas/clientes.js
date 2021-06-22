"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearNuevo = exports.cargarNuevosClientes = exports.borrarTodo = exports.comprobarClienteIdenticoTarjeta = exports.comprobarClienteIdentico = exports.buscarCliente = exports.insertarClientes = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaClientes = new conexion_1.mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = conexion_1.mongoose.model('clientes', schemaClientes);
function insertarClientes(data) {
    var devolver = new Promise((dev, rej) => {
        Clientes.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarClientes = insertarClientes;
function buscarCliente(busqueda) {
    return Clientes.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }, { "tarjetaCliente": busqueda }] }, null, { lean: true, limit: 20 });
}
exports.buscarCliente = buscarCliente;
function comprobarClienteIdentico(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
exports.comprobarClienteIdentico = comprobarClienteIdentico;
function comprobarClienteIdenticoTarjeta(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
exports.comprobarClienteIdenticoTarjeta = comprobarClienteIdenticoTarjeta;
function borrarTodo() {
    return Clientes.deleteMany({});
}
exports.borrarTodo = borrarTodo;
function cargarNuevosClientes(clientes) {
    var devolver = new Promise((dev, rej) => {
        borrarTodo().then(function () {
            insertarClientes(clientes).then(() => {
                dev(true);
            });
        });
    });
    return devolver;
}
exports.cargarNuevosClientes = cargarNuevosClientes;
function crearNuevo(datos) {
    var nuevo = new Clientes({ id: 'CliBotiga_' + datos.tienda + Date.now(), nombre: datos.nombre, tarjetaCliente: datos.idTarjeta });
    nuevo.save();
}
exports.crearNuevo = crearNuevo;
