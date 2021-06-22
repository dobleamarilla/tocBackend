import {mongoose} from '../bbdd/conexion';

interface _Cestas extends mongoose.Document {
    _id: number,
    tiposIva: {
        base1: number,
        base2: number,
        base3: number,
        valorIva1: number,
        valorIva2: number,
        valorIva3: number,
        importe1: number,
        importe2: number,
        importe3: number
    },
    lista: {
        _id: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean,
            infoPromo: {
                idPrincipal: number,
                cantidadPrincipal: number,
                idSecundario: number,
                cantidadSecundario: number,
                precioRealPrincipal: number,
                precioRealSecundario: number,
                unidadesOferta: number
            }
        },
        subtotal: number,
        unidades: number
    }[]
}

var schemaCestas = new mongoose.Schema({
    _id: Number,
    tiposIva: {
        base1: Number,
        base2: Number,
        base3: Number,
        valorIva1: Number,
        valorIva2: Number,
        valorIva3: Number,
        importe1: Number,
        importe2: Number,
        importe3: Number
    },
    lista: [{
        _id: Number,
        nombre: String,
        promocion: {
            _id: {
                type: String,
                default: ''
            },
            esPromo: Boolean,
            infoPromo: {
                idPrincipal: Number,
                cantidadPrincipal: Number,
                idSecundario: Number,
                cantidadSecundario: Number,
                precioRealPrincipal: Number,
                precioRealSecundario: Number,
                unidadesOferta: Number
            }
        },
        subtotal: Number,
        unidades: Number
    }]
});
var Cestas = mongoose.model<_Cestas>('cestas', schemaCestas);

export function setCesta(cesta)
{
    if(cesta.lista.length > 0)
    {
        Cestas.replaceOne({ _id: cesta._id }, cesta, {upsert: true}, (err, result)=>{
            if(err) 
            {
                console.log(err);
            }
        });
    }
}
export function getUnaCesta(_id: number = -1)
{
    if(_id !== -1)
    {
        return Cestas.findById(_id, null, {lean: true});
    }
    else
    {
        return Cestas.findOne({}, null, {lean: true});
    }
}
export function getCestaConcreta(idCesta: number)
{
    return Cestas.findById(idCesta, (err, lal)=>{
        if(err)
        {
            console.log(err, lal);
        }
    }).lean();
}
export function borrarCesta(id: number)
{
    return Cestas.deleteMany({_id: id});
}
export function getAllCestas()
{
    return Cestas.find({}, null, {lean: true});
}
export function nuevaCesta(cesta)
{
    var nuevo = new Cestas(cesta);
    nuevo.save();
}
export function contarCestas()
{
    return Cestas.countDocuments({});
}

export function crearCestaVacia()
{
    const cestaVacia = {
        _id: Date.now(),
        tiposIva: {
            base1: 0,
            base2: 0,
            base3: 0,
            valorIva1: 0,
            valorIva2: 0,
            valorIva3: 0,
            importe1: 0,
            importe2: 0,
            importe3: 0
        },
        lista: []
    }
    return cestaVacia;
}