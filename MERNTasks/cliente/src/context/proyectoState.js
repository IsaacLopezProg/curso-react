import React, { useReducer } from 'react';
// importaciones externas de terceros
import uuid from 'uuid';
// los context de mi proyecto
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// los types de mi proyecto
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO
} from '../types';

            
            
const ProyectoState = props => {
                
    const proyectos = [
        { id:1, nombre:'Tienda Virtual' },
        { id:2, nombre:'Intranet' },
        { id:3, nombre:'Diseno de Sitio web' },
        { id:4, nombre:'Diseno de Movil' }
    ]
    const initialState = {

        proyectos : [],
        formulario : false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }


    // ontener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // agrergar nuevo proyecto
    const agrergarProyecto = proyecto =>{
        proyecto.id = uuid.v4();
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarFormulario,
                obtenerProyectos,
                agrergarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>

    )
}

export default ProyectoState;