"use strict";
// var escpos          = require('escpos');
// var exec            = require('child_process').exec;
// var os              = require('os');
// escpos.USB = require('escpos-usb');
// escpos.Serial = require('escpos-serialport');
// escpos.Screen = require('escpos-screen');
// var articulos = require('./schemas/articulos');
// const TIPO_ENTRADA_DINERO = 'ENTRADA';
// const TIPO_SALIDA_DINERO = 'SALIDA';
// function dateToString2(fecha)
// {
//     var fechaFinal = null;
//     if(typeof fecha === 'string' || typeof fecha === 'number')
//     {
//         fechaFinal = new Date(fecha);
//     }
//     let finalYear = `${fechaFinal.getFullYear()}`;
//     let finalMonth = `${fechaFinal.getMonth() + 1}`;
//     let finalDay = `${fechaFinal.getDate()}`;
//     let finalHours = `${fechaFinal.getHours()}`;
//     let finalMinutes = `${fechaFinal.getMinutes()}`;
//     let finalSeconds = `${fechaFinal.getSeconds()}`;
//     if (finalMonth.length === 1) {
//         finalMonth = '0' + finalMonth;
//     }
//     if (finalDay.length === 1) {
//         finalDay = '0' + finalDay;
//     }
//     if (finalHours.length === 1) {
//         finalHours = '0' + finalHours;
//     }
//     if (finalMinutes.length === 1) {
//         finalMinutes = '0' + finalMinutes;
//     }
//     if (finalSeconds.length === 1) {
//         finalSeconds = '0' + finalSeconds;
//     }
//     return `${finalYear}-${finalMonth}-${finalDay} ${finalHours}:${finalMinutes}:${finalSeconds}`;
// }
// export async function imprimirTicketVenta(args: objImprimirVenta)
// {
//     try 
//     {
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         if(args.tipoImpresora === 'USB')
//         {
//             var device = new escpos.USB('0x4B8', '0x202'); //USB
//         }
//         else
//         {
//             if(args.tipoImpresora === 'SERIE')
//             {
//                 var device = new escpos.Serial('/dev/ttyS0', {
//                     baudRate: 115000,
//                     stopBit: 2
//                   });
//             }
//         }
//         var printer = new escpos.Printer(device);
//         var detalles = '';
//         var pagoTarjeta = '';
//         var detalleClienteVip = '';
//         if(args.infoClienteVip.esVip)
//         {
//             detalleClienteVip = `Nom: ${args.infoClienteVip.nombre}\nNIF: ${args.infoClienteVip.nif}\nCP: ${args.infoClienteVip.cp}\nCiutat: ${args.infoClienteVip.ciudad}\nAdr: ${args.infoClienteVip.direccion}\n`;
//         }
//         for (let i = 0; i < args.arrayCompra.length; i++) 
//         {
//             if(args.arrayCompra[i].promocion.esPromo)
//             {
//                 let nombrePrincipal = await articulos.getNombreArticulo(args.arrayCompra[i].promocion.infoPromo.idPrincipal);
//                 nombrePrincipal = "Oferta " + nombrePrincipal;
//                 while (nombrePrincipal.length < 20) 
//                 {
//                     nombrePrincipal += ' ';
//                 }
//                 detalles += `${args.arrayCompra[i].unidades*args.arrayCompra[i].promocion.infoPromo.cantidadPrincipal}     ${nombrePrincipal.slice(0, 20)}       ${args.arrayCompra[i].promocion.infoPromo.precioRealPrincipal.toFixed(2)}\n`;
//                 if(args.arrayCompra[i].promocion.infoPromo.cantidadSecundario > 0)
//                 {
//                     let nombreSecundario = await articulos.getNombreArticulo(args.arrayCompra[i].promocion.infoPromo.idSecundario);
//                     nombreSecundario = "Oferta " + nombreSecundario;
//                     while (nombreSecundario.length < 20) 
//                     {
//                         nombreSecundario += ' ';
//                     }
//                     detalles += `${args.arrayCompra[i].unidades*args.arrayCompra[i].promocion.infoPromo.cantidadSecundario}     ${nombreSecundario.slice(0, 20)}       ${args.arrayCompra[i].promocion.infoPromo.precioRealSecundario.toFixed(2)}\n`;
//                 }
//             }
//             else
//             {
//                 if (args.arrayCompra[i].nombre.length < 20) 
//                 {
//                     while(args.arrayCompra[i].nombre.length < 20) 
//                     {
//                         args.arrayCompra[i].nombre += ' ';
//                     }
//                 }
//                 detalles += `${args.arrayCompra[i].unidades}     ${args.arrayCompra[i].nombre.slice(0, 20)}       ${args.arrayCompra[i].subtotal.toFixed(2)}\n`;
//             }
//         }
//         var fecha = new Date();
//         if (args.tipoPago == "TARJETA") 
//         {
//             pagoTarjeta = '----------- PAGADO CON TARJETA ---------\n';
//         }
//         var pagoDevolucion: string = '';
//         if(args.tipoPago == "DEVOLUCION")
//         {
//             pagoDevolucion = '-- ES DEVOLUCION --\n';
//         }
//         var detalleIva4 = '';
//         var detalleIva10 = '';
//         var detalleIva21 = '';
//         var detalleIva = '';
//         if (args.tiposIva.importe1 > 0) 
//         {
//             detalleIva4 = `${args.tiposIva.base1.toFixed(2)}        4%: ${args.tiposIva.valorIva1.toFixed(2)}      ${args.tiposIva.importe1.toFixed(2)}\n`;
//         }
//         if (args.tiposIva.importe2 > 0) 
//         {
//             detalleIva10 = `${args.tiposIva.base2.toFixed(2)}        10%: ${args.tiposIva.valorIva2.toFixed(2)}      ${args.tiposIva.importe2.toFixed(2)}\n`;
//         }
//         if (args.tiposIva.importe3 > 0) 
//         {
//             detalleIva21 = `${args.tiposIva.base3.toFixed(2)}       21%: ${args.tiposIva.valorIva3.toFixed(2)}      ${args.tiposIva.importe3.toFixed(2)}\n`;
//         }
//         detalleIva = detalleIva4 + detalleIva10 + detalleIva21;
//         var infoConsumoPersonal = '';
//         if(args.tipoPago == "CONSUMO_PERSONAL")
//         {
//             infoConsumoPersonal = '---------------- Dte. 100% --------------';
//             detalleIva = '';
//         }
//         device.open(function () 
//         {
//             printer
//                 .encode('latin1')
//                 .font('a')
//                 .style('b')
//                 .size(0, 0)
//                 .text(args.cabecera)
//                 .text(`Data: ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}  ${(fecha.getHours()<10?'0':'') + fecha.getHours()}:${(fecha.getMinutes()<10?'0':'') + fecha.getMinutes()}`)
//                 .text('Factura simplificada N: ' + args.numFactura)
//                 .text('Ates per: ' + args.nombreDependienta)
//                 .text(detalleClienteVip)
//                 .control('LF')
//                 .control('LF')
//                 .control('LF')
//                 .control('LF')
//                 .text('Quantitat      Article        Import (EUR)')
//                 .text('-----------------------------------------')
//                 .align('LT')
//                 .text(detalles)
//                 .text(pagoTarjeta)
//                 .text(infoConsumoPersonal)
//                 .size(1, 1)
//                 .text(pagoDevolucion)
//                 .text('TOTAL: ' + args.total.toFixed(2) + ' EUR \n')
//                 .size(0, 0)
//                 .align('CT')
//                 .text('Base IVA         IVA         IMPORT')
//                 .text(detalleIva)
//                 .text('-- ES COPIA --')
//                 .text(args.pie)
//                 .control('LF')
//                 .control('LF')
//                 .control('LF')
//                 .cut('PAPER_FULL_CUT')
//                 .close()
//         });
//     }
//     catch (err) 
//     {
//         errorImpresora(err, event);
//     }
// }
// export function salidaDinero(args: objImprimirSalida)
// {
//     try 
//     {
//         const fecha = dateToString2(args.fecha);
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         if(args.tipoImpresora === 'USB')
//         {
//             var device = new escpos.USB('0x4B8', '0x202'); //USB
//         }
//         else
//         {
//             if(args.tipoImpresora === 'SERIE')
//             {
//                 var device = new escpos.Serial('/dev/ttyS0', {
//                     baudRate: 115000,
//                     stopBit: 2
//                   })
//             }
//         }
//         var options = { encoding: "GB18030" };
//         var printer = new escpos.Printer(device, options);
//         device.open(function () 
//         {
//             printer
//                 .font('a')
//                 .style('b')
//                 .align('CT')
//                 .size(0, 0)
//                 .text(args.nombreTienda)
//                 .text(fecha)
//                 .text("Dependienta: " + args.nombreDependienta)
//                 .text("Retirada efectivo: " + args.totalRetirado)
//                 .size(1, 1)
//                 .text(args.totalRetirado)
//                 .size(0, 0)
//                 .text("Concepto")
//                 .size(1, 1)
//                 .text(args.concepto)
//                 .text('')
//                 .barcode(args.codigoBarras.slice(0, 12), "EAN13", 4)
//                 .text('')
//                 .text('')
//                 .text('')
//                 .cut()
//                 .close()
//         });
//     }
//     catch (err) 
//     {
//         errorImpresora(err, event);
//     }
// }
// export function entregaDiaria(args: objImprimirEntrega) {//data, tipoImpresora) {
//     try {
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         if(args.tipoImpresora === 'USB') {
//             var device = new escpos.USB('0x4B8', '0x202'); //USB
//         }
//         else {
//             if(args.tipoImpresora === 'SERIE') {
//                 var device = new escpos.Serial('/dev/ttyS0', {
//                     baudRate: 115000,
//                     stopBit: 2
//                   })
//             }
//         }
//         var options = { encoding: "GB18030" };
//         var printer = new escpos.Printer(device, options);
//         device.open(function (){
//             printer
//                 .font('a')
//                 .style('b')
//                 .align('CT')
//                 .size(0, 0)
//                 .text(args.data)
//                 .text('')
//                 .text('')
//                 .text('')
//                 .cut()
//                 .close()
//         });
//     }
//     catch (err) {
//         errorImpresora(err, event);
//     }
// }
// export function entradaDinero(args: objImprimirEntrada)//totalIngresado, cajaActual, fecha, nombreDependienta, nombreTienda) 
// {
//     try 
//     {
//         const fecha = dateToString2(args.fecha);
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         var device = new escpos.USB('0x4B8', '0x202'); //USB
//         //  var device = new escpos.Serial('/dev/ttyS0', {
//         //      baudRate: 115000,
//         //      stopBit: 2
//         //  }) //SERIE
//         var options = { encoding: "GB18030" };
//         var printer = new escpos.Printer(device, options);
//         device.open(function () 
//         {
//             printer
//                 .font('a')
//                 .style('b')
//                 .align('CT')
//                 .size(0, 0)
//                 .text(args.nombreTienda)
//                 .text(fecha)
//                 .text("Dependienta: " + args.nombreDependienta)
//                 .text("Ingreso efectivo: " + args.totalIngresado)
//                 .size(1, 1)
//                 .text(args.totalIngresado)
//                 .size(0, 0)
//                 .text('')
//                 .size(1, 1)
//                 .barcode('993350032967', "EAN13", 4)
//                 .text('')
//                 .text('')
//                 .text('')
//                 .cut()
//                 .close()
//         });
//     }
//     catch (err) 
//     {
//         errorImpresora(err, event);
//     }
// }
// export function abrirCajon(tipoImpresora: string) 
// {
//     try 
//     {
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         if(tipoImpresora === 'USB')
//         {
//             var device = new escpos.USB('0x4B8', '0x202'); //USB
//         }
//         else
//         {
//             if(tipoImpresora === 'SERIE')
//             {
//                 var device = new escpos.Serial('/dev/ttyS0', {
//                     baudRate: 115000,
//                     stopBit: 2
//                   });
//             }
//         }
//         var printer = new escpos.Printer(device);
//         device.open(function () 
//         {
//             printer
//                 .cashdraw(2)
//                 .close()
//         });
//     }
//     catch (err) 
//     {
//         errorCajon(err, event);
//     }
// }
// export function cierreCaja(args: objImprimirCierre) {
// {
//     try 
//     {
//         var fechaInicio = new Date(args.fechaInicio);
//         var fechaFinal = new Date(args.fechaFinal);
//         var sumaTarjetas = 0;
//         var textoMovimientos = '';
//         for (let i = 0; i < args.arrayMovimientos.length; i++) 
//         {
//             var auxFecha = new Date(args.arrayMovimientos[i]._id);
//             if (args.arrayMovimientos[i].tipo === TIPO_SALIDA_DINERO) 
//             {
//                 if(args.arrayMovimientos[i].concepto == 'Targeta' || args.arrayMovimientos[i].concepto == 'Targeta 3G')
//                 {
//                     sumaTarjetas += args.arrayMovimientos[i].valor;
//                 }
//                 else
//                 {
//                     textoMovimientos += `${i + 1}: Salida:\n           Cantidad: -${args.arrayMovimientos[i].valor.toFixed(2)}\n           Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n           Concepto: ${args.arrayMovimientos[i].concepto}\n`;
//                 }
//             }
//             if (args.arrayMovimientos[i].tipo === TIPO_ENTRADA_DINERO) 
//             {
//                 textoMovimientos += `${i + 1}: Entrada:\n            Cantidad: +${args.arrayMovimientos[i].valor.toFixed(2)}\n            Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n            Concepto: ${args.arrayMovimientos[i].concepto}\n`;
//             }
//         }
//         textoMovimientos = `\nTotal targeta:      ${sumaTarjetas.toFixed(2)}\n` + textoMovimientos;
//         exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         if(args.tipoImpresora === 'USB')
//         {
//             var device = new escpos.USB('0x4B8', '0x202'); //USB
//         }
//         else
//         {
//             if(args.tipoImpresora === 'SERIE')
//             {
//                 var device = new escpos.Serial('/dev/ttyS0', {
//                     baudRate: 115000,
//                     stopBit: 2
//                   })
//             }
//         }
//         var options = { encoding: "ISO-8859-15" }; //"GB18030" };
//         var printer = new escpos.Printer(device, options);
//         let mesInicial = fechaInicio.getMonth()+1;
//         let mesFinal = fechaFinal.getMonth()+1;
//         device.open(function () 
//         {
//             printer
//                 .font('a')
//                 .style('b')
//                 .align('CT')
//                 .size(1, 1)
//                 .text('BOTIGA : ' + args.nombreTienda)
//                 .size(0, 0)
//                 .text('Resum caixa')
//                 .text('')
//                 .align('LT')
//                 .text('Resp.   : ' + args.nombreTrabajador)
//                 .text(`Inici: ${fechaInicio.getDate()}-${mesInicial}-${fechaInicio.getFullYear()} ${(fechaInicio.getHours()<10?'0':'') + fechaInicio.getHours()}:${(fechaInicio.getMinutes()<10?'0':'') + fechaInicio.getMinutes()}`)
//                 .text(`Final: ${fechaFinal.getDate()}-${mesFinal}-${fechaFinal.getFullYear()} ${(fechaFinal.getHours()<10?'0':'') + fechaFinal.getHours()}:${(fechaFinal.getMinutes()<10?'0':'') + fechaFinal.getMinutes()}`)
//                 .text('')
//                 .size(0, 1)
//                 .text('Calaix fet       :      ' + args.calaixFet.toFixed(2))
//                 .text('Descuadre        :      ' + args.descuadre.toFixed(2))
//                 .text('Clients atesos   :      ' + args.nClientes)
//                 .text('Recaudat         :      ' + args.recaudado.toFixed(2))
//                 .text('Canvi inicial    :      ' + args.cambioInicial.toFixed(2))
//                 .text('Canvi final      :      ' + args.cambioFinal.toFixed(2))
//                 .text('')
//                 .size(0, 0)
//                 .text('Moviments de caixa')
//                 .text('')
//                 .text('')
//                 .text(textoMovimientos)
//                 .text('')
//                 .cut()
//                 .close()
//         });
//     }
//     catch (err) 
//     {
//         errorImpresora(err, event);
//     }
// }
// function errorImpresora(err, event) 
// {
//     let fecha = new Date();
//     console.log(`${fecha.toLocaleDateString()} - ${fecha.toLocaleTimeString} -> No se encuentra la impresora`);
//     console.log(err);
//     event.sender.send('falloImpresora', 'La impresora no está configurada');
//     if (os.platform() === 'win32') 
//     {
//     }
//     else {
//         if (os.platform() === 'linux') 
//         {
//             exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         }
//     }
// }
// function errorCajon(err, event) 
// {
//     console.log("No al abrir cajón");
//     console.log(err);
//     event.sender.send('falloImpresora', 'Error al abrir cajón');
//     if (os.platform() === 'win32') 
//     {
//     }
//     else 
//     {
//         if (os.platform() === 'linux') 
//         {
//             exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
//         }
//     }
// }
