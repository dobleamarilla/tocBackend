export declare class ClientesController {
    buscarCliente(params: any): Promise<any[] | import("./clientes.interface").ClientesInterface[]>;
    getClienteByID(params: any): Promise<any[] | import("./clientes.interface").ClientesInterface[]> | Promise<{
        error: boolean;
        infoCliente: import("./clientes.interface").ClientesInterface;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
        infoCliente?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }> | {
        error: boolean;
        mensaje: string;
    };
}
