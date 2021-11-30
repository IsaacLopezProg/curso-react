const mongoose = require('mongoose');
//dotenv nos permite acceder a los archivos fisicos
// de nuestro escritorio o a los archivos .env
require('dotenv').config({path:'variables.env'});

//funcion para conectar la base de datos de mongo
const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('DB conectada');
    } catch (error) {
        console.log('hubo un error');
        console.log(error);
        process.exit(1); // detiene la app
    }

}

module.exports = conectarDB;