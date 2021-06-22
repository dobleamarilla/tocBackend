import * as schArticulos from "../componentes/schemas/articulos";
import * as schArticulosTarifaEspecial from "../componentes/schemas/articulosTarifaEspecial";

class Articulos {
    
    private tecladoTarifaEspecial: boolean;
    constructor(){
        this.tecladoTarifaEspecial = false;
    }
    async getInfoArticulo(idArticulo: number) {
        if(!this.tecladoTarifaEspecial)
        {
            const infoArticulo = await schArticulos.getInfoArticulo(idArticulo);
            if(infoArticulo)
            {
                return infoArticulo;
            }
            else
            {
                console.log("Algo pasa con infoArticulo: ", infoArticulo);
            }
        }
        else
        {
            const infoArticuloTarifaEspecial = await schArticulosTarifaEspecial.getInfoArticuloTarifaEspecial(idArticulo);
            if(infoArticuloTarifaEspecial)
            {
                return infoArticuloTarifaEspecial;
            }
            else
            {
                console.log("Algo pasa con infoArticulo: ", infoArticuloTarifaEspecial);
            }
        }
    }
}

const articulos = new Articulos();

export {articulos}