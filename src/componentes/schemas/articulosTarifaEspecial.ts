import {mongoose} from '../bbdd/conexion';

interface _Articulos extends mongoose.Document {
    _id: number,
    nombre: string,
    precioConIva: number,
    precioBase: number,
    tipoIva: number,
    esSumable: boolean,
    familia: string
}
var schemaArticulosTarifaEspecial = new mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var ArticulosTarifaEspecial = mongoose.model<_Articulos>('ArticulosTarifaEspecial', schemaArticulosTarifaEspecial);

export function insertarArticulosTarifaEspecial(data)
{
    var devolver = new Promise((dev, rej)=>{
        ArticulosTarifaEspecial.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
export function buscarArticuloTarifaEspecial(busqueda: string) {
    return ArticulosTarifaEspecial.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}]}, null, {lean: true, limit: 20});
}
export function getInfoArticuloTarifaEspecial(idArticulo: number)
{
    var devolver: Promise<Articulo> = new Promise((dev, rej)=>{
        ArticulosTarifaEspecial.findById(idArticulo).lean().then((infoArticulo)=>{
            if(infoArticulo)
            {
                dev(infoArticulo);
            }
            else
            {
                rej(false);
            }
        });
    });
    return devolver;
}
export function getNombreArticuloTarifaEspecial(id)
{
    var devolver = new Promise((dev, rej)=>{
        ArticulosTarifaEspecial.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

export function getPrecioTarifaEspecial(id)
{
    return ArticulosTarifaEspecial.findById(id).lean();
}
export function getPreciosTarifaEspecial() {
    return ArticulosTarifaEspecial.find({}, {_id: 0, nombre: 1, precioConIva: 1}).lean();
}
export function borrarArticulosTarifaEspecial()
{
    return ArticulosTarifaEspecial.deleteMany({});
}