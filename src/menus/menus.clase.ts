import * as schMenus from "./menus.mongodb";

export class MenusClase {
    private stopNecesario: boolean;

    constructor() {
        this.stopNecesario = false;
    }

    clickMenu(nombreMenu: string) {
        return schMenus.getTecladoMain(nombreMenu);
    }

    getStopNecesario() {
        return this.stopNecesario;
    }

    getMenus() {
        return schMenus.getMenus();
    }

}

export const menusInstance = new MenusClase();