// Rutas para crear usuarios

//usamos expres para crear el servidor
const express = require("express");

//utilizamos la funcion de Router de la libreria express
//para poder utilizar los tag POST,GET,UPDATE,DELETE...
const router = express.Router();

//Creamos un controlador de usuarios para separar lo que va 
//hacer cada tag, POST, GET, UPDATE, DELETE...
const usuarioController = require('../controllers/usuarioController');

//check es una funcion de la libreria de expres-validator(que se usa para
//validar)
const {check} = require('express-validator');


// Crea un usuario
// api/usuarios

router.post('/', 
//validamos esos campos con una funcion de express-validator llamada check
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe de ser minimo de 6 caracteres').isLength({min:6})
    ],
// al utilizar un controlador podemos utilizar las funciones que querramos
// dentro del controlador y mandarlas a llamar desde aqui, el routing de usuarios
    usuarioController.crearUsuario
);

module.exports = router;