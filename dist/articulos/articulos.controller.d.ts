export declare class ArticulosController {
    getArticulo(params: any): Promise<import("./articulos.interface").ArticulosInterface>;
    setEstadoTarifaEspecial(params: any): {
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    };
}
