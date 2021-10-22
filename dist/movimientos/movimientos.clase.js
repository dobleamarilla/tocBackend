"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movimientosInstance = exports.MovimientosClase = void 0;
const parametros_clase_1 = require("../parametros/parametros.clase");
const schMovimientos = require("./movimientos.mongodb");
const impresora_class_1 = require("../impresora/impresora.class");
const moment_1 = require("moment");
const trabajadores_clase_1 = require("../trabajadores/trabajadores.clase");
const Ean13Utils = require('ean13-lib').Ean13Utils;
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';
function getNumeroTresDigitos(x) {
    let devolver = '';
    if (x < 100 && x >= 10) {
        devolver = '0' + x;
    }
    else {
        if (x < 10 && x >= 0) {
            devolver = '00' + x;
        }
        else {
            devolver = x.toString();
        }
    }
    return devolver;
}
class MovimientosClase {
    getMovimientosIntervalo(inicioTime, finalTime) {
        return schMovimientos.getMovimientosIntervalo(inicioTime, finalTime);
    }
    async nuevaSalida(cantidad, concepto, tipoExtra, noImprimir = false, idTicket = -100) {
        const parametros = parametros_clase_1.parametrosInstance.getParametros();
        let codigoBarras = "";
        try {
            if (tipoExtra != 'TARJETA' && tipoExtra != 'TKRS') {
                codigoBarras = await this.generarCodigoBarrasSalida();
                codigoBarras = String(Ean13Utils.generate(codigoBarras));
            }
        }
        catch (err) {
            console.log(err);
        }
        const objSalida = {
            _id: Date.now(),
            tipo: TIPO_SALIDA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: (await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador())._id,
            codigoBarras: codigoBarras,
            tipoExtra: tipoExtra,
            idTicket: idTicket
        };
        const resNuevaSalida = await schMovimientos.nuevaSalida(objSalida);
        if (!resNuevaSalida.acknowledged)
            throw 'Error en nuevaSalida';
        if (!noImprimir) {
            impresora_class_1.impresoraInstance.imprimirSalida(objSalida.valor, objSalida._id, (await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador()).nombre, parametros.nombreTienda, objSalida.concepto, parametros.tipoImpresora, codigoBarras);
        }
    }
    async nuevaEntrada() {
        return true;
    }
    async generarCodigoBarrasSalida() {
        const parametros = parametros_clase_1.parametrosInstance.getParametros();
        let objCodigoBarras = (await schMovimientos.getUltimoCodigoBarras()).ultimo;
        if (objCodigoBarras == 999) {
            const resResetContador = await schMovimientos.resetContadorCodigoBarras();
            if (!resResetContador.acknowledged) {
                throw 'Error en resetContadorCodigoBarras';
            }
        }
        else {
            const resActualizarContador = await schMovimientos.actualizarCodigoBarras();
            if (!resActualizarContador.acknowledged) {
                throw 'Error en actualizarCodigoBarras';
            }
        }
        objCodigoBarras = (await schMovimientos.getUltimoCodigoBarras()).ultimo;
        let codigoLicenciaStr = getNumeroTresDigitos(parametros.licencia);
        let strNumeroCodigosDeBarras = getNumeroTresDigitos(objCodigoBarras);
        let codigoFinal = '';
        let digitYear = new Date().getFullYear().toString()[3];
        codigoFinal = `98${codigoLicenciaStr}${digitYear}${getNumeroTresDigitos((0, moment_1.default)().dayOfYear())}${strNumeroCodigosDeBarras}`;
        return codigoFinal;
    }
}
exports.MovimientosClase = MovimientosClase;
exports.movimientosInstance = new MovimientosClase();
//# sourceMappingURL=movimientos.clase.js.map