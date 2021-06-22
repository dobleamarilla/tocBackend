import {mongoose} from '../bbdd/conexion';
interface _Trabajadores extends mongoose.Document {
    _id: number,
    idTrabajador: number,
    nombre: string,
    nombreCorto: string,
    fichado: boolean
}
var schemaTrabajadores = new mongoose.Schema({
    _id: Number,
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String,
    fichado: {
        type: Boolean,
        default: false
    }
});
var Trabajadores = mongoose.model<_Trabajadores>('trabajadores', schemaTrabajadores);

export function insertarTrabajadores(data) 
{
    return Trabajadores.insertMany(data, {ordered: false}, function (error, docs) 
    {
        if(error)
        {
            console.log(error);
        }
    });
}
export function buscarTrabajador(busqueda: string) 
{
    return Trabajadores.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, "i") } }, { "nombreCorto": { '$regex': new RegExp(busqueda, "i") } }] }, null, {lean: true, limit: 20});
}

export function getTrabajadorPorId(id)
{
    return Trabajadores.findById(id).lean();
}

export function ficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: true }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
export function desficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: false }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
export function buscarFichados()
{
    return Trabajadores.find({fichado: true}).lean();
}