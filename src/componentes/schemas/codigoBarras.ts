import {mongoose} from '../bbdd/conexion';

interface _CodigoBarras extends mongoose.Document {
    _id: string,
    ultimo: number
}

var schemaCodigoBarras = new mongoose.Schema({
    _id: String,
    ultimo: Number
});
var CodigoBarras = mongoose.model<_CodigoBarras>('codigo-barras', schemaCodigoBarras);

export function actualizarUltimoCodigoBarras(codBarras)
{
    return CodigoBarras.updateOne({ _id: "CUENTA" }, {ultimo: codBarras}, {upsert: true});
}

export function getUltimoCodigoBarras()
{
    return CodigoBarras.findById("CUENTA", null, {lean: true});
}

export function resetContador()
{
    return CodigoBarras.updateOne({ _id: "CUENTA" }, {ultimo: 0}, {upsert: true}, ((err, queHeHecho)=>{
        //console.log(err, queHeHecho)
    }));
}