import { parametrosInstance } from "../parametros/parametros.clase";
import { MovimientosInterface } from "./movimientos.interface";
import * as schMovimientos from "./movimientos.mongodb";
import { impresoraInstance } from "../impresora/impresora.class";
import moment from 'moment';
import { trabajadoresInstance } from "../trabajadores/trabajadores.clase";
const Ean13Utils  = require('ean13-lib').Ean13Utils;
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';

function getNumeroTresDigitos(x: number) {
    let devolver = '';
    if(x< 100 && x >=10) {
        devolver = '0' + x;
    } else {
        if(x < 10 && x >= 0) {
            devolver = '00' + x;
        } else {
            devolver = x.toString();
        }
    }
    return devolver;
}

export class MovimientosClase {
    getMovimientosIntervalo(inicioTime: number, finalTime: number): Promise<MovimientosInterface[]> {
        return schMovimientos.getMovimientosIntervalo(inicioTime, finalTime);
    }
    // ELIMINAR ESTOS ASYNC, SOLO ERA TEMPORAL
    async nuevaSalida(
        cantidad: number,
        concepto: string,
        tipoExtra: string,
        noImprimir: boolean = false,
        idTicket: number = -100
    ) {
        const parametros = parametrosInstance.getParametros();
        let codigoBarras = "";
        try {
            if (tipoExtra != 'TARJETA' && tipoExtra != 'TKRS') {
                codigoBarras = await this.generarCodigoBarrasSalida();
                codigoBarras = String(Ean13Utils.generate(codigoBarras));
            } 
        } catch(err) {
            console.log(err);
        }
        //codigoBarras = this.fixLength12(codigoBarras);

        
        const objSalida: MovimientosInterface = {
            _id: Date.now(),
            tipo: TIPO_SALIDA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: (await trabajadoresInstance.getCurrentTrabajador())._id, // this.getCurrentTrabajador()._id,
            codigoBarras: codigoBarras,
            tipoExtra: tipoExtra,
            idTicket: idTicket
        }
        const resNuevaSalida = await schMovimientos.nuevaSalida(objSalida);

        if (!resNuevaSalida.acknowledged) throw 'Error en nuevaSalida';

        if(!noImprimir) {
            impresoraInstance.imprimirSalida(
                objSalida.valor,
                objSalida._id,
                (await trabajadoresInstance.getCurrentTrabajador()).nombre,
                parametros.nombreTienda,
                objSalida.concepto,
                parametros.tipoImpresora,
                codigoBarras
            );
        }
    }

    async nuevaEntrada() {
        return true;
    }

    async generarCodigoBarrasSalida() {
        const parametros = parametrosInstance.getParametros();
        let objCodigoBarras = (await schMovimientos.getUltimoCodigoBarras()).ultimo;
        if(objCodigoBarras == 999) {
            const resResetContador = await schMovimientos.resetContadorCodigoBarras();
            if (!resResetContador.acknowledged) {
                throw 'Error en resetContadorCodigoBarras';
            }
        } else {
            const resActualizarContador = await schMovimientos.actualizarCodigoBarras();
            if (!resActualizarContador.acknowledged) {
                throw 'Error en actualizarCodigoBarras';
            }
        }

        objCodigoBarras = (await schMovimientos.getUltimoCodigoBarras()).ultimo;

        let codigoLicenciaStr: string = getNumeroTresDigitos(parametros.licencia);
        let strNumeroCodigosDeBarras: string = getNumeroTresDigitos(objCodigoBarras);
        let codigoFinal: string =  '';
        let digitYear = new Date().getFullYear().toString()[3];


        codigoFinal = `98${codigoLicenciaStr}${digitYear}${getNumeroTresDigitos(moment().dayOfYear())}${strNumeroCodigosDeBarras}`;
        return codigoFinal;
    }
}

export const movimientosInstance = new MovimientosClase();
