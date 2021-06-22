import {mongoose} from '../bbdd/conexion';

interface _Parametros extends mongoose.Document {
    _id: string,
    licencia: number,
    codigoTienda: number,
    database: string,
    nombreEmpresa: string,
    nombreTienda: string,
    tipoImpresora: string,
    impresoraCafeteria: string,
    tipoDatafono: string,
    ultimoTicket: number,
    clearOneCliente: number,
    clearOneTienda: number,
    clearOneTpv: number,
    botonesConPrecios: string,
    prohibirBuscarArticulos: string
}

var params = new mongoose.Schema({
    _id: String,
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String,
    impresoraCafeteria: String,
    tipoDatafono: String,
    ultimoTicket: Number,
    clearOneCliente: Number,
    clearOneTienda: Number,
    clearOneTpv: Number,
    botonesConPrecios: String,
    prohibirBuscarArticulos: String
});
var Parametros = mongoose.model<_Parametros>('Parametros', params);

export function insertParams(data)
{
    return Parametros.replaceOne({ _id: "PARAMETROS" }, data, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}

export function setUltimoTicket(ultimoTicket)
{
    Parametros.updateOne({ _id: "PARAMETROS" }, {ultimoTicket: ultimoTicket});
}

export function getParams()
{
    return Parametros.findById('PARAMETROS', (err, parametros)=>{
        if(err != null)
        {
            console.log(err);
        }
    }).lean();
}

export function setParams(info)
{
    return Parametros.updateOne({_id: "PARAMETROS"}, {
        tipoImpresora: info.impresora, 
        impresoraCafeteria: info.impresoraCafeteria,
        tipoDatafono: info.datafono,
        clearOneCliente: info.clearOneCliente,
        clearOneTienda: info.clearOneTienda,
        clearOneTpv: info.clearOneTpv,
        botonesConPrecios: info.botonesConPrecio,
        prohibirBuscarArticulos: info.prohibirBuscarArticulos
    });
}