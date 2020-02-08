const mongoose = require('mongoose')
const {Schema} = mongoose;

const comidasSchema = new Schema({
    descripcion: {
        type: String,
        required: true},

    precio: { 
        type: Number,
        required: true},
    
    date: {type: Date, default: Date.now},
    lsComida: {type: String}

});

module.exports = mongoose.model('comida', comidasSchema);