import { Controller, Post, Body } from '@nestjs/common';
import { clienteInstance } from './clientes.clase';

@Controller('clientes')
export class ClientesController {
    @Post('buscar')
    buscarCliente(@Body() params) {
        return clienteInstance.buscar(params.busqueda);
    }
}
