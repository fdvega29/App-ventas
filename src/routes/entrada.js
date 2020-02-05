const express = require('express');
const router = express.Router();

 const { isAuthenticated } = require('../helpers/autenticar');

const entrada = require('../models/entrada');

router.get('/entradas/add', isAuthenticated, (req, res) => {
    res.render('entradas/new-entrada');
});

router.post('/entradas/new-entrada', isAuthenticated, async (req, res) => {
   const {titulo, descripcion} = req.body;
   //console.log(req.body);
   const errors = [];

   if(!titulo){
       errors.push({text: 'Ingrese un titulo'})
   }
   if(!descripcion){
        errors.push({text: 'Ingrese una descripcion'})
   }
   if(errors.length > 0){
       res.render('entradas/new-entrada', {
           errors,
           titulo,
           descripcion,
       });
   }else{
        const newEntrada = new entrada({ titulo, descripcion });
        newEntrada.user = req.user.id;
        await newEntrada.save();
        req.flash('success_msg', 'Entrada cargada con exito');
        res.redirect('/entradas');
   };   
});

router.get('/entradas', isAuthenticated, async (req, res) => {
    const entradas = await entrada.find({user: req.user.id}).sort({date: 'desc'});
    res.render('entradas/all-entradas', {entradas});
});

router.get('/entradas/edit/:id', async (req, res) =>{
    const editEntrada = await entrada.findById(req.params.id);
    res.render('entradas/edit-entradas', {editEntrada});
});

router.put('/entradas/edit-entradas/:id', async (req, res) =>{
   const {titulo, descripcion} = req.body;
   await entrada.findByIdAndUpdate(req.params.id, {titulo, descripcion});
   req.flash('success_msg', 'Entrada actualizada con exito');
   res.redirect('/entradas');
});

router.delete('/entradas/eliminar/:id', async(req,res) =>{
   await entrada.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Entrada eliminada con exito');
   res.redirect('/entradas');
});

module.exports = router;