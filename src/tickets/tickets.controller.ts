import { Controller, Post, Body, Query } from '@nestjs/common';
import { ticketsInstance } from './tickets.clase';
import { cajaInstance } from '../caja/caja.clase';

@Controller('tickets')
export class TicketsController {

    @Post('getTicketsIntervalo')
    getTicketsIntervalo(@Query() params) {
        return cajaInstance.getInfoCaja().then((infoCaja) => {
            if (infoCaja != null) {
                return ticketsInstance.getTicketsIntervalo(infoCaja.inicioTime, Date.now());
            } else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    @Post('crearTicketEfectivo')
    crearTicketEfectivo(@Body() params) {
        return ticketsInstance.crearTicketEfectivo(params.total, params.idCesta).then((res) => {
            if (res) {
                return {
                    error: false
                }
            } else {
                return {
                    error: true
                }
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true
            }
        });
    }

    @Post('crearTicketDatafono3G')
    crearTicketDatafono3G(@Body() params) {
        return ticketsInstance.crearTicketDatafono3G(params.total, params.idCesta).then((res) => {
            if (res) {
                console.log('ENTRO EN ERROR = false');
                return {
                    error: false
                }
            } else {
                console.log('ENTRO EN ERROR = true');
                return {
                    error: true
                }
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true
            }
        });
    }

    @Post('crearTicketDatafonoClearOne')
    crearTicketDatafonoClearOne(@Body() params) {
        return ticketsInstance.crearTicketDatafono3G(params.total, params.idCesta).then((res) => {
            if (res) {
                return {
                    error: false
                }
            } else {
                return {
                    error: true
                }
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true
            }
        });
    }
}
