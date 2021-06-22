"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const Parametros_1 = require("../../clases/Parametros");
const schParametros = __importStar(require("../../componentes/schemas/parametros"));
const schTrabajadores = __importStar(require("../../componentes/schemas/trabajadores"));
const schArticulos = __importStar(require("../../componentes/schemas/articulos"));
const schClientes = __importStar(require("../../componentes/schemas/clientes"));
const schFamilias = __importStar(require("../../componentes/schemas/familias"));
const schPromociones = __importStar(require("../../componentes/schemas/promociones"));
const schParamsTicket = __importStar(require("../../componentes/schemas/parametrosTicket"));
const schMenus = __importStar(require("../../componentes/schemas/menus"));
const schTeclas = __importStar(require("../../componentes/schemas/teclas"));
server_1.socketSanPedro.on('install-licencia', (data) => {
    console.log("traza 1");
    if (!data.error) {
        console.log("traza 2");
        const datosQueYaEstabanGuardados = Parametros_1.parametros.getParametros();
        const misParams = {
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
        if (Parametros_1.parametros.checkParametrosOK(misParams)) {
            console.log("traza 3");
            schParametros.insertParams(misParams);
            Parametros_1.parametros.setParametros(misParams);
            const params2 = Parametros_1.parametros.getParametros();
            server_1.socketSanPedro.emit('cargar-todo', { licencia: params2.licencia, database: params2.database });
        }
        else {
            console.log("LOS DATOS NO ESTÁN BIEN CONFIGURADOS DESDE HIT SYSTEMS");
        }
        ;
    }
    else {
        console.log("SAN PEDRO: ", data.infoError);
    }
});
server_1.socketSanPedro.on('cargar-todo', (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("traza 4");
    yield schTrabajadores.insertarTrabajadores(data.dependentes);
    yield schArticulos.insertarArticulos(data.articulos);
    yield schClientes.insertarClientes(data.clientes);
    yield schFamilias.insertarFamilias(data.familias);
    yield schPromociones.insertarPromociones(data.promociones);
    yield schParamsTicket.insertarParametrosTicket(data.parametrosTicket);
    yield schMenus.insertarMenus(data.menus);
    yield schTeclas.insertarTeclasMain(data.teclas);
    console.log("AVISAR QUE TODO CORRECTO Y RECARGAR TOC GAME FRONTEND");
    server_1.ioToc.emit("finalDescargarAllData");
}));
