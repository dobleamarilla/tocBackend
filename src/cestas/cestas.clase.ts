// 100%
import * as schCestas from './cestas.mongodb';
import { CestasInterface } from './cestas.interface';
import { construirObjetoIvas, crearCestaVacia } from '../funciones/funciones';
import { articulosInstance } from '../articulos/articulos.clase';
import { ofertas } from '../promociones/promociones.clase';
import { cajaInstance } from '../caja/caja.clase';

/* Siempre cargar la cesta desde MongoDB */
export class CestaClase {
  private cesta: CestasInterface;
  private udsAplicar: number;
  constructor() {
    /* CARGA DESDE MONGO UNA CESTA EN MEMORIA DE NODE */
    schCestas.getUnaCesta().then((respuesta: CestasInterface) => {
      if (respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
      for (let i = 0; i < respuesta.lista.length; i++) {
        respuesta.lista[i].subtotal = Number(respuesta.lista[i].subtotal.toFixed(2));
      }
      this.cesta = respuesta;
    } else {
        this.cesta = crearCestaVacia();
      }
    });
    this.udsAplicar = 1;
  }

  getCesta(idCesta: number): Promise<CestasInterface> {
    return schCestas.getCestaConcreta(idCesta);
  }

  getCestaRandom(): Promise<CestasInterface> {
    return schCestas.getUnaCesta().then((cesta) => {
      if (cesta != null) {
        return cesta
      } else {
        // No hay ninguna cesta. Crear una.
        console.log("Entro aquí");
        const nueva = this.nuevaCestaVacia();
        return this.setCesta(nueva).then((resultado) => {
          if (resultado) {
            return nueva;
          } else {
            throw "Error al crear nueva cesta vacía (por que no hay ninguna)";
          }
        }).catch((err) => {
          throw err;
        });
      }
    }).catch((err) => {
      console.log(err);
      return null;
    });
  }

  // getCurrentId() {
  //   return this.cesta._id;
  // }

  reiniciarCesta(idCestaBorrar) {
    return this.borrarCesta(idCestaBorrar).then(() => {
      return this.getTodasCestas().then((res) => {
        if(res.length > 0) { // Hay alguna cesta
          return res[0]; //Devuelvo la primera que encuentro.
        } else { // No quedan cestas
          const nuevaCesta = this.nuevaCestaVacia();
          this.setCesta(nuevaCesta);
          return nuevaCesta;
        }
      });
    });


  }

  nuevaCestaVacia() {
    const nuevaCesta: CestasInterface = {
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

  getTodasCestas(): Promise<CestasInterface[]> {
    return schCestas.getAllCestas();
  }

  borrarCesta(idCestaBorrar): Promise<boolean> {
    return schCestas.borrarCesta(idCestaBorrar).then((res) => {
      if (res.acknowledged) {
        return true;
      } else {
        return false;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }

  /* Guarda la cesta en Mongo */
  setCesta(cesta: CestasInterface): Promise<boolean> {
    for(let i = 0; i < cesta.lista.length; i++) {
      cesta.lista[i].subtotal = Number(cesta.lista[i].subtotal.toFixed(2));
    }
    return schCestas.setCesta(cesta).then((res) => {
      if (res.acknowledged) {
        return true;
      } else {
        return false;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }

  /* Obtiene la cesta, borra el  item y devuelve la cesta final */
  borrarItemCesta(idCesta: number, idArticulo: number) {
    return this.getCesta(idCesta).then((cesta) => {
        for (let i = 0; i < cesta.lista.length; i++) {
          if (cesta.lista[i]._id == idArticulo) {
            cesta.lista.splice(i, 1);
            break;
          }
        }
        this.setCesta(cesta).then((result) => {
          if (result) {
            return cesta;
          } else {
            return false;
          }
        }).catch((err) => {
          console.log(err);
          return false;
        });
        return cesta;
    }).catch((err) => {
        console.log(err);
        return false;
    });
  }

  // cambiarCurrentCesta(data: CestasInterface) {
  //   for(let i = 0; i < data.lista.length; i++) {
  //       data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
  //   }
  //   this.cesta = data;
  // }

  // getCurrentCesta() {
  //   return this.cesta;
  // }

  async limpiarCesta(unaCesta: CestasInterface, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number) {
    if(pideDelA != -1) {
      if(sobraCantidadPrincipal > 0) {
        const datosArticulo = await articulosInstance.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
        unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
        unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal*datosArticulo.precioConIva;
      } else {
        unaCesta.lista.splice(posicionPrincipal, 1);
        }
    }

    if(pideDelB != -1) {
      if(sobraCantidadSecundario > 0) {
        const datosArticulo = await articulosInstance.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
        unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
        unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario*datosArticulo.precioConIva;
      } else {
          if(posicionSecundario > posicionPrincipal) {
            unaCesta.lista.splice(posicionSecundario-1, 1);
          } else {
              unaCesta.lista.splice(posicionSecundario, 1);
          }
        }
    }
    return unaCesta;
  }
    async insertarArticuloCesta(infoArticulo, unidades: number, idCesta: number, infoAPeso = null) {
        var miCesta = await this.getCesta(idCesta);
        console.log("El ID de la cesta es: ", idCesta);
        if(miCesta.lista.length > 0)
        {
            let encontrado = false;
            for(let i = 0; i < miCesta.lista.length; i++) {
                if(miCesta.lista[i]._id === infoArticulo._id) {
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

    async addItem(idArticulo: number, idBoton: string, aPeso: boolean, infoAPeso: any, idCesta: number) {
        var unidades = this.udsAplicar;
        var cestaRetornar: CestasInterface = null;
        if(cajaInstance.cajaAbierta())
        {
            try
            {
                if(!aPeso) { // TIPO NORMAL                  
                    let infoArticulo = await articulosInstance.getInfoArticulo(idArticulo);
                    if(infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
                    {
                        cestaRetornar = await this.insertarArticuloCesta(infoArticulo, unidades, idCesta);
                    }
                    else
                    {
                        // vueToast.abrir('error', 'Este artículo tiene errores');
                    }
                }
                else //TIPO PESO
                {
                    cestaRetornar = await this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, idCesta, infoAPeso);
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
    setUnidadesAplicar(unidades: number) {
        this.udsAplicar = unidades;
    }

    async recalcularIvas(cesta: CestasInterface) {
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
        for(let i = 0; i < cesta.lista.length; i++) {
            if(cesta.lista[i].promocion.esPromo === false) {
                let infoArticulo = await articulosInstance.getInfoArticulo(cesta.lista[i]._id);
                cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else if(cesta.lista[i].promocion.esPromo === true) {
                    if(cesta.lista[i].nombre == 'Oferta combo') {
                        let infoArticuloPrincipal = await articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                        infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);

                        let infoArticuloSecundario = await articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
                        infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
                    }
                    else {
                        if(cesta.lista[i].nombre == 'Oferta individual') {
                            let infoArticulo = await articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                            infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                            cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                        }
                    }
                  }
            
        }
        return cesta;
    }
}

const cestas = new CestaClase();

export { cestas }