export declare class SocketGateway {
    server: any;
    test(): void;
    consultarPuntos(params: any): void;
    cobrarConClearone(params: any): Promise<void>;
}
export declare const socketInterno: SocketGateway;
