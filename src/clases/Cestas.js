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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cestas = void 0;
const schCestas = __importStar(require("../componentes/schemas/cestas"));
const funciones_1 = require("../funciones/funciones");
const Articulos_1 = require("../clases/Articulos");
const Ofertas_1 = require("../clases/Ofertas");
const Caja_1 = require("../clases/Caja");
/* Siempre cargar la cesta desde MongoDB */
class CestaClase {
    constructor() {
        /* CARGA DESDE MONGO UNA CESTA EN MEMORIA DE NODE */
        schCestas.getUnaCesta().then((respuesta) => {
            if (respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
                for (let i = 0; i < respuesta.lista.length; i++) {
                    respuesta.lista[i].subtotal = Number(respuesta.lista[i].subtotal.toFixed(2));
                }
                this.cesta = respuesta;
            }
            else {
                this.cesta = funciones_1.crearCestaVacia();
            }
        });
        this.udsAplicar = 1;
    }
    getCesta(idCesta) {
        return schCestas.getCestaConcreta(idCesta);
    }
    getCurrentId() {
        return this.cesta._id;
    }
    reiniciarCesta(idCestaBorrar) {
        return __awaiter(this, void 0, void 0, function* () {
            this.borrarCesta(idCestaBorrar);
            const res = yield schCestas.getAllCestas();
            if (res.length > 0) {
                this.setCesta(res[0]);
            }
            else {
                this.setCesta(this.nuevaCestaVacia());
            }
            return this.getCurrentCesta();
        });
    }
    nuevaCestaVacia() {
        const nuevaCesta = {
            _id: Date.now(),
            tiposIva: {
                base1: 0,
                base2: 0,
                base3: 0,
                valorIva1: 0,
                valorIva2: 0,
                valorIva3: 0,
                importe1: 0,
                importe2: 0,
                importe3: 0
            },
            lista: []
        };
        return nuevaCesta;
    }
    borrarCesta(idCestaBorrar) {
        schCestas.borrarCesta(idCestaBorrar);
    }
    /* Obtiene la cesta, borra el  item y devuelve la cesta final */
    borrarItemCesta(idCesta, idArticulo) {
        const cestaFinal = this.getCesta(idCesta).then((cesta) => {
            for (let i = 0; i < cesta.lista.length; i++) {
                if (cesta.lista[i]._id == idArticulo) {
                    cesta.lista.splice(i, 1);
                    break;
                }
            }
            this.setCesta(cesta);
            return cesta;
        }).catch((err) => {
            console.log(err);
        });
        return cestaFinal;
    }
    cambiarCurrentCesta(data) {
        for (let i = 0; i < data.lista.length; i++) {
            data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
        }
        this.cesta = data;
    }
    /* Guarda la cesta en Mongo */
    setCesta(data) {
        for (let i = 0; i < data.lista.length; i++) {
            data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
        }
        schCestas.setCesta(data);
        this.cesta = data;
    }
    getCurrentCesta() {
        return this.cesta;
    }
    limpiarCesta(unaCesta, posicionPrincipal, posicionSecundario, sobraCantidadPrincipal, sobraCantidadSecundario, pideDelA, pideDelB) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pideDelA != -1) {
                if (sobraCantidadPrincipal > 0) {
                    const datosArticulo = yield Articulos_1.articulos.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
                    unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                    unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal * datosArticulo.precioConIva;
                }
                else {
                    unaCesta.lista.splice(posicionPrincipal, 1);
                }
            }
            if (pideDelB != -1) {
                if (sobraCantidadSecundario > 0) {
                    const datosArticulo = yield Articulos_1.articulos.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
                    unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
                    unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario * datosArticulo.precioConIva;
                }
                else {
                    if (posicionSecundario > posicionPrincipal) {
                        unaCesta.lista.splice(posicionSecundario - 1, 1);
                    }
                    else {
                        unaCesta.lista.splice(posicionSecundario, 1);
                    }
                }
            }
            return unaCesta;
        });
    }
    insertarArticuloCesta(infoArticulo, unidades, infoAPeso = null) {
        return __awaiter(this, void 0, void 0, function* () {
            var miCesta = this.getCurrentCesta();
            if (miCesta.lista.length > 0) {
                let encontrado = false;
                for (let i = 0; i < miCesta.lista.length; i++) {
                    if (miCesta.lista[i]._id === infoArticulo._id) {
                        var viejoIva = miCesta.tiposIva;
                        if (infoAPeso == null) {
                            miCesta.lista[i].unidades += unidades;
                            miCesta.lista[i].subtotal += unidades * infoArticulo.precioConIva;
                            miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, viejoIva);
                        }
                        else {
                            miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
                            miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, viejoIva, infoAPeso);
                        }
                        encontrado = true;
                        break;
                    }
                }
                if (!encontrado) {
                    if (infoAPeso == null) {
                        miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                        miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
                    }
                    else {
                        miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                        miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                    }
                }
            }
            else {
                if (infoAPeso == null) {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                    miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
                }
                else {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                    miCesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                }
            }
            return yield Ofertas_1.ofertas.buscarOfertas(miCesta, viejoIva);
        });
    }
    addItem(idArticulo, idBoton, aPeso, infoAPeso) {
        return __awaiter(this, void 0, void 0, function* () {
            var unidades = this.udsAplicar;
            var cestaRetornar = null;
            if (Caja_1.caja.cajaAbierta()) {
                try {
                    if (!aPeso) //TIPO NORMAL
                     {
                        let infoArticulo = yield Articulos_1.articulos.getInfoArticulo(idArticulo);
                        if (infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
                         {
                            cestaRetornar = yield this.insertarArticuloCesta(infoArticulo, unidades);
                        }
                        else {
                            // vueToast.abrir('error', 'Este artículo tiene errores');
                        }
                    }
                    else //TIPO PESO
                     {
                        cestaRetornar = yield this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, infoAPeso);
                    }
                }
                catch (err) {
                    console.log(err);
                    // vueToast.abrir('error', 'Error al añadir el articulo');
                    this.udsAplicar = 1;
                }
            }
            else {
                // vueToast.abrir('danger', 'Se requiere una caja abierta para cobrar');
            }
            this.udsAplicar = 1;
            return cestaRetornar;
        });
    }
    setUnidadesAplicar(unidades) {
        this.udsAplicar = unidades;
    }
    recalcularIvas(cesta) {
        return __awaiter(this, void 0, void 0, function* () {
            cesta.tiposIva = {
                base1: 0,
                base2: 0,
                base3: 0,
                valorIva1: 0,
                valorIva2: 0,
                valorIva3: 0,
                importe1: 0,
                importe2: 0,
                importe3: 0
            };
            for (let i = 0; i < cesta.lista.length; i++) {
                if (cesta.lista[i].promocion.esPromo === false) {
                    let infoArticulo = yield Articulos_1.articulos.getInfoArticulo(cesta.lista[i]._id);
                    cesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
                }
                else {
                    if (cesta.lista[i].promocion.esPromo === true) {
                        if (cesta.lista[i].nombre == 'Oferta combo') {
                            let infoArticuloPrincipal = yield Articulos_1.articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                            infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                            cesta.tiposIva = funciones_1.construirObjetoIvas(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                            let infoArticuloSecundario = yield Articulos_1.articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
                            infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario);
                            cesta.tiposIva = funciones_1.construirObjetoIvas(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
                        }
                        else {
                            if (cesta.lista[i].nombre == 'Oferta individual') {
                                let infoArticulo = yield Articulos_1.articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                                infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                                cesta.tiposIva = funciones_1.construirObjetoIvas(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                            }
                        }
                    }
                }
            }
            return cesta;
        });
    }
}
const cestas = new CestaClase();
exports.cestas = cestas;
