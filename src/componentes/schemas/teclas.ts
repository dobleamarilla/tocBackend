import {mongoose} from '../bbdd/conexion';

var schemaTeclas = new mongoose.Schema({
    nomMenu: String,
    idArticle: Number,
    nombreArticulo: String,
    pos: Number,
    color: Number,
    esSumable: Boolean
});
var Teclas = mongoose.model('teclas', schemaTeclas);

export function insertarTeclasMain(data: any)
{
    return Teclas.insertMany(data);

}
export function getTecladoMain(nombreMenu: string)
{
    return Teclas.find({nomMenu: nombreMenu}).lean();
}

export function borrarTeclas()
{
    return Teclas.deleteMany({}).catch(err=>{
        console.log(err);
    });
}