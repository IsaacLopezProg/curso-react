import React from 'react';

import {useNavigate} from 'react-router-dom';

// REDUX
import { useDispatch} from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions'


import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // habiliata useNavigate para redirigir

    // Confirmar si desea eliminar el producto

    const confirmarEliminarProducto = id => {

        // preguntar al usuario

        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
        });
    }

    const redireccionEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        navigate(`/productos/editar/${producto.id}`);

    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> $ { precio } </span></td>
            <td className="acciones">
                <button type="button"
                 className="btn btn-primary mr-2"
                 onClick={() => redireccionEdicion(producto)}
                 >
                Editar
                </button>
                <button
                onClick={() => confirmarEliminarProducto(id)}
                className="btn btn-danger">
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;