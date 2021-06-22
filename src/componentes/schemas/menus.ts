import {mongoose} from '../bbdd/conexion';

var schemaMenus = new mongoose.Schema({
    nomMenu: String
});
var Menus = mongoose.model('menus', schemaMenus);

export function insertarMenus(data: any)
{
    return Menus.insertMany(data);

}
export function getMenus()
{
    return Menus.find().lean();
}

export function borrarMenus()
{
    return Menus.deleteMany({}).catch(err=>{
        console.log(err);
    });
}