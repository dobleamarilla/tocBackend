import * as schCestas from "../componentes/schemas/cestas";
import {construirObjetoIvas, crearCestaVacia} from "../funciones/funciones";
import {articulos} from "../clases/Articulos";
import {ofertas} from "../clases/Ofertas";
import {caja} from "../clases/Caja";

class CestaClase {
    private cesta: Cesta;
    private udsAplicar: number;
    constructor(){
        schCestas.getUnaCesta().then((respuesta) => {
            if(respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
                for(let i = 0; i < respuesta.lista.length; i++) {
                    respuesta.lista[i].subtotal = Number(respuesta.lista[i].subtotal.toFixed(2));
                }
                this.cesta = respuesta;
            }
            else {
                this.cesta = crearCestaVacia();
            }
        });
        this.udsAplicar = 1;
    }
    setCesta(data: Cesta) {
        for(let i = 0; i < data.lista.length; i++)
        {
            data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
        }
        schCestas.setCesta(data);
        this.cesta = data;
        this.enviarCesta();
    }
    enviarCesta(){
        //enviar cesta al frontend
    }
    getCesta(){
        return this.cesta;
    }
    async limpiarCesta(unaCesta: Cesta, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number) {
        if(pideDelA != -1)
        {
            if(sobraCantidadPrincipal > 0)
            {
                const datosArticulo = await articulos.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
                unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal*datosArticulo.precioConIva;
            }
            else
            {
                unaCesta.lista.splice(posicionPrincipal, 1);
            }
        }

        if(pideDelB != -1)
        {
            if(sobraCantidadSecundario > 0)
            {
                const datosArticulo = await articulos.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
                unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
                unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario*datosArticulo.precioConIva;
            }
            else
            {
                if(posicionSecundario > posicionPrincipal)
                {
                    unaCesta.lista.splice(posicionSecundario-1, 1);
                }
                else
                {
                    unaCesta.lista.splice(posicionSecundario, 1);
                }
            }
        }
        return unaCesta;
    }
    async insertarArticuloCesta(infoArticulo, unidades: number, infoAPeso = null) {
        var miCesta = this.getCesta();
        
        if(miCesta.lista.length > 0)
        {
            let encontrado = false;
            for(let i = 0; i < miCesta.lista.length; i++)
            {
                if(miCesta.lista[i]._id === infoArticulo._id)
                {
                    var viejoIva = miCesta.tiposIva;
                    
                    if(infoAPeso == null)
                    {
                        miCesta.lista[i].unidades += unidades;
                        miCesta.lista[i].subtotal += unidades*infoArticulo.precioConIva;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva);
                    }
                    else
                    {
                        miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva, infoAPeso);
                    }  
                   
                    encontrado = true;
                    break;
                }
            }
            if(!encontrado)
            {
                if(infoAPeso == null)
                {
                    miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
                }
                else
                {
                    miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                }                
            }
        }
        else
        {
            if(infoAPeso == null)
            {
                miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
            }
            else
            {
                miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
            }            
        }
        return await ofertas.buscarOfertas(miCesta, viejoIva);
    }

    async addItem(idArticulo: number, idBoton: String, aPeso: Boolean, infoAPeso: any) {
        var unidades = this.udsAplicar;
        var cestaRetornar: Cesta = null;
        if(caja.cajaAbierta())
        {
            try
            {
                if(!aPeso) //TIPO NORMAL
                {
                    let infoArticulo = await articulos.getInfoArticulo(idArticulo);
                    if(infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
                    {
                        cestaRetornar = await this.insertarArticuloCesta(infoArticulo, unidades);
                    }
                    else
                    {
                        // vueToast.abrir('error', 'Este artículo tiene errores');
                    }
                }
                else //TIPO PESO
                {
                    cestaRetornar = await this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, infoAPeso);
                }
            }
            catch(err)
            {
                console.log(err);
                // vueToast.abrir('error', 'Error al añadir el articulo');
                this.udsAplicar = 1;
            }
        }
        else
        {
            // vueToast.abrir('danger', 'Se requiere una caja abierta para cobrar');
        }
        this.udsAplicar = 1;
        return cestaRetornar;
    }
    setUnidadesAplicar(unidades: number){
        this.udsAplicar = unidades;
    }

    async recalcularIvas(cesta: Cesta) {
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
        }
        for(let i = 0; i < cesta.lista.length; i++)
        {
            if(cesta.lista[i].promocion.esPromo === false)
            {
                let infoArticulo = await articulos.getInfoArticulo(cesta.lista[i]._id);
                cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else
            {
                if(cesta.lista[i].promocion.esPromo === true)
                {
                    if(cesta.lista[i].nombre == 'Oferta combo')
                    {
                        let infoArticuloPrincipal = await articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                        infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);

                        let infoArticuloSecundario = await articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
                        infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
                    }
                    else
                    {
                        if(cesta.lista[i].nombre == 'Oferta individual')
                        {
                            let infoArticulo = await articulos.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                            infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                            cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                        }
                    }
                }
            }
        }
        return cesta;
    }
}

const cestas = new CestaClase();

export {cestas}