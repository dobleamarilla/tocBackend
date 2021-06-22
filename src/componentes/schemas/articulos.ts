import {mongoose} from '../bbdd/conexion';

interface _Articulos extends mongoose.Document {
    _id: number,
    tipoIva: number,
    precioConIva: number,
    precioBase: number,
    nombre: string,
    familia: string,    
    esSumable: boolean    
}
var schemaArticulos = new mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var Articulos = mongoose.model<_Articulos>('articulos', schemaArticulos);

export function insertarArticulos(data)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
    // var devolver = new Promise((dev, rej)=>{
    //     Articulos.updateMany({}, data, {upsert: true}).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
}
export function buscarArticulo(busqueda: string) {
    return Articulos.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}]}, null, {lean: true, limit: 20});
}
export function getInfoArticulo(idArticulo: number)
{
    var devolver: Promise<Articulo> = new Promise((dev, rej)=>{
        Articulos.findById(idArticulo).lean().then((infoArticulo)=>{
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
export function getNombreArticulo(id)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

export function getPrecio(id)
{
    return Articulos.findById(id).lean();
}
export function getPrecios() {
    return Articulos.find({}, {_id: 0, nombre: 1, precioConIva: 1}).lean();
}
export function borrarArticulos()
{
    return Articulos.deleteMany({});
}