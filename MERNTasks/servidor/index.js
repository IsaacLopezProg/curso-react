const express = require('express');

const app = express();


// puerto de la app
const PORT = process.env.PORT || 4000;

// definir la pagina princial
// app.get('/', (req, res) =>{
//     res.send('Hola mundo');
// });

// arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});