import * as schTeclas from "../componentes/schemas/teclas";
import * as schMenus from "../componentes/schemas/menus";


class TeclasMenus {
    private stopNecesario: boolean;

    constructor(){
        this.stopNecesario = false;
    }

    clickMenu(nombreMenu: string){
        return schTeclas.getTecladoMain(nombreMenu);
    }
    getStopNecesario(){
        return this.stopNecesario;
    }
    getMenus(){
        return schMenus.getMenus();
    }
}

const teclasMenus = new TeclasMenus();

export {teclasMenus}