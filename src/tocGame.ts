// import * as schArticulos from "./componentes/schemas/articulos";
// import * as schArticulosTarifaEspecial from "./componentes/schemas/articulosTarifaEspecial";
// import * as schCajas from "./componentes/schemas/cajas";
// import * as schCestas from "./componentes/schemas/cestas";
// import * as schClientes from "./componentes/schemas/clientes";
// import * as schCodigoBarras from "./componentes/schemas/codigoBarras";
// import * as schDevoluciones from "./componentes/schemas/devoluciones";
// import * as schFamilias from "./componentes/schemas/familias";
// import * as schInfoMonedas from "./componentes/schemas/infoMonedas";
// import * as schMenus from "./componentes/schemas/menus";
// import * as schMovimientos from "./componentes/schemas/movimientos";
// import * as schParametros from "./componentes/schemas/parametros";
// import * as schParametrosTicket from "./componentes/schemas/parametrosTicket";
// import * as schPromociones from "./componentes/schemas/promociones";
// import * as schSincroCajas from "./componentes/schemas/sincroCajas";
// import * as schSincroFichajes from "./componentes/schemas/sincroFichajes";
// import * as schTeclas from "./componentes/schemas/teclas";
// import * as schTickets from "./componentes/schemas/tickets";
// import * as schTrabajadores from "./componentes/schemas/trabajadores";
// import * as impresora from "./componentes/impresora";
// import * as email  from "./componentes/email";
// import net from "net";
// import {Ean13Utils} from 'ean13-lib';
// import moment from 'moment';
// import {socketSanPedro} from "./componentes/server";


// const TIPO_USB = 'USB';
// const TIPO_SERIE = 'SERIE';
// const TIPO_CLEARONE = 'CLEARONE';
// const TIPO_3G = '3G';
// const TIPO_ENTRADA = 'ENTRADA';
// const TIPO_SALIDA = 'SALIDA';

// class TocGame 
// {
//     private arrayFichados: Trabajador[];
//     private caja: Caja;
//     private cesta: Cesta;
//     private promociones: Promociones[];
//     private parametros: Parametros;
//     private clienteSeleccionado: Cliente;
//     private udsAplicar: number;
//     private esVIP: boolean;
//     private infoClienteVip: any;
//     private esDevolucion: boolean;
//     private esConsumoPersonal: boolean;
//     private stopNecesario: boolean;
//     private auxTotalDatafono: number;
//     public datafonoForzado3G: boolean;
//     public idClienteVIP: number;
//     public tecladoTarifaEspecial: boolean; //Si es TRUE = tarifa especial cliente vip activado
//     constructor(info, infoCaja) 
//     {
//         /* Limpieza de datos en tránsito pero no enviados */
//         schTickets.cleanTickets();
//         schSincroFichajes.cleanFichajes();
//         schDevoluciones.cleanDevoluciones();
//         schMovimientos.cleanMovimientos();
//         schSincroCajas.cleanCajas();
        
//         this.clienteSeleccionado = null;
//         this.udsAplicar = 1;
//         this.esVIP = false;
//         this.esDevolucion = false;
//         this.esConsumoPersonal = false;
//         this.stopNecesario = false;
//         this.idClienteVIP = null;
//         this.tecladoTarifaEspecial = false;
//         this.arrayFichados = [];
//         if (info !== null) 
//         {
//             this.parametros = info;
//         }
//         else 
//         {
//             this.parametros = {
//                 _id: '',
//                 licencia: 0,
//                 codigoTienda: 0,
//                 database: '',
//                 nombreEmpresa: '',
//                 nombreTienda: '',
//                 tipoImpresora: TIPO_USB,
//                 tipoDatafono: TIPO_CLEARONE,
//                 impresoraCafeteria: 'NO',
//                 clearOneCliente: 0,
//                 clearOneTienda: 0,
//                 clearOneTpv: 0,
//                 botonesConPrecios: 'No',
//                 prohibirBuscarArticulos: 'No'

//             }
//         }
        
//         if(infoCaja === null)
//         {
//             this.caja  = {
//                 _id: "CAJA",
//                 inicioTime: null,
//                 finalTime: null,
//                 idDependienta: null,
//                 totalApertura: null,
//                 totalCierre: null,
//                 calaixFetZ: null,
//                 descuadre: null,
//                 infoExtra: {
//                     cambioInicial: null,
//                     cambioFinal: null,
//                     totalSalidas: null,
//                     totalEntradas: null,
//                     totalEnEfectivo: null,
//                     totalTarjeta: null,
//                     totalDeuda: null
//                 },
//                 primerTicket: null,
//                 ultimoTicket: null,
//                 recaudado: null,
//                 nClientes: null,
//                 detalleApertura: [],
//                 detalleCierre: [],
//                 enviado: false,
//                 enTransito: false,
//                 totalDatafono3G: null,
//                 totalClearOne: null
//             };
//         }
//         else
//         {
//             this.caja = infoCaja;
//             if(typeof this.caja.infoExtra == "undefined")
//             {
//                 this.caja.infoExtra = {
//                     cambioInicial: null,
//                     cambioFinal: null,
//                     totalSalidas: null,
//                     totalEntradas: null,
//                     totalEnEfectivo: null,
//                     totalTarjeta: null,
//                     totalDeuda: null
//                 };
//             }
//         }
//     }
//     cajaAbierta()
//     {
//         if(this.caja.inicioTime === null || this.caja.inicioTime === undefined)
//         {
//             if(this.caja.finalTime === null || this.caja.finalTime === undefined)
//             {
//                 return false;
//             }
//             else
//             {
//                 throw 'Error de comportamiento de cajas 1';
//                 return false;
//             }
//         }
//         else
//         {
//             if(this.caja.finalTime === null || this.caja.finalTime === undefined)
//             {
//                 return true;
//             }
//             else
//             {
//                 throw 'Error de comportamiento de cajas 2';
//                 return true;
//             }
//         }
//     }

//     setStopNecesario(x: boolean)
//     {
//         this.stopNecesario = x;
//     }
//     getStopNecesario()
//     {
//         return this.stopNecesario;
//     }
//     setUnidades(x: number)
//     {
//         this.udsAplicar = x;
//     }

//     resetEstados()
//     {
//         this.esVIP = false;
//         this.esDevolucion = false;
//         this.esConsumoPersonal = false;
//     }

//     getParametros(): Parametros
//     {
//         return this.parametros;
//     }

//     setCaja(data: Caja)
//     {
//         this.caja  = data;
//     }
//     todoInstalado(): boolean //COMPROBADA
//     {
//         if (this.parametros.licencia !== 0 && this.parametros.codigoTienda !== 0 && this.parametros.database !== '' && this.parametros.nombreEmpresa !== '' && this.parametros.nombreTienda !== '') 
//         {
//             return true;
//         }
//         else 
//         {
//             return false;
//         }
//     }
//     getInicioTimeCaja()
//     {
//         return this.caja.inicioTime;
//     }
//     getTipoImpresora()
//     {
//         return this.parametros.tipoImpresora;
//     }
//     getImpresoraCafeteria() {
//         return this.parametros.impresoraCafeteria;
//     }
//     getTipoDatafono()
//     {
//         return this.parametros.tipoDatafono;
//     }
//     setTipoImpresora(data)
//     {
//         this.parametros.tipoImpresora = data;
//     }
//     setTipoDatafono(data)
//     {
//         this.parametros.tipoDatafono = data;
//     }
//     setImpresoraCafeteria(data) {
//         this.parametros.impresoraCafeteria = data;
//     }
//     setParametros(licencia: number, codigoTienda: number, database: string, nombreEmpresa: string, nombreTienda: string, tipoImpresora: string, impresoraCafeteria: string, tipoDatafono: string, botonesConPrecios: string, prohibirBuscarArticulos: string): void //COMPROBADA
//     {
//         this.parametros.licencia                = licencia;
//         this.parametros.codigoTienda            = codigoTienda;
//         this.parametros.database                = database;
//         this.parametros.nombreEmpresa           = nombreEmpresa;
//         this.parametros.nombreTienda            = nombreTienda;
//         this.parametros.tipoImpresora           = tipoImpresora;
//         this.parametros.impresoraCafeteria      = impresoraCafeteria;
//         this.parametros.tipoDatafono            = tipoDatafono;
//         this.parametros.botonesConPrecios       = botonesConPrecios;
//         this.parametros.prohibirBuscarArticulos = prohibirBuscarArticulos;
//     }
//     setupToc(info): void //COMPROBADA
//     {
//         if (info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0) 
//         {
//             schParametros.insertParams(info);
//             this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.impresoraCafeteria, info.tipoDatafono, info.botonesConPrecios, info.prohibirBuscarArticulos);
//             this.descargarDatos();
//         }
//     }
//     descargarDatos(): void 
//     {
//         socketSanPedro.emit('cargar-todo', { licencia: this.parametros.licencia, database: this.parametros.database });
//     }
//     actualizarTeclado()
//     {
//         this.setStopNecesario(true);
//         socketSanPedro.emit('descargar-teclado', { licencia: this.parametros.licencia, database: this.parametros.database, codigoTienda: this.parametros.codigoTienda});
//     }
//     actualizarTrabajadores()
//     {
//         this.setStopNecesario(true);
//         socketSanPedro.emit('descargar-trabajadores', { licencia: this.parametros.licencia, database: this.parametros.database, codigoTienda: this.parametros.codigoTienda});
//     }
//     hayFichados()
//     {
//         if(this.getArrayFichados().length > 0)
//         {
//             return true;
//         }
//         else
//         {
//             return false;
//         }
//     }
//     activarConsumoPersonal()
//     {
//         this.desactivarDevolucion();
//         this.limpiarClienteVIP();
//         this.esConsumoPersonal = true;
//         vueCobrar.activarConsumoPersonal();
//     }
//     desactivarConsumoPersonal()
//     {
//         this.esConsumoPersonal = false;
//         vueCobrar.desactivarConsumoPersonal();
//     }
//     desactivarDevolucion()
//     {
//         this.esDevolucion = false;
//         vueCobrar.setEsDevolucion(false);
//     }

//     round(value) 
//     {
//         return Math.trunc(value/10) * 10;
//     }
    
//     nuevaSalidaDinero(cantidad: number, concepto: string, tipoExtra: string, noImprimir: boolean = false, idTicket: number = -100)
//     {   
//         let codigoBarras = "";
        
//         if(tipoExtra != 'TARJETA' && tipoExtra != 'TKRS') {
//             this.generarCodigoBarrasSalida().then(codigoBarras=>{
//                 codigoBarras = String(Ean13Utils.generate(codigoBarras));
//                 let objSalida: Movimientos = {
//                     _id: Date.now(),
//                     tipo: TIPO_SALIDA,
//                     valor: cantidad,
//                     concepto: concepto,
//                     idTrabajador: this.getCurrentTrabajador()._id,
//                     codigoBarras: codigoBarras,
//                     tipoExtra: tipoExtra,
//                     idTicket: idTicket
//                 }
//                 schMovimientos.insertarMovimiento(objSalida);
        
//                 if(!noImprimir)
//                 {
//                     const imprimirTicketSalida: objImprimirSalida = {
//                         totalRetirado: objSalida.valor,
//                         fecha: objSalida._id,
//                         nombreDependienta: this.getCurrentTrabajador().nombre,
//                         nombreTienda: this.parametros.nombreTienda,
//                         concepto: objSalida.concepto,
//                         tipoImpresora: this.parametros.tipoImpresora,
//                         codigoBarras: codigoBarras
//                     };
//                     impresora.salidaDinero(imprimirTicketSalida);
//                 }
//             });
//         }
//     }
//     getNumeroTresDigitos(x: number)
//     {
//         let devolver = '';
//         if(x< 100 && x >=10)
//         {
//             devolver = '0' + x;
//         }
//         else
//         {
//             if(x < 10 && x >= 0)
//             {
//                 devolver = '00' + x;
//             }
//             else
//             {
//                 devolver = x.toString();
//             }
//         }
//         return devolver;
//     }
//     fixLength12(numero) {
//         numero = numero.split("").reverse().join("");
//         let newNum = '';
//         for(let i = 0; i < 12; i++) {
//             if(numero[i] != undefined) newNum += numero[i];
//             else newNum += '0';
//         }
//         return newNum.split("").reverse().join("");
//     }
//     generarCodigoBarrasSalida()
//     {
//         var devolver:Promise<string> = new Promise((dev, rej)=>{
//             schCodigoBarras.getUltimoCodigoBarras().then(async res=>{
//                 var codigoBarras: number;
//                 if(res == null) 
//                 {
//                     codigoBarras = 0;
//                 }
//                 else
//                 {
//                     codigoBarras = res.ultimo;
//                 }
    
//                 if(codigoBarras == 999)
//                 {
//                     await schCodigoBarras.resetContador();
                    
//                 }
//                 else
//                 {
//                     await schCodigoBarras.actualizarUltimoCodigoBarras(codigoBarras+1);
//                 }
        
//                 codigoBarras = (await schCodigoBarras.getUltimoCodigoBarras()).ultimo;
        
//                 let codigoLicenciaStr: string = this.getNumeroTresDigitos(this.getParametros().licencia);
//                 let strNumeroCodigosDeBarras: string = this.getNumeroTresDigitos(codigoBarras);
//                 let codigoFinal: string =  '';
//                 let digitYear = new Date().getFullYear().toString()[3];
        
        
//                 codigoFinal = `98${codigoLicenciaStr}${digitYear}${this.getNumeroTresDigitos(moment().dayOfYear())}${strNumeroCodigosDeBarras}`;
//                 dev(codigoFinal);
//             });
//         });
//         return devolver;
//     }

//     nuevaEntradaDinero(cantidad: number, concepto: string)
//     {
//         let objEntrada = {
//             _id: Date.now(),
//             tipo: TIPO_ENTRADA,
//             valor: cantidad,
//             concepto: concepto,
//             idTrabajador: this.getCurrentTrabajador()._id
//         }

//         schMovimientos.insertarMovimiento(objEntrada);

//         const objImprimir: objImprimirEntrada = {
//             totalIngresado: objEntrada.valor,
//             fecha: objEntrada._id,
//             nombreDependienta: this.getCurrentTrabajador().nombre,
//             nombreTienda: this.parametros.nombreTienda,
//             concepto: objEntrada.concepto,
//             tipoImpresora: this.parametros.tipoImpresora
//         };
//         impresora.entradaDinero(objImprimir);
//     }
//     addFichado(trabajador: any): void //COMPROBADA
//     {
//         this.setCurrentTrabajador(trabajador._id);
//         this.arrayFichados.push(trabajador);
//         var auxTime = new Date();
//         let objGuardar = {
//             _id: Date.now(),
//             infoFichaje: {
//                 idTrabajador: trabajador._id,
//                 fecha: {
//                     year: auxTime.getFullYear(),
//                     month: auxTime.getMonth(),
//                     day: auxTime.getDate(),
//                     hours: auxTime.getHours(),
//                     minutes: auxTime.getMinutes(),
//                     seconds: auxTime.getSeconds()
//                 }
//             },
//             tipo: "ENTRADA"
//         };
//         schSincroFichajes.nuevoItem(objGuardar);
//         schTrabajadores.ficharTrabajador(trabajador._id).then(()=>{
//             vueToast.abrir('success', 'FICHAJE OK');
//         });

//     }
//     delFichado(trabajador: any): void //COMPROBADA
//     {
//         this.arrayFichados = this.arrayFichados.filter(item=>{
//             return item._id != trabajador._id;
//         });

//         schTrabajadores.desficharTrabajador(trabajador._id).then(()=>{
//             vueToast.abrir('success', 'SALIDA OK');
//         });

//         var auxTime = new Date();
//         let objGuardar = {
//             _id: Date.now(),
//             infoFichaje: {
//                 idTrabajador: trabajador._id,
//                 fecha: {
//                     year: auxTime.getFullYear(),
//                     month: auxTime.getMonth(),
//                     day: auxTime.getDate(),
//                     hours: auxTime.getHours(),
//                     minutes: auxTime.getMinutes(),
//                     seconds: auxTime.getSeconds()
//                 }
//             },
//             tipo: "SALIDA"
//         };

//         schSincroFichajes.nuevoItem(objGuardar);
//     }
//     abrirCaja(data: Caja) //Guarda los datos de la caja nueva en memoria y en la bbdd. Cierra el modal de apertura e inicia otra vez el programa. Solo se llama desde el modal.
//     {
//         this.setCaja(data);
//         schCajas.setInfoCaja(data);
//         vueApertura.cerrarModal();
//         vueToast.abrir('success', 'CAJA ABIERTA');
//         this.iniciar();
//     }
//     setArrayFichados(arrayFichados: any): void //COMPROBADA
//     {
//         if(arrayFichados.length > 0)
//         {
//             this.arrayFichados = arrayFichados;
//         }
//         else
//         {
//             this.arrayFichados = [];
//         }
//     }
//     getArrayFichados() //COMPROBADA
//     {
//         return this.arrayFichados;
//     }
//     getCurrentTrabajador(): any
//     {
//         if(this.getArrayFichados().length > 0)
//         {
//             return this.getArrayFichados()[(this.getArrayFichados().length)-1];
//         }
//         else
//         {
//             return false;
//         }
//     }
//     setCurrentTrabajador(idTrabajador: number): boolean
//     {
//         var fichados = this.getArrayFichados();
//         if(fichados.length > 0)
//         {
//             var aux = this.getCurrentTrabajador();
//             for(let i = 0; i < fichados.length; i++)
//             {
//                 if(fichados[i].idTrabajador === idTrabajador)
//                 {
//                     fichados[fichados.length-1] = fichados[i];
//                     fichados[i] = aux;
//                     this.setArrayFichados(fichados);
//                     return true;
//                 }
//             }
            
//         }
//         else
//         {
//             vueToast.abrir('error', 'NO HAY PERSONAL FICHADO');
//             return false
//         }
//     }
//     clickMenu(nombreMenu: string)
//     {
//         schTeclas.getTecladoMain(nombreMenu).then((res)=>{
//             vuePanelVentas.cargarTeclado(res);
//         });
//     }
//     borrarCesta()
//     {
//         schCestas.borrarCesta(this.cesta._id);
//         const nuevaCesta: Cesta = {
//             _id: Date.now(),
//             tiposIva: {
//                 base1: 0,
//                 base2: 0,
//                 base3: 0,
//                 valorIva1: 0,
//                 valorIva2: 0,
//                 valorIva3: 0,
//                 importe1: 0,
//                 importe2: 0,
//                 importe3: 0
//             },
//             lista: []
//         }
//         this.setCesta(nuevaCesta);
//     }
//     redondearPrecio(precio) /* REDONDEA AL SEGUNDO DECIMAL */ 
//     {
//         return Math.round(precio * 100) / 100;
//     }
//     construirObjetoIvas(infoArticulo, unidades, tipoIvaAnterior: TiposIva, infoAPeso = null) : TiposIva
//     {
//         let base1 = 0, base2 = 0, base3 = 0;
//         let valor1 = 0, valor2 = 0, valor3 = 0;
//         let importe1 = 0, importe2 = 0, importe3 = 0;

//         if(infoAPeso == null)
//         {
//             switch (infoArticulo.tipoIva) 
//             {
//                 case 1: base1 = (infoArticulo.precioConIva / 1.04) * unidades; valor1 = (infoArticulo.precioConIva / 1.04) * 0.04 * unidades; importe1 = infoArticulo.precioConIva * unidades; break;
//                 case 2: base2 = (infoArticulo.precioConIva / 1.10) * unidades; valor2 = (infoArticulo.precioConIva / 1.10) * 0.10 * unidades; importe2 = infoArticulo.precioConIva * unidades; break;
//                 case 3: base3 = (infoArticulo.precioConIva / 1.21) * unidades; valor3 = (infoArticulo.precioConIva / 1.21) * 0.21 * unidades; importe3 = infoArticulo.precioConIva * unidades; break;
//                 default: break;
//             }
//         }
//         else
//         {
//             switch (infoArticulo.tipoIva) 
//             {
//                 case 1: base1 = (infoAPeso.precioAplicado / 1.04) * unidades; valor1 = (infoAPeso.precioAplicado / 1.04) * 0.04 * unidades; importe1 = infoAPeso.precioAplicado * unidades; break;
//                 case 2: base2 = (infoAPeso.precioAplicado / 1.10) * unidades; valor2 = (infoAPeso.precioAplicado / 1.10) * 0.10 * unidades; importe2 = infoAPeso.precioAplicado * unidades; break;
//                 case 3: base3 = (infoAPeso.precioAplicado / 1.21) * unidades; valor3 = (infoAPeso.precioAplicado / 1.21) * 0.21 * unidades; importe3 = infoAPeso.precioAplicado * unidades; break;
//                 default: break;
//             }
//         }

//         const aux = {
//             base1: this.redondearPrecio(base1) + tipoIvaAnterior.base1,
//             base2: this.redondearPrecio(base2) + tipoIvaAnterior.base2,
//             base3: this.redondearPrecio(base3) + tipoIvaAnterior.base3,
//             valorIva1: this.redondearPrecio(valor1) + tipoIvaAnterior.valorIva1,
//             valorIva2: this.redondearPrecio(valor2) + tipoIvaAnterior.valorIva2,
//             valorIva3: this.redondearPrecio(valor3) + tipoIvaAnterior.valorIva3,
//             importe1: this.redondearPrecio(importe1) + tipoIvaAnterior.importe1,
//             importe2: this.redondearPrecio(importe2) + tipoIvaAnterior.importe2,
//             importe3: this.redondearPrecio(importe3) + tipoIvaAnterior.importe3
//         };

//         return aux;

        
//     }
//     async recalcularIvas(cesta: Cesta)
//     {
//         cesta.tiposIva = {
//             base1: 0,
//             base2: 0,
//             base3: 0,
//             valorIva1: 0,
//             valorIva2: 0,
//             valorIva3: 0,
//             importe1: 0,
//             importe2: 0,
//             importe3: 0
//         }
//         for(let i = 0; i < cesta.lista.length; i++)
//         {
//             if(cesta.lista[i].promocion.esPromo === false)
//             {
//                 let infoArticulo = await this.getInfoArticulo(cesta.lista[i]._id);
//                 cesta.tiposIva = this.construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
//             }
//             else
//             {
//                 if(cesta.lista[i].promocion.esPromo === true)
//                 {
//                     if(cesta.lista[i].nombre == 'Oferta combo')
//                     {
//                         let infoArticuloPrincipal = await this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
//                         infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
//                         cesta.tiposIva = this.construirObjetoIvas(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);

//                         let infoArticuloSecundario = await this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
//                         infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario);
//                         cesta.tiposIva = this.construirObjetoIvas(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
//                     }
//                     else
//                     {
//                         if(cesta.lista[i].nombre == 'Oferta individual')
//                         {
//                             let infoArticulo = await this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
//                             infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal/(cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
//                             cesta.tiposIva = this.construirObjetoIvas(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta*cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
//                         }
//                     }
//                 }
//             }
//         }
//         return cesta;
//     }
//     async borrarItemCesta(index: number)
//     {
//         this.cesta.lista.splice(index, 1);
//         this.cesta = await this.recalcularIvas(this.cesta);
//         if(this.cesta.lista.length > 0)
//         {
//             this.setCesta(this.cesta);
//         }
//         else
//         {
//             this.borrarCesta();
//         }
//     }
//     getCesta()
//     {
//         return this.cesta;
//     }
//     setCesta(data: Cesta)
//     {
//         for(let i = 0; i < data.lista.length; i++)
//         {
//             data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
//         }
//         schCestas.setCesta(data);
//         this.cesta = data;
//         this.enviarCesta();
//     }
//     cargarCesta() //En memoria de la clase
//     {
//         schCestas.getUnaCesta(-1).then(respuesta => 
//             {
//                 if(respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null)
//                 {
//                     this.setCesta(respuesta);
//                 }
//                 else
//                 {
//                     this.setCesta(this.crearCestaVacia());
//                 }
//             });
//     }
//     crearCestaVacia()
//     {
//         const cestaVacia = {
//             _id: Date.now(),
//             tiposIva: {
//                 base1: 0,
//                 base2: 0,
//                 base3: 0,
//                 valorIva1: 0,
//                 valorIva2: 0,
//                 valorIva3: 0,
//                 importe1: 0,
//                 importe2: 0,
//                 importe3: 0
//             },
//             lista: []
//         }
//         return cestaVacia;
//     }
//     enviarCesta()
//     {
//         vueCesta.recibirCesta(this.cesta);
//     }
//     deshacerOfertas(cesta: Cesta)
//     {
//         return cesta;
//     }
//     existeArticuloParaOfertaEnCesta(cesta: Cesta, idArticulo: number, unidadesNecesarias: number)
//     {
//         for(let i = 0; i < cesta.lista.length; i++)
//         {
//             if(cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias)
//             {
//                 return i;
//             }
//         }
//         return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
//     }
//     async calcularPrecioRealCombo(tipoPromo: number, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number, unidadesOferta: number, precioTotalOferta: number)
//     {
//         let precioSinOfertaPrincipal    = 0;
//         let precioSinOfertaSecundario   = 0;
//         let precioTotalSinOferta        = 0;
//         if(idPrincipal != 0)
//         {
//             precioSinOfertaPrincipal = (await schArticulos.getPrecio(idPrincipal)).precioConIva;
//         }

//         if(idSecundario != 0)
//         {
//             precioSinOfertaSecundario = (await schArticulos.getPrecio(idSecundario)).precioConIva;
//         }

//         if(tipoPromo === 1) //COMBO
//         {
//             precioTotalSinOferta = (precioSinOfertaPrincipal*cantidadPrincipal + precioSinOfertaSecundario*cantidadSecundario)*unidadesOferta;
//         }

//         var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
//         return {
//             precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta,
//             precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario*dto))*unidadesOferta
//         };
//     }
//     async calcularPrecioRealIndividual(tipoPromo: number, idPrincipal: number, cantidadPrincipal: number, unidadesOferta: number, precioTotalOferta: number)
//     {
//         let precioSinOfertaPrincipal    = 0;
//         let precioTotalSinOferta        = 0;
//         if(idPrincipal != 0)
//         {
//             precioSinOfertaPrincipal = (await schArticulos.getPrecio(idPrincipal)).precioConIva;
//         }

//         if(tipoPromo === 2) //INDIVIDUAL
//         {
//             if(idPrincipal != 0)
//             {
//                 precioTotalSinOferta = precioSinOfertaPrincipal*cantidadPrincipal*unidadesOferta;
//             }
//         }
        
//         var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
//         return {
//             precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta*cantidadPrincipal
//         };
//     }
//     async insertarLineaPromoCestaCombo(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number)
//     {
//         var dtoAplicado = await this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);

//         if(tipoPromo === 1) //COMBO
//         {
//             cesta.lista.push({
//                 _id: -2,
//                 nombre: 'Oferta combo',
//                 unidades: unidades,
//                 subtotal: total,
//                 promocion: {
//                     _id: idPromo,
//                     esPromo: true,
//                     infoPromo: {
//                         idPrincipal: idPrincipal,
//                         cantidadPrincipal: cantidadPrincipal,
//                         idSecundario: idSecundario,
//                         cantidadSecundario: cantidadSecundario,
//                         precioRealPrincipal: dtoAplicado.precioRealPrincipal,
//                         precioRealSecundario: dtoAplicado.precioRealSecundario,
//                         unidadesOferta: unidades
//                     }
//                 }
//             });
//         }
//         return cesta
//     }
//     async insertarLineaPromoCestaIndividual(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, cantidadPrincipal: number)
//     {
//         var dtoAplicado = await this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);

//         if(tipoPromo === 2) //INDIVIDUAL
//         {
//             cesta.lista.push({
//                 _id: -2,
//                 nombre: 'Oferta individual',
//                 unidades: unidades,
//                 subtotal: total,
//                 promocion: {
//                     _id: idPromo,
//                     esPromo: true,
//                     infoPromo: {
//                         idPrincipal: idPrincipal,
//                         cantidadPrincipal: cantidadPrincipal,
//                         idSecundario: 0,
//                         cantidadSecundario: 0, //si es 0 no existe
//                         precioRealPrincipal: dtoAplicado.precioRealPrincipal,
//                         precioRealSecundario: 0,
//                         unidadesOferta: unidades
//                     }
//                 }
//             });
//         }
        
//         return cesta
//     }
//     async limpiarCesta(unaCesta: Cesta, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number)
//     {
//         if(pideDelA != -1)
//         {
//             if(sobraCantidadPrincipal > 0)
//             {
//                 const datosArticulo = await this.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
//                 unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
//                 unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal*datosArticulo.precioConIva;
//             }
//             else
//             {
//                 unaCesta.lista.splice(posicionPrincipal, 1);
//             }
//         }

//         if(pideDelB != -1)
//         {
//             if(sobraCantidadSecundario > 0)
//             {
//                 const datosArticulo = await this.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
//                 unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
//                 unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario*datosArticulo.precioConIva;
//             }
//             else
//             {
//                 if(posicionSecundario > posicionPrincipal)
//                 {
//                     unaCesta.lista.splice(posicionSecundario-1, 1);
//                 }
//                 else
//                 {
//                     unaCesta.lista.splice(posicionSecundario, 1);
//                 }
//             }
//         }
//         return unaCesta;
//     }
//     async teLoAplicoTodo(necesariasPrincipal: number, necesariasSecundario: number, cesta: Cesta, posicionPrincipal: number, posicionSecundario: number, pideDelA: number, pideDelB: number, precioPromo: number, idPromo: string)
//     {
//         let numeroPrincipal     = 0;
//         let numeroSecundario    = 0;
//         let sobranPrincipal     = 0;
//         let sobranSecundario    = 0;
//         let nVeces              = 0;

//         var idPrincipal         = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id: 0;
//         var idSecundario        = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id: 0;

//         if(pideDelA !== -1 && pideDelB !== -1)
//         {
//             numeroPrincipal          = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
//             numeroSecundario         = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
//             nVeces                   = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
//             sobranPrincipal          = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
//             sobranSecundario         = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

//             cesta = await this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
//             cesta = await this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo*nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
//         }
//         else
//         {
//             if(pideDelA !== -1 && pideDelB === -1)
//             {
//                 numeroPrincipal = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
//                 nVeces          = Math.trunc(numeroPrincipal);
//                 sobranPrincipal = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;

//                 cesta = await this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
//                 cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
//             }
//             else
//             {
//                 if(pideDelA === -1 && pideDelB !== -1)
//                 {
//                     numeroSecundario = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
//                     nVeces          = Math.trunc(numeroSecundario);
//                     sobranSecundario = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

//                     cesta = await this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
//                     cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
//                 }
//             }
//         }
//         return cesta;
//     }
//     async buscarOfertas(unaCesta: Cesta, viejoIva)
//     {
//         var hayOferta = false;
//         unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
//         for(let i = 0; i < this.promociones.length; i++)
//         {
//             for(let j = 0; j < this.promociones[i].principal.length; j++)
//             {
//                 let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal)
//                 if(this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0)
//                 {
//                     for(let z = 0; z < this.promociones[i].secundario.length; z++)
//                     {
//                         let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
//                         if(this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0)
//                         {
//                             unaCesta = await this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
//                             hayOferta = true;
//                             break;
//                         }
//                     }
//                 }
               
//             }
//         }
//         if(hayOferta)
//         {
//             unaCesta.tiposIva = viejoIva; //No se suma IVA en la promoción para calcularlo en la siguiente línea.
//             unaCesta = await this.recalcularIvas(unaCesta);
//         }

//         this.setCesta(unaCesta);
        
//     }
//     quitarClienteSeleccionado()
//     {
//         vueCesta.limpiarEstiloClienteActivo();
//         this.clienteSeleccionado = null;
//         vueCesta.puntosClienteActivo = 0;
//         if(this.tecladoTarifaEspecial)
//         {
//             this.tecladoTarifaEspecial = false;
//             this.iniciar();
//         }
//     }

//     async insertarArticuloCesta(infoArticulo, unidades: number, infoAPeso = null)
//     {
//         var miCesta = this.getCesta();
        
//         if(miCesta.lista.length > 0)
//         {
//             let encontrado = false;
//             for(let i = 0; i < miCesta.lista.length; i++)
//             {
//                 if(miCesta.lista[i]._id === infoArticulo._id)
//                 {
//                     var viejoIva = miCesta.tiposIva;
                    
//                     if(infoAPeso == null)
//                     {
//                         miCesta.lista[i].unidades += unidades;
//                         miCesta.lista[i].subtotal += unidades*infoArticulo.precioConIva;
//                         miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, viejoIva);
//                     }
//                     else
//                     {
//                         miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
//                         miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, viejoIva, infoAPeso);
//                     }  
                   
//                     encontrado = true;
//                     break;
//                 }
//             }
//             if(!encontrado)
//             {
//                 if(infoAPeso == null)
//                 {
//                     miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
//                     miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
//                 }
//                 else
//                 {
//                     miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
//                     miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
//                 }                
//             }
//         }
//         else
//         {
//             if(infoAPeso == null)
//             {
//                 miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
//                 miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
//             }
//             else
//             {
//                 miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
//                 miCesta.tiposIva = this.construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
//             }            
//         }
//         this.buscarOfertas(miCesta, viejoIva);
//     }
//     async getInfoArticulo(idArticulo: number)
//     {
//         if(!this.tecladoTarifaEspecial)
//         {
//             const infoArticulo = await schArticulos.getInfoArticulo(idArticulo);
//             if(infoArticulo)
//             {
//                 return infoArticulo;
//             }
//             else
//             {
//                 console.log("Algo pasa con infoArticulo: ", infoArticulo);
//             }
//         }
//         else
//         {
//             const infoArticuloTarifaEspecial = await schArticulosTarifaEspecial.getInfoArticuloTarifaEspecial(idArticulo);
//             if(infoArticuloTarifaEspecial)
//             {
//                 return infoArticuloTarifaEspecial;
//             }
//             else
//             {
//                 console.log("Algo pasa con infoArticulo: ", infoArticuloTarifaEspecial);
//             }
//         }
//     }
//     async addItem(idArticulo: number, idBoton: String, aPeso: Boolean, infoAPeso = null)
//     {
//         var unidades = this.udsAplicar;
//         if(this.cajaAbierta())
//         {
//             try
//             {
//                 $('#'+idBoton).attr('disabled', true);
//                 if(!aPeso) //TIPO NORMAL
//                 {
//                     let infoArticulo = await this.getInfoArticulo(idArticulo);
//                     if(infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
//                     {
//                         this.insertarArticuloCesta(infoArticulo, unidades);
//                     }
//                     else
//                     {
//                         vueToast.abrir('error', 'Este artículo tiene errores');
//                     }
//                 }
//                 else //TIPO PESO
//                 {
//                     this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, infoAPeso);
//                 }
//                 $('#'+idBoton).attr('disabled', false);
//             }
//             catch(err)
//             {
//                 console.log(err);
//                 vueToast.abrir('error', 'Error al añadir el articulo');
//                 $('#'+idBoton).attr('disabled', false);
//                 this.udsAplicar = 1;
//             }
//         }
//         else
//         {
//             vueToast.abrir('danger', 'Se requiere una caja abierta para cobrar');
//         }
//         this.udsAplicar = 1;
//     }
//     abrirModalPago()
//     {
//         // let total = 0;
//         // let cesta = this.getCesta();
//         // for(let i = 0; i < cesta.lista.length; i++)
//         // {
//         //     total += cesta.lista[i].subtotal;
//         // }
//         vueCobrar.prepararModalVenta(Number(vueCesta.getTotal), this.getArrayFichados());
//         vueCobrar.abreModal();
//     }

//     async getUltimoTicket()
//     {
//         const ultimo = await schTickets.getUltimoTicket();
//         if(ultimo.length > 0)
//         {
//             return ultimo[0]._id;
//         }
//         else
//         {
//             const info = await schParametros.getParams();

//             if(info !== null || info !== undefined)
//             {
//                 return info.ultimoTicket;
//             }
//             else
//             {
//                 vueToast('error', 'Error. Contactar con un técnico');
//                 return 0;
//             }
//         }
//     }
    
//     async crearTicket(tipo: string, totalTkrs: number)
//     {
//         let total = 0;
//         for(let i = 0; i < this.cesta.lista.length; i++)
//         {
//             total += this.cesta.lista[i].subtotal;
//         }
//         const infoTrabajador: Trabajador = this.getCurrentTrabajador();
//         const nuevoIdTicket = (await this.getUltimoTicket())+1;
        
//         var objTicket: Ticket = {
//             _id: nuevoIdTicket,
//             timestamp: Date.now(),
//             total: total,
//             lista: this.cesta.lista,
//             tipoPago: tipo,
//             idTrabajador: infoTrabajador._id,
//             tiposIva: this.cesta.tiposIva,
//             cliente: this.hayClienteSeleccionado() ? this.clienteSeleccionado.id: null,
//             infoClienteVip: {
//                 esVip : false,
//                 nif: '',
//                 nombre: '',
//                 cp: '',
//                 direccion: '',
//                 ciudad: ''
//             }
//         }   
//         if(totalTkrs > 0) {
//             total -= Number(totalTkrs);
//             this.nuevaSalidaDinero(Number(totalTkrs.toFixed(2)), `Pagat TkRs (TkRs): ${objTicket._id}`, 'TARJETA', true, objTicket._id);
//         }
        
//         if(tipo === "DEUDA")
//         {
//             objTicket.tipoPago                  = "DEUDA";
//             objTicket.infoClienteVip.nif        = this.infoClienteVip.datos.nif;       
//             objTicket.infoClienteVip.nombre     = this.infoClienteVip.datos.nombre;
//             objTicket.infoClienteVip.cp         = this.infoClienteVip.datos.cp;
//             objTicket.infoClienteVip.direccion  = this.infoClienteVip.datos.direccion;
//             objTicket.infoClienteVip.ciudad     = this.infoClienteVip.datos.Ciudad;
//             objTicket.infoClienteVip.esVip      = true;
//         }
//         else
//         {
//             if(tipo === "EFECTIVO")
//             {
//                 objTicket.tipoPago = "EFECTIVO";
//                 impresora.abrirCajon(this.parametros.tipoImpresora);
//             }
//             else
//             {
//                 if(this.esDevolucion)
//                 {
//                     objTicket.tipoPago = "DEVOLUCION";
//                 }
//                 else
//                 {
//                     if(tipo === "CONSUMO_PERSONAL")
//                     {
//                         objTicket.tipoPago = "CONSUMO_PERSONAL";
//                     }
//                     else
//                     {
//                         objTicket.tipoPago = "TARJETA";
//                     }                    
//                 }
//             }
//         }

//         if(tipo === "EFECTIVO" || tipo === "DEUDA" || tipo === "DEVOLUCION" || tipo === "CONSUMO_PERSONAL")
//         {
//             if(tipo === "DEVOLUCION")
//             {
//                 objTicket._id = Date.now();
//                 schDevoluciones.insertarDevolucion(objTicket);
//                 const paramsTicket = await schParametrosTicket.getParamsTicket();
//                 const infoClienteVip: Ticket["infoClienteVip"] = {
//                     esVip: false,
//                     nif: null,
//                     nombre: null,
//                     cp: null,
//                     direccion: null,
//                     ciudad: null
//                 };
//                 const paraImprimir = {
//                     numFactura: 0,
//                     arrayCompra: objTicket.lista,
//                     total: objTicket.total,
//                     tipoPago: objTicket.tipoPago,
//                     tiposIva: objTicket.tiposIva,
//                     cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
//                     pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
//                     nombreDependienta: this.getCurrentTrabajador().nombre,
//                     tipoImpresora: this.parametros.tipoImpresora,
//                     infoClienteVip: infoClienteVip
//                 };
//                 impresora.imprimirTicketVenta(paraImprimir);
//             }
//             else
//             {
//                 if(tipo === "CONSUMO_PERSONAL")
//                 {
//                     objTicket.total = 0;
//                     //SE ELIMINAN LAS SALIDAS PARA EL CONSUMO PERSONAL: this.nuevaSalidaDinero(0, 'Consum personal', 'CONSUMO_PERSONAL', true);
//                 }
//                 else
//                 {
//                     if(tipo === "DEUDA")
//                     {
//                         this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Deute', 'DEUDA', true);
//                     }
//                 }
//                 schTickets.insertarTicket(objTicket);
//                 schParametros.setUltimoTicket(objTicket._id);
//             }
//             this.borrarCesta();
//             vueCobrar.setEsperando(false);
//             vueCobrar.cerrarModal();
//             vueToast.abrir('success', 'Ticket creado');
//             this.quitarClienteSeleccionado();
//         }
//         else
//         {
//             if(tipo === "TARJETA")
//             {
//                 if(this.parametros.tipoDatafono === TIPO_CLEARONE && !this.datafonoForzado3G)
//                 {
//                     vueCobrar.activoEsperaDatafono();

//                     const info = {
//                         objTicket: objTicket, 
//                         nombreDependienta: infoTrabajador.nombre, 
//                         idTicket: nuevoIdTicket, 
//                         total: Number((total * 100).toFixed(2)).toString(),
//                         clearOneCliente: this.parametros.clearOneCliente,
//                         clearOneTienda: this.parametros.clearOneTienda,
//                         clearOneTpv: this.parametros.clearOneTpv
//                     };

//                     var client = new net.Socket();
//                     client.connect(8890, '127.0.0.1', function () {
//                         var ventaCliente = info.clearOneCliente;
//                         var nombreDependienta = info.nombreDependienta;
//                         var numeroTicket = info.idTicket;
//                         var tienda = info.clearOneTienda;
//                         var tpv = info.clearOneTpv;
//                         var tipoOperacion = 1; //1=> VENTA
//                         var importe = info.total; //EN CENTIMOS DE EURO
//                         var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
//                         console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
//                         client.write(venta_t);
//                     });
            
//                     client.on('error', (err)=>{
//                         console.log(err);
//                         vueCobrar.desactivoEsperaDatafono();
//                         let options = {
//                             buttons: ["&SÍ","&NO"],
//                             message: "Cambiar a datáfono 3G (manual)?"
//                         }
//                         dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
//                             if (res === 0)
//                             {
//                                 this.datafonoForzado3G = true;
//                             }            
//                         });
//                         let data = {tipo: 'error', mensaje: 'Datáfono no configurado'};
//                         vueToast.abrir(data.tipo, data.mensaje);
//                     })
//                     client.on('data', (data: any)=>{
//                         var objEnviar: objEnviarDatafonoControlRespuesta = {
//                             data: data,
//                             objTicket: info.objTicket
//                         };
//                         console.log('Recibido: ' + data);
//                         this.controlRespuestaDatafono(objEnviar);
//                         client.write('\x02ACK\x03');
//                         client.destroy();
//                     });
//                     client.on('close', function () {
//                         console.log('Conexión cerrada');
//                         client.destroy();
//                     });

//                     this.auxTotalDatafono = Number((total).toFixed(2));
//                 }
//                 else
//                 {
//                     if(this.parametros.tipoDatafono === TIPO_3G || this.datafonoForzado3G)
//                     {
//                         schTickets.insertarTicket(objTicket);
//                         schParametros.setUltimoTicket(objTicket._id);
//                         this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Targeta 3G', 'TARJETA', true, objTicket._id);
//                         /*let pagadoTarjeta = `Pagat Targeta: ${objTicket._id}`;
//                         this.nuevaSalidaDinero(Number((total).toFixed(2)), pagadoTarjeta, pagadoTarjeta, true);*/
//                         this.borrarCesta();
//                         vueToast.abrir('success', 'Ticket creado');
//                         this.quitarClienteSeleccionado();
//                         vueCobrar.setEsperando(false);
//                         vueCobrar.cerrarModal();
//                     }
//                 }
//             }
//         }
//         this.datafonoForzado3G = false;
//         this.resetEstados();
//         if(tipo != "TARJETA" || this.datafonoForzado3G)
//         {
//             vueCobrar.resetEstados();
//         }
//     }
//     limpiarDevolucion()
//     {
//         this.esDevolucion = false;
//         this.esConsumoPersonal = false;
//         vueCobrar.resetEstados();
//     }
//     getUrlPedidos()
//     {
//         var url = '';
//         if(this.parametros.database === 'Fac_Tena')
//         {
//             url = `http://silema.hiterp.com/TpvWebReposicion.asp?modo=MENU&codiBotiga=${this.parametros.codigoTienda}`;
//         }
//         return url;
//     }
//     devolucion()
//     {
//         this.desactivarConsumoPersonal();
//         this.limpiarClienteVIP();
//         this.esDevolucion = true;
//         vueCobrar.setEsDevolucion(true);
//     }
//     controlRespuestaDatafono(respuesta: objEnviarDatafonoControlRespuesta)
//     {
//         vueCobrar.desactivoEsperaDatafono();
//         if(respuesta.data[1] === 48) //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
//         {

//             this.nuevaSalidaDinero(this.auxTotalDatafono, 'Targeta', 'TARJETA', true, respuesta.objTicket._id);
//             schTickets.insertarTicket(respuesta.objTicket);
//             schParametros.setUltimoTicket(respuesta.objTicket._id);
            
//             /*var pagadoTarjeta = "Pagat Targeta: " +  respuesta.objTicket._id;
//             this.nuevaSalidaDinero(this.auxTotalDatafono, pagadoTarjeta, pagadoTarjeta, true);*/
//             this.borrarCesta();
//             vueCobrar.cerrarModal();
//             vueToast.abrir('success', 'Ticket creado');
//         }
//         else
//         {

//             vueToast.abrir('error', 'Operación DENEGADA');
//             vueCobrar.desactivoEsperaDatafono();
//             let options = {
//                 buttons: ["&SÍ","&NO"],
//                 message: "Cambiar a datáfono 3G (manual)?"
//             }
//             dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
//                 if (res === 0)
//                 {
//                     toc.datafonoForzado3G = true;
//                 }            
//             });
//             const data = {tipo: 'error', mensaje: 'Datáfono no configurado'};
//             vueToast.abrir(data.tipo, data.mensaje);
//         }
//         this.quitarClienteSeleccionado();
//     }

//     abreModalSalidaDinero()
//     {
//         $('#vueModalSalidaDinero').modal();
//     }
//     async abrirModalCaja()
//     {
//         const arrayCompletoTickets = await schTickets.getTicketsCajaActual(this.caja.inicioTime); //ipcRenderer.sendSync('get-tickets-caja-abierta', this.caja.inicioTime); //TODOS LOS TICKETS (SIN LÍMITE) DE LA CAJA ACTUAL.
//         vueCaja.setArrayTotal(arrayCompletoTickets);
//         const arrayTickets = await schTickets.getTickets();
//         vueCaja.cargarListaTickets(arrayTickets);
//         vueCaja.abreModal();
//     }
//     borrarCaja() //Configura la caja como cerrada y limpia los datos en memoria y en la bbdd
//     {
//         this.caja  = {
//             _id: "CAJA",
//             inicioTime: null,
//             finalTime: null,
//             idDependienta: null,
//             totalApertura: null,
//             totalCierre: null,
//             calaixFetZ: null,
//             descuadre: null,
//             infoExtra: {
//                 cambioInicial: null,
//                 cambioFinal: null,
//                 totalSalidas: null,
//                 totalEntradas: null,
//                 totalEnEfectivo: null,
//                 totalTarjeta: null,
//                 totalDeuda: null
//             },
//             primerTicket: null,
//             ultimoTicket: null,
//             recaudado: null,
//             nClientes: null,
//             detalleApertura: [],
//             detalleCierre: [],
//             enviado: false,
//             enTransito: false,
//             totalDatafono3G: null,
//             totalClearOne: null
//         };
//         schCajas.setInfoCaja(this.caja);
//     }
//     async cerrarCaja(total: number, detalleCierre, guardarInfoMonedas, totalDatafono3G: number, totalClearOne: number)
//     {
//         this.caja.totalCierre       = total;
//         this.caja.detalleCierre     = detalleCierre;
//         this.caja.finalTime         = Date.now();
//         this.caja.idDependienta     = this.getCurrentTrabajador()._id;
//         this.caja.totalDatafono3G   = totalDatafono3G;
//         this.caja.totalClearOne     = totalClearOne;
//         this.caja = await this.calcularDatosCaja(this.caja);

//         schMovimientos.getMovimientosRango(this.caja.inicioTime, this.caja.finalTime).then(res=>{
//             let objEmail = {
//                 caja: this.caja,
//                 nombreTienda: this.getParametros().nombreTienda,
//                 nombreDependienta: this.getCurrentTrabajador().nombre,
//                 arrayMovimientos: res //ipcRenderer.sendSync('get-rango-movimientos', {fechaInicio: this.caja.inicioTime, fechaFinal: this.caja.finalTime})
//             }
//             schSincroCajas.nuevoItemSincroCajas(this.caja);
//             email.enviarEmail(objEmail);
//             schInfoMonedas.setMonedas(guardarInfoMonedas);
//             this.borrarCaja()
//             vueCaja.cerrarModal();
//             this.iniciar();            
//         });
//     }
//     async calcularDatosCaja(unaCaja: Caja)
//     {
//         var arrayTicketsCaja = await schTickets.getTicketsIntervalo(unaCaja);
        
//         var arrayMovimientos: Movimientos[] = await schMovimientos.getMovimientosRango(unaCaja.inicioTime, unaCaja.finalTime);
//         var totalTickets = 0;
//         var nombreTrabajador = this.getCurrentTrabajador().nombre;
//         var descuadre = 0;
//         var nClientes = 0;

//         if(arrayTicketsCaja.length > 0)
//         {
//             this.caja.primerTicket = arrayTicketsCaja[0]._id;
//             this.caja.ultimoTicket = arrayTicketsCaja[arrayTicketsCaja.length-1]._id;
//         }
        
//         var nombreTienda = this.parametros.nombreTienda;
//         var fechaInicio = this.caja.inicioTime;
//         var totalTarjeta = 0;
//         var totalEnEfectivo = 0;
//         var cambioInicial = this.caja.totalApertura;
//         var cambioFinal = this.caja.totalCierre;
//         var totalSalidas = 0;
//         var totalEntradas = 0;
//         var recaudado = 0; //this.caja.totalCierre-this.caja.totalApertura + totalSalidas - totalEntradas;
//         var totalDeuda = 0;
//         for(let i = 0; i < arrayMovimientos.length; i++)
//         {
//             if(arrayMovimientos[i].tipo === TIPO_SALIDA)
//             {
//                 if(arrayMovimientos[i].tipoExtra != 'CONSUMO_PERSONAL')
//                 {
//                     totalSalidas += arrayMovimientos[i].valor;
//                 }                
//             }
//             else
//             {
//                 if(arrayMovimientos[i].tipo === TIPO_ENTRADA)
//                 {
//                     totalEntradas += arrayMovimientos[i].valor;
//                 }
//             }
//         }
//         for(let i = 0; i < arrayTicketsCaja.length; i++)
//         {
//             nClientes++;
//             totalTickets += arrayTicketsCaja[i].total;
            
//             if(arrayTicketsCaja[i].tipoPago == "TARJETA")
//             {
//                 totalTarjeta += arrayTicketsCaja[i].total;
//             }
//             else
//             {
//                 if(arrayTicketsCaja[i].tipoPago == "EFECTIVO")
//                 {
//                     recaudado += arrayTicketsCaja[i].total;
//                     totalEnEfectivo += arrayTicketsCaja[i].total;
//                 }
//                 else
//                 {
//                     if(arrayTicketsCaja[i].tipoPago == "DEUDA")
//                     {
//                         totalDeuda += arrayTicketsCaja[i].total;
//                     }
//                 }                
//             }
//         }
//         this.caja.calaixFetZ = totalTickets;
//         this.caja.infoExtra.cambioFinal = cambioFinal;
//         this.caja.infoExtra.cambioInicial = cambioInicial;
//         this.caja.infoExtra.totalSalidas = totalSalidas;
//         this.caja.infoExtra.totalEntradas = totalEntradas;
//         this.caja.infoExtra.totalEnEfectivo = totalEnEfectivo;
//         this.caja.infoExtra.totalTarjeta = totalTarjeta;
//         this.caja.infoExtra.totalDeuda = totalDeuda;

//         descuadre = cambioFinal-cambioInicial+totalSalidas-totalEntradas-totalTickets;
//         recaudado = totalTickets + descuadre - totalTarjeta - totalDeuda;
        
//         const objImpresion: objImprimirCierre = {
//             calaixFet: totalTickets,
//             nombreTrabajador: nombreTrabajador,
//             descuadre: descuadre,
//             nClientes: nClientes,
//             recaudado: recaudado,
//             arrayMovimientos: arrayMovimientos,
//             nombreTienda: nombreTienda,
//             fechaInicio: fechaInicio,
//             fechaFinal: this.caja.finalTime,
//             totalSalidas: totalSalidas,
//             totalEntradas: totalEntradas,
//             cambioInicial: cambioInicial,
//             cambioFinal: cambioFinal,
//             tipoImpresora: this.parametros.tipoImpresora,
//             totalTarjeta: totalTarjeta
//         };

//         vuePantallaCierre.setVariables(objImpresion);
//         try
//         {
//             impresora.cierreCaja(objImpresion);
//         }
//         catch(err)
//         {
//             vueToast.abrir('error', 'Impresora no detectada');
//             console.log(err);
//         }
        
//         unaCaja.descuadre = descuadre;
//         unaCaja.nClientes = nClientes;
//         unaCaja.recaudado = recaudado;

//         return unaCaja;
//     }

//     async imprimirTicket(idTicket: number)
//     {
//         const paramsTicket = await schParametrosTicket.getParamsTicket();
//         const infoTicket: Ticket = await schTickets.getInfoTicket(idTicket);
//         const infoTrabajador: Trabajador = await schTrabajadores.getTrabajadorPorId(infoTicket.idTrabajador);

//         const sendObject = {
//             numFactura: infoTicket._id,
//             arrayCompra: infoTicket.lista,
//             total: infoTicket.total,
//             tipoPago: infoTicket.tipoPago,
//             tiposIva: infoTicket.tiposIva,
//             cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
//             pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
//             nombreDependienta: infoTrabajador.nombre,
//             tipoImpresora: this.parametros.tipoImpresora,
//             infoClienteVip: infoTicket.infoClienteVip
//         };
//         impresora.imprimirTicketVenta(sendObject);
//     }
//     getPuntosCliente(idCliente: string)
//     {
//         const objEnviar = {
//             parametros: this.getParametros(),
//             idCliente: idCliente
//         }
//         socketSanPedro.emit('get-puntos-cliente', objEnviar);
//     }
//     seleccionarCliente(cliente: Cliente)
//     {
//         vueCesta.activarEstiloClienteActivo();

//         this.clienteSeleccionado = cliente;
//         this.getPuntosCliente(cliente.id);
//         var objEnviar = {
//             parametros: this.getParametros(),
//             idCliente: cliente.id
//         };

//         socketSanPedro.emit('comprobarClienteVIP', objEnviar);
//     }
//     seleccionarArticulo(producto: Articulo) {
//         let peso = (producto.esSumable) ? false : true;
//         let datosProducto = {idArticle: producto._id, idBoton: 'tecla0'};
//         if(!peso) {
//             vuePanelVentas.clickTecla(datosProducto, peso);
//         } else {
//             vueTecladoPeso.abrirModal(datosProducto.idArticle, datosProducto.idBoton);
//         }
//     }
//     hayClienteSeleccionado()
//     {
//         if(this.clienteSeleccionado !== null)
//         {
//             return true;
//         }
//         else
//         {
//             return false;
//         }
//     }
//     vipConfirmado(data)
//     {
//         this.desactivarDevolucion();
//         this.desactivarConsumoPersonal();
//         this.infoClienteVip = data;
//         this.esVIP = true;
//         vueMenuVip.abreModal();
//     }
//     peticionActivarTarifaEspecial()
//     {
//         socketSanPedro.emit('cargarPreciosVIP', { licencia: this.parametros.licencia, database: this.parametros.database, idCliente:  this.idClienteVIP});
//     }
//     limpiarClienteVIP()
//     {
//         vueCesta.limpiarEstiloClienteActivo();
//         this.infoClienteVip = null;
//         this.esVIP = false;
//         vueCobrar.limpiarClienteVip();
//         this.idClienteVIP = null;
//     }
//     convertirPuntosEnDinero(puntos: number): number
//     {
//         return Math.trunc(puntos*0.03*0.02);
//     }
//     esClienteVip()
//     {
//         if(this.esVIP)
//         {
//             return true;
//         }
//         else
//         {
//             return false;
//         }
//     }
//     async nuevoCliente(nombre, idTarjeta)
//     {
//         //ACTUALIZAR LOS CLIENTES DESDE EL SERVIDOR
        
        
//         //COMPROBAR QUE EL NOMBRE Y EL ID DE LA TARJETA NO EXISTAN
//         const res1 = await schClientes.comprobarClienteIdentico(nombre);
//         if(res1.length <= 0) {

//             const res2 = await schClientes.comprobarClienteIdenticoTarjeta(idTarjeta);
//             if(res2.length <= 0) {
//                 schClientes.crearNuevo({nombre: nombre, idTarjeta: idTarjeta, tienda: this.getParametros().codigoTienda});
//                 vueNuevoCliente.cerrarModal();
//                 vueToast.abrir('success', 'Cliente creado');
//             }
//             else {
//                 vueToast.abrir('error', 'Ya existe este código de tarjeta');
//             }
//         }
//         else {
//             vueToast.abrir('error', 'Ya existe este nombre de cliente');
//         }
//     }

//     imprimirEntrega() {
//         let licencia = this.getNumeroTresDigitos(this.getParametros().licencia);
//         axios.get(`http://dsv.hiterp.com/TpvInforma.asp?Llic=00${licencia}&Versio=6001010&Tipus=EntregasPendientes`).then(response => {
//             let data = response.data;
//             let imprimir = "";
//             let valid = false;
//             for(let i = 0; i < data.length; i++) {
//                 if(valid || (data[i-1] == "]" && data[i-2] == "a")) {
//                     valid = true;
//                     if(data[i] == "]") break;
//                     imprimir += data[i];
//                 } 
//             }
//             impresora.entregaDiaria({data: imprimir, tipoImpresora: this.parametros.tipoImpresora});
//         })
//     }

//     todoListo()
//     {
//         if(this.todoInstalado())
//         {
//             return true;
//         }
//         else
//         {
//             return false;
//         }
//         //Tal vez falten comprobaciones extra
//     }
//     abrirInstallWizard() //COMPROBADA
//     {
//         vueInstallWizard.abreModal();
//     }
//     async iniciar(): void //COMPROBADA
//     {
//         if(this.todoInstalado())
//         {
//             schArticulos.getPrecios().then(respuesta=>{
//                 vuePanelVentas.cargarPrecios(respuesta);
//             });
//             // ipcRenderer.send('get-precios-tarifa-especial');
            
//             $('.modal').modal('hide');
//             vueInfoFooter.getParametros();
//             ipcRenderer.send('buscar-fichados'); //Este comprueba si hay licencia (también)
            
//             const infoPromociones = await schPromociones.getPromociones();
//             if(infoPromociones.length > 0)
//             {
//                 this.promociones = infoPromociones;
//             }
//             else
//             {
//                 this.promociones = [];
//             }
    
//             schMenus.getMenus().then(res=>{
//                 vuePanelVentas.cargarMenus(res);
//             });

//             const respuesta = await schCestas.getUnaCesta();
//             if(respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null)
//             {
//                 this.setCesta(respuesta);
//             }
//             else
//             {
//                 this.setCesta(this.crearCestaVacia());
//             }
//         }
//         else
//         {
//             this.abrirInstallWizard();
//         }

//     }
// }
// export {TocGame};