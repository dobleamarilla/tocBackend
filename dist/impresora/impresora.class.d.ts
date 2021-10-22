export declare class Impresora {
    imprimirTicket(idTicket: number): Promise<void>;
    private _venta;
    imprimirSalida(cantidad: number, fecha: number, nombreTrabajador: string, nombreTienda: string, concepto: string, tipoImpresora: string, codigoBarras: string): void;
}
export declare const impresoraInstance: Impresora;
