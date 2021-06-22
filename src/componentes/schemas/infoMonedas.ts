import {mongoose} from '../bbdd/conexion';

var schemaMonedas = new mongoose.Schema({
    _id: String,
    infoDinero: [{
        valor: Number, 
        style: String
    }]
});
var Monedas = mongoose.model('monedas', schemaMonedas);

export function setMonedas(data)
{
    var auxInsert = null;
    if(data != null)
    {
        auxInsert = {
            _id: "INFO_MONEDAS",
            infoDinero: data
        };
    }

    return Monedas.replaceOne({ _id: "INFO_MONEDAS" }, auxInsert, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}

export function getMonedas()
{
    return Monedas.findById("INFO_MONEDAS", 'infoDinero -_id', {lean: true});
}