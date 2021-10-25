import { Controller, Post, Query, Body } from '@nestjs/common';
import { menusInstance } from './menus.clase';

@Controller('menus')
export class MenusController {
    @Post('clickMenu')
    clickMenu(@Body() params) {
        if (menusInstance.getBloqueado() == false) {
            menusInstance.setBloqueado(true);
            return menusInstance.clickMenu(params.nombreMenu).then((res) => {
                menusInstance.setBloqueado(false);
                return {
                    bloqueado: false,
                    resultado: res
                };
            }).catch((err) => {
                menusInstance.setBloqueado(false);
                return {
                    bloqueado: false,
                    error: err
                }
            });
        } else {
            return {
                bloqueado: true
            }
        }
    }

    @Post('getMenus')
    getMenus() {
        return menusInstance.getMenus().then((resultado) => {
            if(menusInstance.getBloqueado() == false) {
                return {bloqueado: false, resultado: resultado};
            }
            else {
                return {bloqueado: true};
            }        
        });
    }
}
