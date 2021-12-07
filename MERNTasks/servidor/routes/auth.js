// Rutas para la autenticacion de usuarios

//usamos expres para crear el servidor
const express = require("express");

//utilizamos la funcion de Router de la libreria express
//para poder utilizar los tag POST,GET,UPDATE,DELETE...
const router = express.Router();

//Creamos un controlador de auth para separar lo que va 
//hacer cada tag, POST, GET, UPDATE, DELETE...
const authController = require('../controllers/authController');

//check es una funcion de la libreria de expres-validator(que se usa para
//validar)
const {check} = require('express-validator');

//importamos el middleawre que vamos autilizar
const auth = require('../middleware/auth')


// accede a su usuario
// api/auth

router.post('/', 
//validamos esos campos con una funcion de express-validator llamada check
    // [
    //     check('email','Agrega un email valido').isEmail(),
    //     check('password','El password debe de ser minimo de 6 caracteres').isLength({min:6})
    // ],
// al utilizar un controlador podemos utilizar las funciones que querramos
// dentro del controlador y mandarlas a llamar desde aqui, el routing de auth
    authController.autenticarUsuario //llamamos la funcion autenticarUsuario
);

//obtiene el usuario registrado
// api/auth

router.get('/',
    auth,
    authController.usuarioAutenticado

)

module.exports = router;