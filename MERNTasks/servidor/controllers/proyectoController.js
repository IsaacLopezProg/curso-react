//importamos el modelo que vamos a utilizar

const Proyecto = require('../models/Proyecto')

// llamado a mi helper para la validacion
const {confirm} = require('../helpers/validacionCheck');
const { json } = require('express');

exports.crearProyecto = async (req, res) => {

    // un helper que cree para no repetir tanto mi codigo
    // en todos los controller
    confirm(req,res);


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

exports.obtenerProyectos = async (req, res) => {
try {
    const proyecto = await Proyecto.find({creador: req.usuario.id}).sort({creado:-1});
    res.json(proyecto);
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Hubo un error"});
}
}

exports.actualizarProyecto = async (req, res) => {
    
    // revisar si hay errores
    confirm(req,res);

    // extraer la informacion del proyecto
    const {nombre} = req.body;
    // Para actualizar el proyecto utilizamos un nuevo proyecto
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        
        // revisar el id

        // req.params.id trae el id que hallas puesto en el link del navegador
        // api/proyecto/34345234523453245234523

        // console.log(req.params.id);
        
        //entonces esta linea de codigo busca en la base de datos lo que quieras
        // en este caso el id, osea compara si el id que pusiste se encuentra en la bd
        
        let proyecto = await Proyecto.findById(req.params.id);
        // nota importante cada vez que vallas a consultar la base de datos
        // y estemos usando una funcion con async, debemos de utilizar await
        
        // si el proyecto existe
        if(!proyecto){
            res.status(404).json({msg:"Proyecto no existe"});
        }

        // verificar el creador del proyecto
        // verificamos el creador del proyecto que busco en la bd con cuerda con el que se
        // esta logeado, utilizamos toString por que en ls bd dice IDobject...
        if(proyecto.creador.toString() != req.usuario.id){
            res.status(401).json({msg:"No Autorizado"});
        }


        // actualizar el proyecto

        // findByIdAndUpdate metodo para actualizar el proyecto con mongoose
        // toma el id. despues establece la nueva configuracion y se le dice
        // que si al nuevo cambio 
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id}, { $set:nuevoProyecto}, {new:true});

        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

exports.eliminarProyecto = async (req, res) => {
    try {

         // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        
        // si el proyecto existe
        if(!proyecto){
            res.status(404).json({msg:"Proyecto no existe"});
        }

        // verificar el creador del proyecto
        if(proyecto.creador.toString() != req.usuario.id){
            res.status(401).json({msg:"No Autorizado"});
        }


        // eliminar el proyecto

        // find
        
        await Proyecto.findOneAndRemove({ _id:req.params.id});

        res.json({msg:"Proyecto eliminado"});
    } catch (error) {

        console.log(error);
        res.status(404).json({msg:"Error en el servidor"});
        
    }
}