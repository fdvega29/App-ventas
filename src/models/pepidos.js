const mongoose = require('mongoose')
const { Schema } = mongoose;

const pedidosSchema = new Schema({
    cliente: {
        type: String,
        required: true
    },

    comida: {
        type: String,
        required: true
    },

    bebida: {
        type: String,
        required: true
    },

    total: {
        type: Number,
        required: true
    },
    date: {type: Date, default: Date.now},
    pedido: {type: String},
    estado: {
        type: Boolean,
        default: false}

});

module.exports = mongoose.model('pedido', pedidosSchema);