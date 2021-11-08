import { CajaInterface } from "./caja.interface";
export declare function getInfoCaja(): Promise<any>;
export declare function guardarMonedas(arrayMonedas: any, tipo: 'APERTURA' | 'CLAUSURA'): Promise<import("mongodb").UpdateResult>;
export declare function getMonedas(tipo: 'APERTURA' | 'CLAUSURA'): Promise<import("bson").Document>;
export declare function setInfoCaja(data: CajaInterface): Promise<import("bson").Document | import("mongodb").UpdateResult>;
export declare function borrarCaja(): Promise<boolean>;
export declare function nuevoItemSincroCajas(unaCaja: any): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
