import { ParametrosInterface } from "./parametros.interface";
export declare class ParametrosClase {
    private parametros;
    constructor();
    getParametros(): ParametrosInterface;
    setParametros(params: ParametrosInterface): Promise<boolean>;
    todoInstalado(): boolean;
    checkParametrosOK(params: ParametrosInterface): boolean;
    actualizarParametros(): void;
    setUltimoTicket(idTicket: number): Promise<boolean>;
}
declare const parametrosInstance: ParametrosClase;
export { parametrosInstance };
