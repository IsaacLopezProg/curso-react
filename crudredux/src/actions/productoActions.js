import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types'; 

import clienteAxios from '../config/axios';
// lib para alerta
import Swal from 'sweetalert2';
import axios from 'axios';

// crear nuevos productos


export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // agregar a la API
            await clienteAxios.post('/productos',producto);

            // si sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            // agregando una alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego exitosamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            // agregando una alerta
            Swal.fire({
                icon:'error',
                title:'Hubo un error,',
                text:'Hubo un error, favor intentarlo de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type:AGREGAR_PRODUCTO,
    payload:true
})


// si el producto se guarda en la DB

const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hubo un error

const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})


// Funciona que descarga los productos de la DB

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError());
        }
    }
}

const descargarProductos = () =>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
});

const descargarProductosExitosa = productos => ({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload:productos
});

const descargarProductosError = () => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:true
})





