"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarVisor = void 0;
var escpos = require('escpos');
var exec = require('child_process').exec;
var os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
escpos.Screen = require('escpos-screen');
function mostrarVisor(data) {
    var eur = String.fromCharCode(128);
    var limitNombre = 0;
    var lengthTotal = '';
    var datosExtra = '';
    if (data.total !== undefined) {
        lengthTotal = (data.total).toString();
        if (lengthTotal.length == 1)
            limitNombre = 17;
        else if (lengthTotal.length == 2)
            limitNombre = 16;
        else if (lengthTotal.length == 3)
            limitNombre = 15;
        else if (lengthTotal.length == 4)
            limitNombre = 14;
        else if (lengthTotal.length == 5)
            limitNombre = 13;
        else if (lengthTotal.length == 6)
            limitNombre = 12;
        else if (lengthTotal.length == 7)
            limitNombre = 11;
        datosExtra = data.dependienta.substring(0, limitNombre) + " " + data.total + eur;
    }
    if (datosExtra.length <= 2) {
        datosExtra = "";
        eur = "";
    }
    // Limito el texto a 14, ya que la línea completa tiene 20 espacios. (1-14 -> artículo, 15 -> espacio en blanco, 16-20 -> precio)
    data.texto = datosExtra + "" + data.texto.substring(0, 14);
    data.texto += " " + data.precio + eur;
    try {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        //var device = new escpos.USB('067b','2303');
        var device = new escpos.Serial('/dev/ttyUSB0', {
            baudRate: 9600,
            stopBit: 2
        });
        var options = { encoding: "ISO-8859-1" };
        var printer = new escpos.Screen(device, options);
        device.open(function () {
            printer
                // Espacios en blanco para limpiar el visor y volver a mostrar los datos en el sitio correcto
                //.text(stringVacia)
                .clear()
                //.moveUp()
                // Información del artículo (artículo + precio)
                .text(data.texto)
                //.moveDown()
                //.text(datosExtra)
                //.text(datosExtra)
                .close();
        });
    }
    catch (err) {
        console.log("Error: ", err);
        //errorImpresora(err, event);
    }
}
exports.mostrarVisor = mostrarVisor;
