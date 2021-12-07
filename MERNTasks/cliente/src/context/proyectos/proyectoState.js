import React, { useReducer } from 'react';
// importaciones externas de terceros
// import { v4 } from 'uuid';
// los context de mi proyecto
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// los types de mi proyecto
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

            
            
const ProyectoState = props => {
   
    const initialState = {

        proyectos : [],
        formulario : false,
        errorformulario:false,
        proyecto:null,
        mensaje : null,
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
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyecto')

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:"Hubo un error",
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    // agrergar nuevo proyecto
    const agrergarProyecto = async (proyecto) =>{
        // proyecto.id = v4();

        try {

            const resultado = await clienteAxios.post('/api/proyecto',proyecto)
            // console.log(resultado);

            // insertar el proyecto en el state
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })

        } catch (error) {
            const alerta = {
                msg:"Hubo un error",
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

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
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyecto/${proyectoId}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:proyectoId
            })
        } catch (error) {
            const alerta = {
                msg:"Hubo un error",
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario:state.errorformulario,
                proyecto:state.proyecto,
                mensaje: state.mensaje,
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