const express = require('express');

const conectarDB = require('./config/db');

const app = express();

// conectar a la base de datos
conectarDB();


// puerto de la app
const PORT = process.env.PORT || 4000;

// definir la pagina princial
// app.get('/', (req, res) =>{
//     res.send('Hola mundo');
// });

// Habilitar express.json
//se usa para utilizar los mensajes json a la consola
app.use(express.json({ extended:true}));


// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
//importacion de la ruta de auth
app.use('/api/auth', require('./routes/auth'));
//importacion de la ruta de proyectos
app.use('/api/proyecto', require('./routes/proyecto'));
//importacion de la ruta de tareas
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});