import {mongoose} from '../bbdd/conexion';

var schemaSincroFichajes = new mongoose.Schema({
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
var SincroFichajes = mongoose.model('sincro-fichajes', schemaSincroFichajes);

export function nuevoItem(data): void
{
    var aux = new SincroFichajes(data);
    aux.save();
}

export function getFichajes()
{
    //return SincroFichajes.find({enviado: false, enTransito: false}, null, {lean: true});
    return SincroFichajes.findOneAndUpdate({enviado: false, enTransito: false}, {enTransito: true}, {lean: true, sort: {_id: 1}});
}
export function confirmarEnvioFichajes(data)
{
    SincroFichajes.updateOne({_id: data}, {enviado: true, enTransito: false}).catch(err=>{
        console.log(err);
    })
}
export function testeoGuapo()
{
    return SincroFichajes.findOneAndUpdate({enviado: false, enTransito: false}, {enTransito: true}, {lean: true, sort: {_id: 1}});
}

export function cleanFichajes()
{
    SincroFichajes.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("SincroFichajes pendientes enviados al servidor");
        }
    });
}