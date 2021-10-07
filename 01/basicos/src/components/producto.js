
import React from 'react';

const Producto = ({producto, carrito, agregarProducto, productos}) => {
    
    const {nombre, precio, id} = producto;


    //Agregar un producto a carrito
    const seleccionarProducto = (id) => {
        const producto = productos.filter(producto => producto.id === id )[0];
        console.log(producto);
        agregarProducto([
            ...carrito, 
            producto
        ]);
    }

    const eliminarProducto = id => {
        const producto = carrito.filter(producto => producto.id !== id );
        agregarProducto(producto);
    }
    
    return ( 
        <div>
            <h2>
                {nombre}
            </h2>
            <p>Precio: ${precio}</p>
            { productos 
                ?
                    (
                        <button type="button"
                        onClick={ ()=> seleccionarProducto(id)}
                        >Comprar</button>
                    )
                :
                    (
                        <button type="button"
                        onClick={ ()=> eliminarProducto(id)}
                        >Eliminar</button>
                    )
            }
        </div>
     );
}
 
export default Producto;