"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const TeclasMenus_1 = require("../../clases/TeclasMenus");
const funciones_1 = require("../../funciones/funciones");
const Cestas_1 = require("../../clases/Cestas");
const Parametros_1 = require("../../clases/Parametros");
const server_2 = require("../../../server");
server_1.app.post("/clickmenu", (req, res) => {
    if (TeclasMenus_1.teclasMenus.getStopNecesario() == false) {
        TeclasMenus_1.teclasMenus.clickMenu(req.body.nombreMenu).then(resultado => {
            res.json({ bloqueado: false, resultado: resultado });
        }).catch(err => {
            res.json({ bloqueado: false, okey: false, error: err });
        });
    }
    else {
        res.json({ bloqueado: true, error: false });
    }
});
server_1.app.post("/todoInstalado", (req, res) => {
    if (Parametros_1.parametros.todoInstalado()) {
        res.json({ todoInstalado: true, config: Parametros_1.parametros.getParametros() });
    }
    else {
        res.json({ todoInstalado: false });
    }
});
server_1.app.post("/pedirDatosLicencia", (req, res) => {
    if (!Parametros_1.parametros.todoInstalado()) {
        Parametros_1.parametros.setParametros(req.body.parametros);
        server_2.socketSanPedro.emit('install-licencia', { numLicencia: Number(req.body.parametros.licencia), password: req.body.parametros.password });
    }
    else {
        res.json({ error: true, mensaje: 'Ya existe una licencia configurada' });
    }
});
server_1.app.post("/clickTeclaArticulo", (req, res) => {
    if (TeclasMenus_1.teclasMenus.getStopNecesario() == false) {
        Cestas_1.cestas.addItem(req.body.idArticulo, req.body.idBoton, req.body.peso, req.body.infoPeso).then(cesta => {
            res.json({ error: false, bloqueado: false, cesta: cesta });
            console.log('Estoy bien hasta aquí Eze');
        });
    }
    else {
        res.json({ bloqueado: true, error: false });
    }
});
server_1.app.post("/setUnidadesAplicar", (req, res) => {
    Cestas_1.cestas.setUnidadesAplicar(req.body.unidades);
    res.json({ okey: true });
});
server_1.app.post("/convertirPuntosEnDinero", (req, res) => {
    res.json({ okey: true, dinero: funciones_1.convertirPuntosEnDinero(req.body.puntosClienteActivo) });
});
server_1.app.post("/borrarCesta", (req, res) => {
    if (Cestas_1.cestas.getCurrentId() === req.body.id) { // Es la cesta actual, el current se reemplazará por una guardada o una nueva (si no hay)
        console.log('Voy a eliminar la ceta: ', req.body.id);
        Cestas_1.cestas.reiniciarCesta(req.body.id).then((cestaNueva) => {
            res.json({
                okey: true,
                cestaNueva: cestaNueva,
            });
        });
    }
    else { // Es una cesta guardada. No hay que modificar el current.
    }
});
server_1.app.post('/getMenus', (req, res) => {
    TeclasMenus_1.teclasMenus.getMenus().then(resultado => {
        if (TeclasMenus_1.teclasMenus.getStopNecesario() == false) {
            res.json({ bloqueado: false, resultado: resultado });
        }
        else {
            res.json({ bloqueado: true });
        }
    });
});
server_1.app.post("/getCesta", (req, res) => {
    res.json(Cestas_1.cestas.getCurrentCesta());
});
// import {concha, reset, modificar} from '../toc/general';
// app.post("/fulana", ()=>{
//     console.log("El numero que hay ahora es: ", concha.getNumero(), concha.getNombre());
// });
// app.post("/destruir", ()=>{
//     reset();
// });
// app.post("/update", (req, res)=>{
//     modificar(req.body.nombre);
// });
