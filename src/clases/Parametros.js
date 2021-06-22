"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametros = void 0;
const schParametros = __importStar(require("../componentes/schemas/parametros"));
const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';
class ParametrosClase {
    constructor() {
        schParametros.getParams().then((infoParams) => {
            if (infoParams !== null) {
                this.parametros = infoParams;
            }
            else {
                this.parametros = {
                    _id: '',
                    licencia: 0,
                    codigoTienda: 0,
                    database: '',
                    nombreEmpresa: '',
                    nombreTienda: '',
                    tipoImpresora: TIPO_USB,
                    tipoDatafono: TIPO_CLEARONE,
                    impresoraCafeteria: 'NO',
                    clearOneCliente: 0,
                    clearOneTienda: 0,
                    clearOneTpv: 0,
                    botonesConPrecios: 'No',
                    prohibirBuscarArticulos: 'No',
                    ultimoTicket: -1
                };
            }
        });
    }
    getParametros() {
        return this.parametros;
    }
    setParametros(params) {
        this.parametros.licencia = params.licencia;
        this.parametros.tipoImpresora = params.tipoImpresora;
        this.parametros.tipoDatafono = params.tipoDatafono;
        this.parametros.impresoraCafeteria = params.impresoraCafeteria;
        this.parametros.ultimoTicket = params.ultimoTicket;
    }
    todoInstalado() {
        if (this.parametros.licencia !== 0 && this.parametros.codigoTienda !== 0 && this.parametros.database !== '' && this.parametros.nombreEmpresa !== '' && this.parametros.nombreTienda !== '') {
            return true;
        }
        else {
            return false;
        }
    }
    checkParametrosOK(params) {
        if (params.licencia > 0 && params.codigoTienda > 0 && params.database.length > 0 && params.nombreEmpresa.length > 0 && params.nombreTienda.length > 0 && params.tipoImpresora.length > 0 && params.tipoDatafono.length > 0) {
            return true;
        }
    }
}
const parametros = new ParametrosClase();
exports.parametros = parametros;
