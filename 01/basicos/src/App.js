import React, {Fragment, useState} from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Producto from "./components/producto";
import Carrito from "./components/Carrito";


function App() {





  // Crear listado de productos
  const [productos, guardarProductos] = useState([
    {id:1, nombre: 'camisa', precio:50},
    {id:2, nombre: 'blusa', precio:30},
    {id:3, nombre: 'sueter', precio:20},
    {id:4, nombre: 'pantalon', precio:40},
  ]);

  // Agregar al carrito

  const [ carrito, agregarProducto ] =useState([]);

  //agregarProductoObtener la fecha
  
  const fecha = new Date().getFullYear();
  return (
    <Fragment>
      <Header
        titulo='Tienda Virtual' />

        <h1>Lista de Productos</h1>
        {productos.map(producto =>(
            <Producto
            key={producto.id}
            producto={producto}
            productos={productos}
            carrito={carrito}
            agregarProducto={agregarProducto}
            /> 
        ))}

        <Carrito
          carrito={carrito}
          agregarProducto={agregarProducto}
        />
        


      <Footer 
        fecha={fecha} />
     </Fragment>
  );
}

export default App;
