const mongoose = require ('mongoose'); //mongoose tambien permite crear y trabajar con esquemas
const { Schema } = mongoose;

//Creo el esquema de la bd, utilizando el metodo schema.
const EntradaSchema = new Schema({
    titulo : {type: String, required: true},
    descripcion: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: { type: String}
});

//Exporto el esquema para reutiliazarlo en las rutas.  
module.exports = mongoose.model('entrada', EntradaSchema);