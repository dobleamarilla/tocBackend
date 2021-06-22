import {mongoose} from '../bbdd/conexion';

interface _ParametrosTicket extends mongoose.Document{
    nombreDato: string,
    valorDato: string
}
var schemaParametrosTicket = new mongoose.Schema({
    nombreDato: String,
    valorDato: String
});
var ParametrosTicket = mongoose.model<_ParametrosTicket>('parametros-ticket', schemaParametrosTicket);

export function insertarParametrosTicket(data)
{
    var devolver = new Promise((dev, rej)=>{
        ParametrosTicket.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
export function getParamsTicket()
{
    return ParametrosTicket.find({}, ((err, resultado)=>{
        if(err)
        {
            console.log(err);
        }
    })).lean();
}