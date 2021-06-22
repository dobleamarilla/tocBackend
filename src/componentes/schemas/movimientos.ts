import {mongoose} from '../bbdd/conexion';

interface _Movimientos extends mongoose.Document {
    _id: number,
    tipo: string,
    valor: number,
    concepto: string,
    idTrabajador: number,
    codigoBarras: string,
    enviado: boolean,
    enTransito: boolean,
    tipoExtra: string,
    idTicket: number
}

var schemaMovimientos = new mongoose.Schema({
    _id: Number,
    tipo: String,
    valor: Number,
    concepto: String,
    idTrabajador: Number,
    codigoBarras: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    tipoExtra: String,
    idTicket: Number
});
var Movimientos = mongoose.model<_Movimientos>('movimientos', schemaMovimientos);

export function insertarMovimiento(data)
{
    var nuevo = new Movimientos(data);
    nuevo.save();
}
export function getMovimientosRango(fechaInicio: number, fechaFinal: number)
{
    return Movimientos.find({_id: {$lte: fechaFinal, $gte: fechaInicio}}).lean();
}
export function getParaSincronizarMovimientos()
{
    return Movimientos.findOneAndUpdate({enviado: false, enTransito: false}, {enTransito: true}, {lean: true, sort: {_id: 1}});
}
export function confirmarMovimiento(id)
{
    Movimientos.updateOne({_id: id}, {enviado: true, enTransito: false}).catch(err=>{console.log(err)});
}
export function cleanMovimientos()
{
    Movimientos.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("Movimientos pendientes enviados al servidor");
        }
    });
}