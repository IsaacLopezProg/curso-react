//importamos el modelo que vamos a utilizar

const Proyecto = require('../models/Proyecto')

// para validar el check
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //realizamos la validacion del express-validator aqui
    //agregandole el request recibido
    const errores = validationResult(req); 
    if(!errores.isEmpty()){
        //es errores array por que el check de errores es un arreglo
        return res.status(400).json({errores:errores.array()});
    }


    try {
        //asignamos el req.body al modelo de proyecto
        // y los guardamos en una nueva variable 
        // llamada proyecto con minuscula
        let proyecto = new Proyecto(req.body);


        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        //guardamos el proyecto
        proyecto.save();
        //visualizamos lo que se envio en un json
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor')
    }

}