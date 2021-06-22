import {socketSanPedro, ioToc} from "../../../server";
import {parametros} from "../../clases/Parametros";
import * as schParametros from "../../componentes/schemas/parametros";
import * as schTrabajadores from "../../componentes/schemas/trabajadores";
import * as schArticulos from "../../componentes/schemas/articulos";
import * as schClientes from "../../componentes/schemas/clientes";
import * as schFamilias from "../../componentes/schemas/familias";
import * as schPromociones from "../../componentes/schemas/promociones";
import * as schParamsTicket from "../../componentes/schemas/parametrosTicket";
import * as schMenus from "../../componentes/schemas/menus";
import * as schTeclas from "../../componentes/schemas/teclas";

socketSanPedro.on('install-licencia', (data) => {
    console.log("traza 1");
    if (!data.error) {
        console.log("traza 2");
        const datosQueYaEstabanGuardados = parametros.getParametros();
        const misParams: Parametros = {
            _id: 'PARAMETROS',
            licencia: data.licencia,
            codigoTienda: data.codigoTienda,
            database: data.database,
            nombreEmpresa: data.nombreEmpresa,
            nombreTienda: data.nombreTienda,
            tipoImpresora: datosQueYaEstabanGuardados.tipoImpresora,
            impresoraCafeteria: datosQueYaEstabanGuardados.impresoraCafeteria,
            tipoDatafono: datosQueYaEstabanGuardados.tipoDatafono,
            botonesConPrecios: data.botonesConPrecios,
            prohibirBuscarArticulos: data.prohibirBuscarArticulos,
            ultimoTicket: data.ultimoTicket
        };

        if(parametros.checkParametrosOK(misParams)){
            console.log("traza 3");
            schParametros.insertParams(misParams)
            parametros.setParametros(misParams);
            const params2 = parametros.getParametros();
            socketSanPedro.emit('cargar-todo', { licencia: params2.licencia, database: params2.database });
        } else {
            console.log("LOS DATOS NO ESTÁN BIEN CONFIGURADOS DESDE HIT SYSTEMS");
        };
    }
    else {
        console.log("SAN PEDRO: ", data.infoError);
    }
});

socketSanPedro.on('cargar-todo', async (data) => {
    console.log("traza 4");
    await schTrabajadores.insertarTrabajadores(data.dependentes);
    await schArticulos.insertarArticulos(data.articulos);
    await schClientes.insertarClientes(data.clientes);
    await schFamilias.insertarFamilias(data.familias);
    await schPromociones.insertarPromociones(data.promociones);
    await schParamsTicket.insertarParametrosTicket(data.parametrosTicket);
    await schMenus.insertarMenus(data.menus);
    await schTeclas.insertarTeclasMain(data.teclas);

    console.log("AVISAR QUE TODO CORRECTO Y RECARGAR TOC GAME FRONTEND");
    ioToc.emit("finalDescargarAllData");
});