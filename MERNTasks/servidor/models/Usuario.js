// mongoose es la libreria que nos facilita el uso de mongo db
//en node.js
const mongoose = require('mongoose');

//las Schemas de mongoose son las formas de utilizar los 
// modelos en mongo
const UsuariosSchema = mongoose.Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    registro:{
        type:Date,
        default:Date.now()
    }


});

//asignamos el mondelo de usuario a mongo atravez del Schema
module.exports = mongoose.model('Usuario', UsuariosSchema);