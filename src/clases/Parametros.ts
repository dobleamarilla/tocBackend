import * as schParametros from "../componentes/schemas/parametros";

const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';

 class ParametrosClase {
    private parametros: Parametros;

    constructor(){
        schParametros.getParams().then((infoParams)=>{
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
    
                }
            }
        });
    }
    
    getParametros(){
        return this.parametros;
    }
    setParametros(params: Parametros){
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

    checkParametrosOK(params: Parametros){
        if (params.licencia > 0 && params.codigoTienda > 0 && params.database.length > 0 && params.nombreEmpresa.length > 0 && params.nombreTienda.length > 0 && params.tipoImpresora.length > 0 && params.tipoDatafono.length > 0) {
            return true;
        }
    }
}

const parametros = new ParametrosClase();

export {parametros}