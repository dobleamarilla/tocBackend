import * as schArticulos from "../componentes/schemas/articulos";
import * as schPromociones from "../componentes/schemas/promociones";
import {cestas} from "./Cestas";

class OfertasClase {
    private promociones: Promociones[];

    constructor(){
        schPromociones.getPromociones().then(res=>{
            if(res.length > 0) {
                this.promociones = res;
            }
            else {
                this.promociones = [];
            }
        });        
    }

    deshacerOfertas(cesta: Cesta) {
        return cesta;
    }

    existeArticuloParaOfertaEnCesta(cesta: Cesta, idArticulo: number, unidadesNecesarias: number) {
        for(let i = 0; i < cesta.lista.length; i++)
        {
            if(cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias)
            {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }

    async teLoAplicoTodo(necesariasPrincipal: number, necesariasSecundario: number, cesta: Cesta, posicionPrincipal: number, posicionSecundario: number, pideDelA: number, pideDelB: number, precioPromo: number, idPromo: string) {
        let numeroPrincipal     = 0;
        let numeroSecundario    = 0;
        let sobranPrincipal     = 0;
        let sobranSecundario    = 0;
        let nVeces              = 0;

        var idPrincipal         = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id: 0;
        var idSecundario        = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id: 0;

        if(pideDelA !== -1 && pideDelB !== -1)
        {
            numeroPrincipal          = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
            numeroSecundario         = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
            nVeces                   = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal          = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
            sobranSecundario         = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

            cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = await this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo*nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
        }
        else
        {
            if(pideDelA !== -1 && pideDelB === -1)
            {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
                nVeces          = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;

                cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
            }
            else
            {
                if(pideDelA === -1 && pideDelB !== -1)
                {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
                    nVeces          = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

                    cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
                }
            }
        }
        return cesta;
    }
    async buscarOfertas(unaCesta: Cesta, viejoIva) {
        var hayOferta = false;
        unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
        for(let i = 0; i < this.promociones.length; i++)
        {
            for(let j = 0; j < this.promociones[i].principal.length; j++)
            {
                let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal)
                if(this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0)
                {
                    for(let z = 0; z < this.promociones[i].secundario.length; z++)
                    {
                        let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                        if(this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0)
                        {
                            unaCesta = await this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                            hayOferta = true;
                            break;
                        }
                    }
                }
               
            }
        }
        if(hayOferta)
        {
            unaCesta.tiposIva = viejoIva; //No se suma IVA en la promoción para calcularlo en la siguiente línea.
            unaCesta = await cestas.recalcularIvas(unaCesta);
        }

        cestas.setCesta(unaCesta);
        return unaCesta;
    }

    async insertarLineaPromoCestaCombo(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number) {
        var dtoAplicado = await this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);

        if(tipoPromo === 1) //COMBO
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
        return cesta
    }
    async insertarLineaPromoCestaIndividual(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, cantidadPrincipal: number) {
        var dtoAplicado = await this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);

        if(tipoPromo === 2) //INDIVIDUAL
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
                        cantidadSecundario: 0, //si es 0 no existe
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: 0,
                        unidadesOferta: unidades
                    }
                }
            });
        }
        
        return cesta
    }

    async calcularPrecioRealCombo(tipoPromo: number, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number, unidadesOferta: number, precioTotalOferta: number) {
        let precioSinOfertaPrincipal    = 0;
        let precioSinOfertaSecundario   = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = (await schArticulos.getPrecio(idPrincipal)).precioConIva;
        }

        if(idSecundario != 0)
        {
            precioSinOfertaSecundario = (await schArticulos.getPrecio(idSecundario)).precioConIva;
        }

        if(tipoPromo === 1) //COMBO
        {
            precioTotalSinOferta = (precioSinOfertaPrincipal*cantidadPrincipal + precioSinOfertaSecundario*cantidadSecundario)*unidadesOferta;
        }

        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta,
            precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario*dto))*unidadesOferta
        };
    }

    async calcularPrecioRealIndividual(tipoPromo: number, idPrincipal: number, cantidadPrincipal: number, unidadesOferta: number, precioTotalOferta: number) {
        let precioSinOfertaPrincipal    = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = (await schArticulos.getPrecio(idPrincipal)).precioConIva;
        }

        if(tipoPromo === 2) //INDIVIDUAL
        {
            if(idPrincipal != 0)
            {
                precioTotalSinOferta = precioSinOfertaPrincipal*cantidadPrincipal*unidadesOferta;
            }
        }
        
        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta*cantidadPrincipal
        };
    }
}

const ofertas = new OfertasClase();

export {ofertas}