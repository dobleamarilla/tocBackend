import {mongoose} from '../bbdd/conexion';

interface _Cajas extends mongoose.Document {
    _id: string, //siempre es 'CAJA'
    inicioTime: number,
    finalTime: number,
    idDependienta: number,
    totalApertura: number,
    totalCierre: number,
    descuadre: number,
    recaudado: number,
    nClientes: number,
    ultimoTicket: number,
    calaixFetZ: number,
    infoExtra: {
        cambioInicial: number,
        cambioFinal: number,
        totalSalidas: number,
        totalEntradas: number,
        totalEnEfectivo: number,
        totalTarjeta: number,
        totalDeuda: number
    },
    primerTicket: number,
    detalleApertura: {
        _id: string,
        valor: number,
        unidades: number
    }[],
    detalleCierre: {
        _id: string,
        valor: number,
        unidades: number
    }[],
    enviado: boolean,
    enTransito: boolean,
    totalDatafono3G: number,
    totalClearOne: number
}

var schemaCajas = new mongoose.Schema({
    _id: String, //siempre es 'CAJA'
    inicioTime: Number,
    finalTime: Number,
    idDependienta: Number,
    totalApertura: Number,
    totalCierre: Number,
    descuadre: Number,
    recaudado: Number,
    nClientes: Number,
    ultimoTicket: Number,
    calaixFetZ: Number,
    infoExtra: {
        cambioInicial: Number,
        cambioFinal: Number,
        totalSalidas: Number,
        totalEntradas: Number,
        totalEnEfectivo: Number,
        totalTarjeta: Number,
        totalDeuda: Number
    },
    primerTicket: Number,
    detalleApertura: [{
        _id: String,
        valor: Number,
        unidades: Number
    }],
    detalleCierre: [{
        _id: String,
        valor: Number,
        unidades: Number
    }],
    enviado: Boolean,
    enTransito: Boolean,
    totalDatafono3G: Number,
    totalClearOne: Number
});

var Cajas = mongoose.model<_Cajas>('cajas', schemaCajas);

export function getInfoCaja()
{
    return Cajas.findById("CAJA", function (err, kes) {
        if(err)
        {
            console.log(err, kes);
        }
    }).lean();

}
export function setInfoCaja(data)
{
    return Cajas.replaceOne({ _id: "CAJA" }, data, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}