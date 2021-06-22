"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarMenus = exports.getMenus = exports.insertarMenus = void 0;
const conexion_1 = require("../bbdd/conexion");
var schemaMenus = new conexion_1.mongoose.Schema({
    nomMenu: String
});
var Menus = conexion_1.mongoose.model('menus', schemaMenus);
function insertarMenus(data) {
    return Menus.insertMany(data);
}
exports.insertarMenus = insertarMenus;
function getMenus() {
    return Menus.find().lean();
}
exports.getMenus = getMenus;
function borrarMenus() {
    return Menus.deleteMany({}).catch(err => {
        console.log(err);
    });
}
exports.borrarMenus = borrarMenus;
