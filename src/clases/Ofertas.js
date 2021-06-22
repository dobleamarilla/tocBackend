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
exports.ofertas = void 0;
const schArticulos = __importStar(require("../componentes/schemas/articulos"));
const schPromociones = __importStar(require("../componentes/schemas/promociones"));
const Cestas_1 = require("./Cestas");
class OfertasClase {
    constructor() {
        schPromociones.getPromociones().then(res => {
            if (res.length > 0) {
                this.promociones = res;
            }
            else {
                this.promociones = [];
            }
        });
    }
    deshacerOfertas(cesta) {
        return cesta;
    }
    existeArticuloParaOfertaEnCesta(cesta, idArticulo, unidadesNecesarias) {
        for (let i = 0; i < cesta.lista.length; i++) {
            if (cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias) {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }
    teLoAplicoTodo(necesariasPrincipal, necesariasSecundario, cesta, posicionPrincipal, posicionSecundario, pideDelA, pideDelB, precioPromo, idPromo) {
        return __awaiter(this, void 0, void 0, function* () {
            let numeroPrincipal = 0;
            let numeroSecundario = 0;
            let sobranPrincipal = 0;
            let sobranSecundario = 0;
            let nVeces = 0;
            var idPrincipal = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id : 0;
            var idSecundario = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id : 0;
            if (pideDelA !== -1 && pideDelB !== -1) {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
                numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
                nVeces = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
                sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
                cesta = yield Cestas_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = yield this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo * nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
            }
            else {
                if (pideDelA !== -1 && pideDelB === -1) {
                    numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
                    nVeces = Math.trunc(numeroPrincipal);
                    sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
                    cesta = yield Cestas_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = yield this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
                }
                else {
                    if (pideDelA === -1 && pideDelB !== -1) {
                        numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
                        nVeces = Math.trunc(numeroSecundario);
                        sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
                        cesta = yield Cestas_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                        cesta = yield this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
                    }
                }
            }
            return cesta;
        });
    }
    buscarOfertas(unaCesta, viejoIva) {
        return __awaiter(this, void 0, void 0, function* () {
            var hayOferta = false;
            unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
            for (let i = 0; i < this.promociones.length; i++) {
                for (let j = 0; j < this.promociones[i].principal.length; j++) {
                    let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal);
                    if (this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0) {
                        for (let z = 0; z < this.promociones[i].secundario.length; z++) {
                            let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                            if (this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0) {
                                unaCesta = yield this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                                hayOferta = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (hayOferta) {
                unaCesta.tiposIva = viejoIva; //No se suma IVA en la promoción para calcularlo en la siguiente línea.
                unaCesta = yield Cestas_1.cestas.recalcularIvas(unaCesta);
            }
            Cestas_1.cestas.setCesta(unaCesta);
            return unaCesta;
        });
    }
    insertarLineaPromoCestaCombo(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario) {
        return __awaiter(this, void 0, void 0, function* () {
            var dtoAplicado = yield this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);
            if (tipoPromo === 1) //COMBO
             {
                cesta.lista.push({
                    _id: -2,
                    nombre: 'Oferta combo',
                    unidades: unidades,
                    subtotal: total,
                    promocion: {
                        _id: idPromo,
                        esPromo: true,
                        infoPromo: {
                            idPrincipal: idPrincipal,
                            cantidadPrincipal: cantidadPrincipal,
                            idSecundario: idSecundario,
                            cantidadSecundario: cantidadSecundario,
                            precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                            precioRealSecundario: dtoAplicado.precioRealSecundario,
                            unidadesOferta: unidades
                        }
                    }
                });
            }
            return cesta;
        });
    }
    insertarLineaPromoCestaIndividual(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, cantidadPrincipal) {
        return __awaiter(this, void 0, void 0, function* () {
            var dtoAplicado = yield this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);
            if (tipoPromo === 2) //INDIVIDUAL
             {
                cesta.lista.push({
                    _id: -2,
                    nombre: 'Oferta individual',
                    unidades: unidades,
                    subtotal: total,
                    promocion: {
                        _id: idPromo,
                        esPromo: true,
                        infoPromo: {
                            idPrincipal: idPrincipal,
                            cantidadPrincipal: cantidadPrincipal,
                            idSecundario: 0,
                            cantidadSecundario: 0,
                            precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                            precioRealSecundario: 0,
                            unidadesOferta: unidades
                        }
                    }
                });
            }
            return cesta;
        });
    }
    calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidadesOferta, precioTotalOferta) {
        return __awaiter(this, void 0, void 0, function* () {
            let precioSinOfertaPrincipal = 0;
            let precioSinOfertaSecundario = 0;
            let precioTotalSinOferta = 0;
            if (idPrincipal != 0) {
                precioSinOfertaPrincipal = (yield schArticulos.getPrecio(idPrincipal)).precioConIva;
            }
            if (idSecundario != 0) {
                precioSinOfertaSecundario = (yield schArticulos.getPrecio(idSecundario)).precioConIva;
            }
            if (tipoPromo === 1) //COMBO
             {
                precioTotalSinOferta = (precioSinOfertaPrincipal * cantidadPrincipal + precioSinOfertaSecundario * cantidadSecundario) * unidadesOferta;
            }
            var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
            return {
                precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta,
                precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario * dto)) * unidadesOferta
            };
        });
    }
    calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidadesOferta, precioTotalOferta) {
        return __awaiter(this, void 0, void 0, function* () {
            let precioSinOfertaPrincipal = 0;
            let precioTotalSinOferta = 0;
            if (idPrincipal != 0) {
                precioSinOfertaPrincipal = (yield schArticulos.getPrecio(idPrincipal)).precioConIva;
            }
            if (tipoPromo === 2) //INDIVIDUAL
             {
                if (idPrincipal != 0) {
                    precioTotalSinOferta = precioSinOfertaPrincipal * cantidadPrincipal * unidadesOferta;
                }
            }
            var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
            return {
                precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta * cantidadPrincipal
            };
        });
    }
}
const ofertas = new OfertasClase();
exports.ofertas = ofertas;
