import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITOSO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTOS,
    PRODUCTO_EDITADO_EXITOSO,
    PRODUCTO_EDITADO_ERROR
} from '../types'; 

import clienteAxios from '../config/axios';
// lib para alerta
import Swal from 'sweetalert2';

// CREAR NUEVOS PRODUCTOS


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


// FUNCIONA QUE DESCARGA LOS PRODUCTOS DE LA DB

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


// SELECCIONA Y ELIMINA EL PRODUCTO

export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoELiminar(id));
        // Si se elimina, mostrar alerta
        Swal.fire(
            'Eliminado',
            'El producto se eliminó correctamente',
            'success'
        );

        try {
            await clienteAxios.get(`/productos/${id}`);
            dispatch(eliminarProductoExitoso());
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
        
    }
}

const obtenerProductoELiminar = id => ({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
});

const eliminarProductoExitoso = () => ({
    type:PRODUCTO_ELIMINAR_EXITOSO
});

const eliminarProductoError = () => ({
    type:PRODUCTO_ELIMINAR_ERROR,
    payload:true
})




// PARA RELLENAR EL FORMULARIO Y OBTENER EL PRODUCTO
export function obtenerProductoEditar (producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
});


// EDITAR O PUT

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());
        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto)
            dispatch(editarProductoExitoso(producto));
            // console.log(respuesta); 
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTOS,
});

const editarProductoExitoso = producto => ({
    type:PRODUCTO_EDITADO_EXITOSO,
    payload:producto
});

const editarProductoError = () => ({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})