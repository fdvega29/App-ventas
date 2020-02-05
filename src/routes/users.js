const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/entradas',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) =>{
    const { email, password, confirmPassword} = req.body;
    const errors = [];
    if(password != confirmPassword){
        errors.push({text: 'Las contraseñas no coinciden'})
    }
    if(password.length < 4){
        errors.push({text: 'Ingrese 4 o mas caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, email, password, confirmPassword});
    }else{
       const emailUsers = await Users.findOne({email: email});
       if(emailUsers){
           req.flash('error_msg', 'El correo ya existe');
           res.redirect('/users/signup');
       } 
       const newUsers = new Users({email, password});
       newUsers.password = await newUsers.encryptPassword(password);
       await newUsers.save();
       req.flash('success_msg', 'Estas registrado');
       res.redirect('/users/signin'); 
    }
});

router.get('/users/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});

module.exports = router;