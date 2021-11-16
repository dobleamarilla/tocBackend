import { Controller, Post, Body } from '@nestjs/common';
import { clienteInstance } from '../clientes/clientes.clase';
import { articulosInstance } from './articulos.clase';

@Controller('articulos')
export class ArticulosController {
    @Post('getArticulo')
    getArticulo(@Body() params) {
        const lol = articulosInstance.getInfoArticulo(params.idArticulo);
        return lol;
    }

    @Post('setEstadoTarifaVIP')
    setEstadoTarifaEspecial(@Body() params) {
        if (params.nuevoEstado != undefined && params.nuevoEstado != null) {
            articulosInstance.setEstadoTarifaEspecial(params.nuevoEstado);
            clienteInstance.setEstadoClienteVIP(false);
            return { error: false };
        } else {
            return { error: true, mensaje: 'Backend: Faltan datos en articulos/setEstadoTarifaVIP' };
        }
    }
}
