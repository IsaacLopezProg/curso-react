import React, { useReducer } from 'react';
// importaciones externas de terceros
import { v4 } from 'uuid';
// los context de mi proyecto
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// los types de mi proyecto
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO
} from '../../types';

            
            
const ProyectoState = props => {
                
    const proyectos = [
        { id:1, nombre:'Tienda Virtual' },
        { id:2, nombre:'Intranet' },
        { id:3, nombre:'Diseno de Sitio web' },
        { id:4, nombre:'Diseno de Movil' }
    ]
    const initialState = {

        proyectos : [],
        formulario : false,
        errorformulario:false,
        proyecto:null
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
        proyecto.id = v4();

        // insertar el proyecto en el state
        dispatch({
            type:AGREGAR_PROYECTO,
            payload:proyecto
        })
    }

    // VALIDA el formulario por errores
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO,
        })
    }

    // selecciona el proyecto del cual el usuario dio click
    const proyectoActual = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    // eliminar un proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload:proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario:state.errorformulario,
                proyecto:state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agrergarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>

    )
}

export default ProyectoState;