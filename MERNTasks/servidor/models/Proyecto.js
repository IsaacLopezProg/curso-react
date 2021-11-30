// mongoose es la libreria que nos facilita el uso de mongo db
//en node.js
const mongoose = require('mongoose');

//las Schemas de mongoose son las formas de utilizar los 
// modelos en mongo
const ProyectoSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true

    },
    creador:{ // referencia o relacion de uno a uno (creo)
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'

    },
    creado:{
        type:Date,
        default:Date.now()

    }


});


//asignamos el mondelo de usuario a mongo atravez del Schema
module.exports = mongoose.model('Proyecto', ProyectoSchema);