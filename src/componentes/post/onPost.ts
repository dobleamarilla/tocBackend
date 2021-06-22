import {app} from '../../../server';
import {teclasMenus} from "../../clases/TeclasMenus";
import {getUnaCesta} from "../schemas/cestas";
import {articulos} from "../../clases/Articulos";
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

app.post("/getMenus", (req, res)=>{
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
    getUnaCesta().then(resultado=>{
        res.json(resultado); 
    });
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