import React from 'react';
import './Carrito.css';
import Producto from "./producto";

const Carrito = ({carrito, agregarProducto}) => (
    
    <div className="carrito">
        <h2>Tu Carrito de compras</h2>
        {carrito.map(producto =>(
            <Producto
            key={producto.id}
            producto={producto}
            carrito={carrito}
            agregarProducto={agregarProducto}
            />

        ))}
    </div>
);
 
export default Carrito;