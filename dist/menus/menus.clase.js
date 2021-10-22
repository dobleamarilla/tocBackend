"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menusInstance = exports.MenusClase = void 0;
const schMenus = require("./menus.mongodb");
class MenusClase {
    constructor() {
        this.stopNecesario = false;
    }
    clickMenu(nombreMenu) {
        return schMenus.getTecladoMain(nombreMenu);
    }
    getStopNecesario() {
        return this.stopNecesario;
    }
    getMenus() {
        return schMenus.getMenus();
    }
}
exports.MenusClase = MenusClase;
exports.menusInstance = new MenusClase();
//# sourceMappingURL=menus.clase.js.map