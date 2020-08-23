const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/autenticar');

const comidasDB = require('../models/comidas');

router.get('/comidas/add', isAuthenticated, (req, res) => {
    res.render('comidas/new-comida');
});

router.post('/comidas/new-comida', isAuthenticated, async (req, res) => {
    const {descripcion, precio} = req.body;

    const errors = [];

    if(!descripcion){
       errors.push({text: 'Ingrese una comida'})
    }
    if(!precio){
        errors.push({text: 'Ingrese un precio'})
     }
     if(errors.length > 0){
        res.render('comidas/new-comida', {
            errors,
            descripcion,
            precio
        });
    }else{
         const newComida = new comidasDB({descripcion, precio});
         await newComida.save();
         req.flash('success_msg', 'Comida agregada con exito');
         res.redirect('/comidas');
    };   
    
});

router.get('/comidas', isAuthenticated, async (req, res) => {
    const comidas = await comidasDB.find({lsComida: req.body._id}).sort({date: 'desc'});
    res.render('comidas/all-comida', {comidas});
});

router.get('/comidas/edit/:id', async (req, res) =>{
    const editComida = await comidasDB.findById(req.params.id);
    res.render('comidas/edit-comida', {editComida});
});

router.put('/comidas/edit-comida/:id', async (req, res) =>{
    const {descripcion, precio} = req.body;
    await comidasDB.findByIdAndUpdate(req.params.id, {descripcion, precio});
    req.flash('success_msg', 'Comida actualizada con exito');
    res.redirect('/comidas');
 });

 router.delete('/comidas/eliminar/:id', async(req,res) =>{
    await comidasDB.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Comida eliminada con exito');
    res.redirect('/comidas');
 });


module.exports = router;