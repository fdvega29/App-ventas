const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users');

//Autenticacion del usuario
//done es un callback para finalizar la autenticacion
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await Users.findOne({email: email});
    if(!user){
        return done(null, false, { message: 'Usuario no encontrado'});
    } else {
        const resultado = await user.matchPassword(password); 
        if(resultado){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Contraseña Incorrecta'});
        }
    }
}));

//Almacena el usuario en una sesion por su id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Caso inverso, mediante su id, generamos un nuevo usuario
passport.deserializeUser((id, done) =>{
    Users.findById(id, (err, user) =>{
        done(err, user);
    });
});
