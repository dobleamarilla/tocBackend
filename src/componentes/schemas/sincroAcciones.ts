import {mongoose} from '../bbdd/conexion';

var schemaSincroAcciones = new mongoose.Schema({
    accion: String,
    timestamp: Number
});
var SincroAcciones = mongoose.model('sincro-acciones', schemaSincroAcciones);

export function nuevaAccion(data): void
{
    var aux = new SincroAcciones(data);
    aux.save();
}

export function getAccion()
{
    return SincroAcciones.findOneAndDelete({}, {lean: true});
}