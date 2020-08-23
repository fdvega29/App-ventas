const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const bebidasSchema = new Schema({

    descripcion: {
        type: String,
        required: true},

    precio: { 
        type: Number,
        required: true},
},
{
    timestamps: true
}
);

module.exports = model('Bebida', bebidasSchema);