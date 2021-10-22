import { conexion } from "../conexion/mongodb";
import { TicketsInterface } from "./tickets.interface";

export async function getTicketByID(idTicket: number): Promise <any> {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.findOne({_id: idTicket});
    return resultado;
}

export async function getTicketsIntervalo(inicioTime: number, finalTime: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await (await tickets.find({timestamp: {$lte: finalTime, $gte: inicioTime}})).toArray();
    
    return resultado;
}

export async function getDedudaDeliveroo(inicioTime: number, finalTime: number) {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            {cliente: "CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}"},
            {timestamp: {$gte: inicioTime}},
            {timestamp: {$lte: finalTime}}
        ]
    });
    const arrayResult = await resultado.toArray();
    
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}

export async function getDedudaGlovo(inicioTime: number, finalTime: number) {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            {cliente: "CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}"},
            {timestamp: {$gte: inicioTime}},
            {timestamp: {$lte: finalTime}}
        ]
    });
    const arrayResult = await resultado.toArray();
    
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}

export async function getTotalTkrs(inicioTime: number, finalTime: number) {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await tickets.find({
        $and: [
            {tipoPago: "TICKET_RESTAURANT"},
            {timestamp: {$gte: inicioTime}},
            {timestamp: {$lte: finalTime}}
        ]
    });
    const arrayResult = await resultado.toArray();
    
    let suma = 0;
    for (let i = 0; i < arrayResult.length; i++) {
        suma += arrayResult[i].total;
    }
    return suma;
}

// export async function getUltimoTicket() {
//     const database = (await conexion).db('tocgame');
//     const parametros = database.collection('parametros');
//     const resultado: number = (await parametros.findOne({_id: "PARAMETROS"})).ultimoTicket;
    
//     return resultado;
// }

export async function getUltimoTicket(): Promise<number> {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = await (await tickets.find({}).sort({_id: -1}).limit(1)).toArray();
    if (resultado.length > 0) {
        if (resultado[0]._id != undefined) {
            return resultado[0]._id; // Último ID ticket
        } else {
            return null;
        }
    }
    return null;
}

export async function nuevoTicket(ticket: any) {
    const database = (await conexion).db('tocgame');
    const tickets = database.collection('tickets');
    const resultado = tickets.insertOne(ticket);

    return resultado;
}


// export async function getDedudaDeliveroo(inicioTime: number, finalTime: number) {
//     await 
//     const database = client.db('tocgame');
//     const tickets = database.collection('tickets');
//     const resultado = await tickets.aggregate([{$match: {$and: [
//         {cliente: "CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}"},
//         {timestamp: {$gte: inicioTime}},
//         {timestamp: {$lte: finalTime}}
//     ]}}, {$group: {_id: null, suma: {$sum: "$total"}}}]);
//     

//     return resultado;
// }