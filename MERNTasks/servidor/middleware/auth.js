// los middleware son parte de codigo reutilizable, personalizado
// middleware del auth

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // Leer el token del header

    const token = req.header('x-auth-token');
    // res.json(token);

    // Revisar si no hay token
    if(!token){
        return res.status(401).json({msg:'No hay token, permiso no valido'})
    }

    // validar el token

    try {
        //jwt.verify confirma el token
        const cifrado = jwt.verify(token, process.env.SECRETO);
        req.usuario = cifrado.usuario; // cifrado trel el id de usuario
        next();                        // asi que solo se le esta pasando el id
                                //  al req.usuario ya rectificado
                                //NEXT(), hace que continue el otro middleware
                                //que es este caso es le funcion de crear proyecto 
    } catch (error) {
        res.status(401).json({msg:'Token invalido'});
    }
}