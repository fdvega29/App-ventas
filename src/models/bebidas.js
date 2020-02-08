const mongoose = require('mongoose')
const {Schema} = mongoose;

const bebidasSchema = new Schema({
    descripcion: {
        type: String,
        required: true},

    precio: { 
        type: Number,
        required: true}
});

module.exports = mongoose.model('comidas', bebidasSchema);