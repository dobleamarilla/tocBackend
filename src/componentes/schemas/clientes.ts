import {mongoose} from '../bbdd/conexion';

interface _Cliente extends mongoose.Document {
    id: string,
    nombre: string,
    tarjetaCliente: string
}

var schemaClientes = new mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = mongoose.model<_Cliente>('clientes', schemaClientes);

export function insertarClientes(data)
{
    var devolver = new Promise((dev, rej)=>{
        Clientes.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

export function buscarCliente(busqueda: string)
{
    return Clientes.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}, {"tarjetaCliente": busqueda}]}, null, {lean: true, limit: 20});
}
export function comprobarClienteIdentico(nombre: string)
{
    return Clientes.find({nombre: nombre}, null, {lean: true, limit: 1});
}
export function comprobarClienteIdenticoTarjeta(nombre: string)
{
    return Clientes.find({nombre: nombre}, null, {lean: true, limit: 1});
}
export function borrarTodo()
{
    return Clientes.deleteMany({});
}
export function cargarNuevosClientes(clientes)
{
    var devolver = new Promise((dev, rej)=>{
        borrarTodo().then(function(){
            insertarClientes(clientes).then(()=>{
                dev(true)
            });
        });
    });
    return devolver;
}
export function crearNuevo(datos)
{
    var nuevo = new Clientes({id: 'CliBotiga_'+datos.tienda+Date.now(), nombre: datos.nombre, tarjetaCliente: datos.idTarjeta});
    nuevo.save();
}