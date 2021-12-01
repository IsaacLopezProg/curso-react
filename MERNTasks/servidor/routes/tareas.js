const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth')

// crear tareas
//api/tareas
router.post('/',
    auth,
    [
        check('nombre',"El nombre de la tarea es obligatorio").not().isEmpty(),
        check('proyecto',"El proyecto esobligatorio").not().isEmpty()
    ]
    ,
    tareaController.crearTarea
);

//obtener tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//actualizar tareas
router.put('/:id',
    auth,
    tareaController.actualizarTareas
)

//eliminar tarea 
router.delete('/:id',
    auth,
    tareaController.eliminarTareas
)

module.exports = router;