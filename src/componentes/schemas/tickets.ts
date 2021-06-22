import {mongoose} from '../bbdd/conexion';

var sincroEnCurso   = false;

interface _Ticket extends mongoose.Document {
    _id: number,
    timestamp: number,
    total: number,
    lista: {
        _id: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean
        },
        subtotal: number,
        unidades: number
    }[],
    tipoPago: string,
    idTrabajador: number,
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
    enviado?: boolean,
    enTransito?: boolean,
    cliente?: string,
    infoClienteVip?: {
        esVip: boolean,
        nif: string,
        nombre: string,
        cp: string,
        direccion: string,
        ciudad: string
    }
}
var schemaTickets = new mongoose.Schema({
    _id: Number,
    timestamp: Number,
    total: Number,
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
    }],
    tipoPago: String,
    idTrabajador: Number,
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
    cliente: {
        type: String,
        default: null,
        required: false
    },
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    infoClienteVip: { 
        esVip: Boolean,
        nif: String,
        nombre: String,
        cp: String,
        direccion: String,
        ciudad: String
    }
});
var Tickets = mongoose.model<_Ticket>('tickets', schemaTickets);

export function insertarTicket(unTicket)
{
    var aux = new Tickets(unTicket);
    aux.save((err)=>{
        if(err !== null)
        {
            console.log(err);
        }
    });

}
export function getInfoTicket(idTicket: number)
{
    return Tickets.findById(idTicket).lean();
}
export function getTickets()
{
    return Tickets.find({}).sort({_id: -1}).limit(100).lean();
}

export function getTicketsIntervalo(unaCaja: Caja)
{
    return Tickets.find({timestamp: {$lte: unaCaja.finalTime, $gte: unaCaja.inicioTime}}, null, {sort: {_id: 1}}, (err, respuesta) => {
        if(err)
        {
            console.log(err);
        }
    }).lean();
}

export function getTicketsCajaActual(fechaInicioCaja: number)
{
    return Tickets.find({timestamp: {$gte: fechaInicioCaja}}, null, {lean: true}, (err, respuesta) => {
       if(err)
       {
           console.log(err);
       }
    });
}

export function getUltimoTicket()
{
    return Tickets.find({}, null, {lean: true}).sort({_id:-1}).limit(1);
}

export function getParaSincronizar()
{
    var devolver = new Promise((dev, rej)=>{
        Tickets.find({enviado: false, enTransito: false}, null, {lean: true, sort: {_id: 1}}).then(resultado=>{
            Tickets.updateMany({enviado: false, enTransito: false}, {enTransito: true}).then(()=>{
                dev(resultado);
            });
        });
    });
    return devolver;
}

export function confirmarEnvio(data)
{
    Tickets.updateOne({_id: data.idTicket}, {enviado: true, enTransito: false}).catch(err=>{
        console.log(err);
    });
}
export function cleanTickets()
{
    Tickets.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("Tickets pendientes enviados al servidor");
        }
    });
}