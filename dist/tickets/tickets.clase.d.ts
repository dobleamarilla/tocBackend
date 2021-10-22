import { TicketsInterface } from "./tickets.interface";
export declare class TicketsClase {
    getTicketByID(idTicket: number): Promise<TicketsInterface>;
    getTicketsIntervalo(fechaInicio: number, fechaFinal: number): Promise<TicketsInterface[]>;
    getUltimoTicket(): Promise<number>;
    insertarTicket(ticket: TicketsInterface): Promise<boolean>;
    crearTicketEfectivo(total: number, idCesta: number): Promise<boolean>;
    crearTicketDatafono3G(total: number, idCesta: number): Promise<boolean>;
}
export declare const ticketsInstance: TicketsClase;
