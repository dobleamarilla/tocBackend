import { MovimientosInterface } from "./movimientos.interface";
export declare class MovimientosClase {
    getMovimientosIntervalo(inicioTime: number, finalTime: number): Promise<MovimientosInterface[]>;
    nuevaSalida(cantidad: number, concepto: string, tipoExtra: string, noImprimir?: boolean, idTicket?: number): Promise<void>;
    nuevaEntrada(): Promise<boolean>;
    generarCodigoBarrasSalida(): Promise<string>;
}
export declare const movimientosInstance: MovimientosClase;
