//Es una ayudador para no reescribir tanto codigo
//para validar el check del express-validator


const confirm = (req) => {
    const {validationResult} = require('express-validator');
    const errores = validationResult(req); 
    if(!errores.isEmpty()){
        //es errores array por que el check de errores es un arreglo
        return res.status(400).json({errores:errores.array()});
    }

}

// confirm();

module.exports = {confirm}