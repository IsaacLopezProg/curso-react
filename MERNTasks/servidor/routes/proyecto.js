// ROUTING DE PROYECTO

const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
//importamos el middleawre que vamos autilizar
const auth = require('../middleware/auth')
const {check} = require('express-validator');

router.post('/',
    auth,//colocamos el middleware primero para que lo lea
        //primero antes de pasar al las demas funciones

        //ahora revisamos que los campos esten correctamente llenados.
        [
            check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
        ],
    proyectoController.crearProyecto
);

//utilizando el tag GET
// obtener todos los proyectos
router.get('/',
    auth,//colocamos el middleware primero para que lo lea
        //primero antes de pasar al las demas funciones
    proyectoController.obtenerProyectos
);

// actualizar proyecto
router.put('/:id',
        auth,
        [
            check('nombre','El nombre es obligatorio')
        ],
        proyectoController.actualizarProyecto
)

// eliminar un proyecto
router.delete('/:id',
        auth,
        proyectoController.eliminarProyecto
)


module.exports = router;