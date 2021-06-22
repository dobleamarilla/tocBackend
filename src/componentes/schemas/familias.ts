import {mongoose} from '../bbdd/conexion';

var schemaFamilias = new mongoose.Schema({
    nombre: String,
    padre: String
});
var Familias = mongoose.model('familias', schemaFamilias);

export function insertarFamilias(data)
{
    var devolver = new Promise((dev, rej)=>{
        Familias.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
export function borrarFamilias()
{
    return Familias.deleteMany({}).catch(err=>{
        console.log(err);
    });
}

