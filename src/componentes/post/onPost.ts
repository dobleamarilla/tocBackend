import {app} from '../../../server';
import {teclasMenus} from "../../clases/TeclasMenus";
import {getUnaCesta, borrarCesta} from "../schemas/cestas";
import {articulos} from "../../clases/Articulos";
import { convertirPuntosEnDinero } from '../../funciones/funciones';
import {cestas} from "../../clases/Cestas";
import {parametros} from "../../clases/Parametros";
import {socketSanPedro} from "../../../server";

app.post("/clickmenu", (req, res)=>{
    if(teclasMenus.getStopNecesario() == false){
        teclasMenus.clickMenu(req.body.nombreMenu).then(resultado=>{
            res.json({bloqueado: false, resultado: resultado});
        }).catch(err=>{
            res.json({bloqueado: false, okey: false, error: err});
        })
    }
    else {
        res.json({bloqueado: true, error: false});
    }
});

app.post("/todoInstalado", (req, res)=>{
    if(parametros.todoInstalado()){
        res.json({todoInstalado: true, config: parametros.getParametros()});
    } 
    else {
        res.json({todoInstalado: false});
    }
});

app.post("/pedirDatosLicencia", (req, res)=>{
    if(!parametros.todoInstalado()){
        parametros.setParametros(req.body.parametros);
        socketSanPedro.emit('install-licencia', {numLicencia: Number(req.body.parametros.licencia), password: req.body.parametros.password});
    } 
    else {
        res.json({error: true, mensaje: 'Ya existe una licencia configurada'});
    }
});

app.post("/clickTeclaArticulo", (req, res)=>{
    if(teclasMenus.getStopNecesario() == false){
        cestas.addItem(req.body.idArticulo, req.body.idBoton, req.body.peso, req.body.infoPeso).then(cesta=>{
            res.json({error: false, bloqueado: false, cesta: cesta});
            console.log('Estoy bien hasta aquí Eze')
        });
    }
    else {
        res.json({bloqueado: true, error: false});
    } 
});
app.post("/setUnidadesAplicar", (req, res)=>{
    cestas.setUnidadesAplicar(req.body.unidades);
    res.json({okey: true});
});
app.post("/convertirPuntosEnDinero", (req, res)=>{
    res.json({okey: true, dinero: convertirPuntosEnDinero(req.body.puntosClienteActivo)});
});
app.post("/borrarCesta", (req, res) => {
    if(cestas.getCurrentId() === req.body.id) { // Es la cesta actual, el current se reemplazará por una guardada o una nueva (si no hay)
        console.log('Voy a eliminar la ceta: ', req.body.id);
        cestas.reiniciarCesta(req.body.id).then((cestaNueva) => {
            res.json({
                okey: true,
                cestaNueva: cestaNueva,
            });
        });
    } else { // Es una cesta guardada. No hay que modificar el current.
        
    }
});

app.post('/getMenus', (req, res) => {
    teclasMenus.getMenus().then(resultado=>{
        if(teclasMenus.getStopNecesario() == false){
            res.json({bloqueado: false, resultado: resultado});
        }
        else {
            res.json({bloqueado: true});
        }        
    });
});
app.post("/getCesta", (req, res)=>{
    res.json(cestas.getCurrentCesta()); 
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