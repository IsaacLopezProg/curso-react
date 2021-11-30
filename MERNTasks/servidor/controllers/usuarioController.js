const Usuario = require('../models/Usuario');

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

exports.crearUsuario = async (req, res) =>{

    //realizamos la validacion del express-validator aqui
    //agregandole el request recibido
    const errores = validationResult(req); 
    if(!errores.isEmpty()){
        //es errores array por que el check de errores es un arreglo
        return res.status(400).json({errores:errores.array()});
    }

    // extrayendo los valores del request
    const {email, password} = req.body;
    
    try {

        // verificando si el usuario es unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg : 'El usuario ya existe'});
        }


        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guarda el usuario
        await usuario.save();

         // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id // utilizar el usuario ya creado en mongo
                               // y los hashea como el token
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
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}