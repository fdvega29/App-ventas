const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/autenticar');

const pedidosDB = require('../models/pedidos');
const comidasDB = require('../models/comidas');
const bebidasDB = require('../models/bebidas');


router.get('/pedidos/add', isAuthenticated, (req, res) => {
    res.render('pedidos/new-pedido');
});

/*router.post('/pedidos/new-pedido', async (req, res) => {

    const { cliente, comidas: Comida, bebidas: Bebida, total } = req.body;

    const errors = [];

    if (!cliente) {
        errors.push({ text: 'Ingrese datos del cliente' })
    }
    if(comidas) {
        comidas.push('descripcion');
    }

    if (errors.length > 0) {
        res.render('pedidos/new-pedido', {
            errors,
            cliente,
            total
        });
    } else {
        const newPedido = new pedidosDB({ cliente, comidas: Comida, bebidas: Bebida, total });
        await newPedido.save()
        req.flash('success_msg', 'Pedido cargada con exito');
        res.redirect('/pedidos');
    };

});*/

router.post('/pedidos/new-pedido', async (req, res) => {
    const {cliente, comidas, bebidas, total} = req.body;
    const newPedido = new pedidosDB({cliente, comidas, bebidas, total});
    const lsComidas = comidasDB.findById(req.body._id);
    const lsBebidas = bebidasDB.findById(req.body._id);
    newPedido.comidas = lsComidas
    newPedido.bebidas = lsBebidas
    await newPedido.save()
    lsComidas.comidas.push(newPedido)
    lsBebidas.bebidas.push(newPedido)
    res.redirect('/pedidos');
});

router.post('/pedidos/new-pedido', (req, res) =>{

    const newPedido = new pedidosDB()
    newPedido.cliente = req.body.cliente;
    newPedido.idComidas = req.body.idComidas;
    newPedido.idBebidas = req.body.idBebidas;
    newPedido.total = req.body.total;
});

/*router.get('/pedidos/new-pedido', async (req, res) => {
    const comidas = await comidasDB.find({})
    .populate({path: "comidas"})
    .sort({date: 'desc'});
    res.render('/pedidos/new-pedido', {comidas});
});*/

router.get('/pedidos/add', async (req, res) =>{
    const lsComidas = await comidasDB.find({})
    lsComidas.push(req.body.idComidas)
    .populate('idComidas')
    .exec()
    res.render({lsComidas});
});


/*router.get('/pedidos', async (req, res) => {
     await pedidosDB.find({}, function (err, pedidos) {
        comidasDB.populate(pedidos, { path: "comida" })
        res.render('/pedidos/all-pedido', {pedidos});
    })
});*/

router.get('/pedidos/edit/:id', async (req, res) => {
    const editPedido = await pedidosDB.findById(req.params.id);
    res.render('pedidos/edit-pedidos', { editPedido });
});


module.exports = router;