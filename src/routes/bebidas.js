const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/autenticar');

const bebidasDB = require('../models/bebidas');

router.get('/bebidas/add', isAuthenticated, (req, res) => {
    res.render('bebidas/new-bebida');
});

router.post('/bebidas/new-bebida', isAuthenticated, async (req, res) => {
    const {descripcion, precio} = req.body;

    const errors = [];

    if(!descripcion){
       errors.push({text: 'Ingrese una comida'})
    }
    if(!precio){
        errors.push({text: 'Ingrese un precio'})
     }
     if(errors.length > 0){
        res.render('bebidas/new-bebida', {
            errors,
            descripcion,
            precio
        });
    }else{
         const newBebida = new bebidasDB ({ descripcion, precio });
         await newBebida.save();
         req.flash('success_msg', 'Comida agregada con exito');
         res.redirect('/bebidas');
    };   
    
});

router.get('/bebidas', isAuthenticated, async (req, res) => {
    const bebidas = await bebidasDB.find({lsbebidas: req.body._id}).sort({date: 'desc'});
    res.render('bebidas/all-bebida', {bebidas});
});

router.get('/bebidas/edit/:id', async (req, res) =>{
    const editBebida = await bebidasDB.findById(req.params.id);
    res.render('bebidas/edit-bebida', {editBebida});
});

router.put('/bebidas/edit-bebida/:id', isAuthenticated, async (req, res) =>{
    const {descripcion, precio} = req.body;
    await bebidasDB.findByIdAndUpdate(req.params.id, {descripcion, precio});
    req.flash('success_msg', 'Comida actualizada con exito');
    res.redirect('/bebidas');
 });

 router.delete('/bebidas/eliminar/:id', async(req,res) =>{
    await bebidasDB.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Comida eliminada con exito');
    res.redirect('/bebidas');
 });


module.exports = router;