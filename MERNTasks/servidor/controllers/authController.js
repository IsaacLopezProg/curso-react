const Usuario = require('../models/Usuario');

// CONTROLADOR PARA LA AUTENTICACION

// esta libreria es para hashear las contrasenas de los usuarios
const bcryptjs = require('bcryptjs');

// esta libreria es para revisar los resultados de la validacion
// hecha en el routing de Usuario de la libreria de 
// express-validator llamada validationResulta, devuelve los resultdos
const {validationResult} = require('express-validator');

// Esta libreria es para seguridad, con ella creamos un token
//  para acceder como usuarios registrados a nuestro usuario
// y para relacionarnos con la base de datos
const jwt = require('jsonwebtoken');

//funcion para autenticacion
exports.autenticarUsuario = async (req, res) => {

    // VALIDACION DE ERRORES
    //realizamos la validacion del express-validator aqui
    //agregandole el request recibido
    const errores = validationResult(req); 
    if(!errores.isEmpty()){
        //es errores array por que el check de errores es un arreglo
        return res.status(400).json({errores:errores.array()});
    }

    //extraemos los valores de email y pass para facilitar su uso
    const {email, password} = req.body; //los valores vienen del request y su body.

    try {
        //validamos que el email del usuairo existea
        let usuario = await Usuario.findOne({email}); //findOne funcion de expres-validator
        if(!usuario){                                 // que busca un campo.
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //Revision del password
        // funcion compare de bcryptjs compara los pass haseados, el del 
        // request y usuario.password, que esta alojado en la base de datos
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({msg:'Password Incorrecto'});
        }

        //si todo va bien, utilizamos el JWT para recibir el token
        //y asi poder acceder a nuestro usuario


        // Si todo es correcto Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        
         // firmar el JWT
         jwt.sign(payload, process.env.SECRETO, { // importante el secreto
            // es lo que lee JWT para autenticar
            // que es la misma persona o maquina
        expiresIn: 3600 // expira 1 hora el token creado
        }, (error, token) => {
        if(error) throw error;

        // Mensaje de confirmación mostrando el token creado
        res.json({ token  });
        });

    } catch (error) {
        console.log(error)
        
    }

}