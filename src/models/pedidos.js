const mongoose = require('mongoose')
const { Schema } = mongoose;

const pedidosSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cliente: {
        type: String,
        required: true
    },

    comida: {
        type: mongoose.Schema.Types.ObjectId, ref: "Comida", required: true},

    bebida: {
        type: mongoose.Schema.Types.ObjectId, ref: "Bebida", required: true},

    total: {
        type: Number,
        required: true
    },
    date: {type: Date, default: Date.now}

});

module.exports = mongoose.model('pedido', pedidosSchema);