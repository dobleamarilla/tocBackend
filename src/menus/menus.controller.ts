import { Controller, Post, Query, Body } from '@nestjs/common';
import { menusInstance } from './menus.clase';

@Controller('menus')
export class MenusController {
    @Post('clickMenu')
    clickMenu(@Body() params) {
        if (menusInstance.getStopNecesario() == false) {
            return menusInstance.clickMenu(params.nombreMenu).then((res) => {
                return {
                    bloqueado: false,
                    resultado: res
                };
            }).catch((err) => {
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
            if(menusInstance.getStopNecesario() == false) {
                return {bloqueado: false, resultado: resultado};
            }
            else {
                return {bloqueado: true};
            }        
        });
    }
}
