import {mongoose} from '../bbdd/conexion';

export interface _Promociones extends mongoose.Document {
    _id: string,
    cantidadPrincipal: number,
    cantidadSecundario: number,
    fechaFinal: string,
    fechaInicio: string,
    precioFinal: number,
    principal: {
        _id: number
    }[],
    secundario: {
        _id: number
    }[]
}

var schemaPromociones = new mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: [{
        _id: Number
    }],
    cantidadPrincipal: Number,
    secundario: [{
        _id: Number
    }],
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = mongoose.model<_Promociones>('promociones', schemaPromociones);

export function insertarPromociones(data)
{
    var devolver = new Promise((dev, rej)=>{
        Promociones.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

export function getPromociones()
{
    return Promociones.find().lean();
}

export function borrarPromociones()
{
    return Promociones.deleteMany({}).catch(err=>{
        console.log(err);
    });
}