const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

const {confirm} = require('../helpers/validacionCheck');

// Crea una nueca tarea

exports.crearTarea = async (req, res) => {
    
    // validar errores
    confirm(req,res);

    
    try {

        // extraer y validar el proyecto, en el req viene el proyecto
        
        const {proyecto} = req.body;
        // busca que el proyecto id y el proyecto del req sean lo mismo o que exista
        const existeproyecto = await Proyecto.findById(proyecto);

        if(!existeproyecto) {
            return res.status(404).json({msg:'Proyecto no existe'});
        }

        //Revisar si el proyecto actual pertene al usuairo autenticado
        if(existeproyecto.creador.toString() != req.usuario.id){
            res.status(401).json({msg:"No Autorizado"});
        }

        // creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

//obtener las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    try {
        // extraer y validar el proyecto, en el req viene el proyecto
        
        // const {proyecto} = req.body;
        const {proyecto} = req.query;//para leer los params
        // console.log(proyecto);
        // busca que el proyecto id y el proyecto del req sean lo mismo o que exista
        const existeproyecto = await Proyecto.findById(proyecto);

        if(!existeproyecto) {
            return res.status(404).json({msg:'Proyecto no existe'});
        }

        //Revisar si el proyecto actual pertene al usuairo autenticado
        if(existeproyecto.creador.toString() != req.usuario.id){
            res.status(401).json({msg:"No Autorizado"});
        }

        //obtener las tareas por proyecto
        let tareas = await Tarea.find({proyecto}).sort({creado:-1}); 
        // el sort es para ordenar las tareas por creado
        res.json(tareas);

    } catch (error) {
        console.error(error);
        res.status(404).json({msg:"Hubo un error"});
    }
}

exports.actualizarTareas = async (req, res) => {
    try {
         // extraer y validar el proyecto, en el req viene el proyecto
        
         const {proyecto, nombre, estado} = req.body;
         
         // valida el id de la tarea
         let tarea = await Tarea.findById(req.params.id);
         
         if(!tarea) {
             return res.status(404).json({msg:'la tarea no existe'});
            }
        
        // Valida que el proyecto exista
        const existeproyecto = await Proyecto.findById(proyecto);
        
        //Revisar si el proyecto actual pertene al usuairo autenticado
         if(existeproyecto.creador.toString() != req.usuario.id){
             res.status(401).json({msg:"No Autorizado"});
         }

        //  crear un objecto con la nueva informacion para
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado

        // guardar la modificacion

        tarea = await Tarea.findOneAndUpdate({_id:tarea}, nuevaTarea, {new:true});
        res.json({tarea});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Hubo un error"});
    }
}

exports.eliminarTareas = async (req, res) => {
    try {
        // extraer y validar el proyecto, en el req viene el proyecto
        
        const {proyecto} = req.query;
        // const {proyecto} = req.body;
        // console.log(proyecto);
         
        // valida el id de la tarea
        let tarea = await Tarea.findById(req.params.id);
        // console.log(tarea);
        
        if(!tarea) {
            return res.status(404).json({msg:'la tarea no existe'});
           }
       
       // Valida que el proyecto exista
       const existeproyecto = await Proyecto.findById(proyecto);
       
       //Revisar si el proyecto actual pertene al usuairo autenticado
        if(existeproyecto.creador.toString() != req.usuario.id){
            res.status(401).json({msg:"No Autorizado"});
        }

        //eliminar tarea
        // console.log(tarea._id.toString(), req.params.id);
        await Tarea.findOneAndRemove({ _id:req.params.id});
        res.json({msg:"tarea eliminada"})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Hubo un error"});
    }
}