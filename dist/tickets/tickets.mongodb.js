"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevoTicket = exports.getUltimoTicket = exports.getTotalTkrs = exports.getDedudaGlovo = exports.getDedudaDeliveroo = exports.getTicketsIntervalo = exports.getTicketByID = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getTicketByID(idTicket) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.findOne({ _id: idTicket });
    return resultado;
}
exports.getTicketByID = getTicketByID;
async function getTicketsIntervalo(inicioTime, finalTime) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await (await tickets.find({ timestamp: { $lte: finalTime, $gte: inicioTime } })).toArray();
    return resultado;
}
exports.getTicketsIntervalo = getTicketsIntervalo;
async function getDedudaDeliveroo(inicioTime, finalTime) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            { cliente: "CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}" },
            { timestamp: { $gte: inicioTime } },
            { timestamp: { $lte: finalTime } }
        ]
    });
    const arrayResult = await resultado.toArray();
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}
exports.getDedudaDeliveroo = getDedudaDeliveroo;
async function getDedudaGlovo(inicioTime, finalTime) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            { cliente: "CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}" },
            { timestamp: { $gte: inicioTime } },
            { timestamp: { $lte: finalTime } }
        ]
    });
    const arrayResult = await resultado.toArray();
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}
exports.getDedudaGlovo = getDedudaGlovo;
async function getTotalTkrs(inicioTime, finalTime) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            { tipoPago: "TICKET_RESTAURANT" },
            { timestamp: { $gte: inicioTime } },
            { timestamp: { $lte: finalTime } }
        ]
    });
    const arrayResult = await resultado.toArray();
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}
exports.getTotalTkrs = getTotalTkrs;
async function getUltimoTicket() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await (await tickets.find({}).sort({ _id: -1 }).limit(1)).toArray();
    if (resultado.length > 0) {
        if (resultado[0]._id != undefined) {
            return resultado[0]._id;
        }
        else {
            return null;
        }
    }
    return null;
}
exports.getUltimoTicket = getUltimoTicket;
async function nuevoTicket(ticket) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = tickets.insertOne(ticket);
    return resultado;
}
exports.nuevoTicket = nuevoTicket;
//# sourceMappingURL=tickets.mongodb.js.map