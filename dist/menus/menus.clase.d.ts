export declare class MenusClase {
    private stopNecesario;
    constructor();
    clickMenu(nombreMenu: string): Promise<any>;
    getStopNecesario(): boolean;
    getMenus(): Promise<any>;
}
export declare const menusInstance: MenusClase;
