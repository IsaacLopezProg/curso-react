import React,{Fragment, useEffect} from 'react';

import Producto from './Producto';

// Redux
import {useSelector,useDispatch} from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';

const Productos = () => {

    
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        
        // Consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    },[])
    
    // descargando los productos al listado 
    const productos = useSelector(state => state.productos.productos);
    // console.log(productos.productos);
    const error = useSelector(state => state.productos.error);


    return ( 
            <Fragment>
           <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <h2 className="font-weight-bold alert alert-danger text-center mt-2"> 
            Hubo un error</h2>
            : null}
           <table className="table table-striped">
               <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                   {productos === '0' ? 'No hay productos' : 
                    (
                        productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )
                   }

               </tbody>
           </table>
        </Fragment>
     );
}

export default Productos; 