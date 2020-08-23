const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const pedidosSchema = new Schema({

    cliente: {type: String, required: true},

    total: {type: Number, required: true},

    idComidas: {type: mongoose.Schema.Types.ObjectId, ref: "Comida"},

    idBebidas: {type: mongoose.Schema.Types.ObjectId, ref: "Bebida"}
},
{
    timestamps: true
}
);

module.exports = model('pedido', pedidosSchema);