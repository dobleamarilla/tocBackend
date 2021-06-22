import * as schCajas from "../componentes/schemas/cajas";


class CajaClase {
    private caja: Caja;

    constructor(){
        schCajas.getInfoCaja().then(infoCaja=>{
            if(infoCaja === null){
                this.caja  = {
                    _id: "CAJA",
                    inicioTime: null,
                    finalTime: null,
                    idDependienta: null,
                    totalApertura: null,
                    totalCierre: null,
                    calaixFetZ: null,
                    descuadre: null,
                    infoExtra: {
                        cambioInicial: null,
                        cambioFinal: null,
                        totalSalidas: null,
                        totalEntradas: null,
                        totalEnEfectivo: null,
                        totalTarjeta: null,
                        totalDeuda: null
                    },
                    primerTicket: null,
                    ultimoTicket: null,
                    recaudado: null,
                    nClientes: null,
                    detalleApertura: [],
                    detalleCierre: [],
                    enviado: false,
                    enTransito: false,
                    totalDatafono3G: null,
                    totalClearOne: null
                };
            }
            else {
                this.caja = infoCaja;
            }
        });
    }

    cajaAbierta() {
        if(this.caja.inicioTime === null || this.caja.inicioTime === undefined) {
            if(this.caja.finalTime === null || this.caja.finalTime === undefined) {
                return false;
            }
            else {
                throw 'Error de comportamiento de cajas 1';
            }
        }
        else {
            if(this.caja.finalTime === null || this.caja.finalTime === undefined) {
                return true;
            }
            else {
                throw 'Error de comportamiento de cajas 2';
            }
        }
    }
}

const caja = new CajaClase();

export {caja}