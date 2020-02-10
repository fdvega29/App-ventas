const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/autenticar');

const pedidosDB = require('../models/pedidos');
const comidasDB = require('../models/comidas');

router.get('/pedidos/add', isAuthenticated, (req, res) => {
        res.render('pedidos/new-pedido');
    });

    router.post('/pedidos/new-pedido', isAuthenticated, async (req, res) => {
        const {cliente, comida, bebida, total} = req.body;

        const errors = [];

        if(!cliente){
           errors.push({text: 'Ingrese datos del cliente'})
        }
        if(!comida){
            errors.push({text: 'Seleccione una o varias comidas'})
         }
         if(!bebida){
            errors.push({text: 'Seleccione una o varias bebidas'})
         }
         if(errors.length > 0){
            res.render('pedidos/new-pedido', {
                errors,
                cliente,
                comuida,
                bebida,
                total
            });
        }else{
             const newPedido = new pedidosDB({ cliente, comida, bebida, total });
             newPedido.pedido = req.pedido.id;
             await newPedido.save();
             req.flash('success_msg', 'Pedido cargada con exito');
             res.redirect('/pedidos');
        };   
        
    });

    router.get('/pedidos', isAuthenticated, async (req, res) => {
       await pedidosDB.find({}, function(err, pedidos){
            pedidos.populate(pedidos, {path: "comida"}), function(err, pedidos){
                res.status(200).send(pedidos);
            }
        }).sort({date: 'desc'});
    });

    router.get('/pedidos', isAuthenticated, async (req, res) => {
        const pedido = await pedidosDB.find({lsComida: req.body._id})
        .populate('comida')
        .exec()
        .sort({date: 'desc'});

        
        res.render('comidas/all-comida', {pedido});
    });



    router.get('/pedidos/edit/:id', async (req, res) =>{
        const editPedido = await pedidosDB.findById(req.params.id);
        res.render('pedidos/edit-pedidos', {editPedido});
    });
    

module.exports = router;