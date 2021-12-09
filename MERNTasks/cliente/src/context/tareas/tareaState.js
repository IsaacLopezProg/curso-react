
import React, {useReducer} from 'react';
import tareaReducer from './tareaReducer';
import tareaContext from './tareaContext';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada : null
    }

    // crear el state y el dispatch
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // crear las funciones de un proyecto

    // obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('api/tareas',{params:{proyecto}});
            //el params le pasa el valor del id de proyecto
            dispatch({
                type: TAREAS_PROYECTO,
                payload:resultado.data //valor de la busqueda en api
            })
        } catch (error) {
            console.error(error);
        }
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
            console.log(resultado);

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.error(error);
        }
    }

    // validar tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async (id,proyecto) =>{
        console.log(id,proyecto);
        await clienteAxios.delete(`api/tareas/${id}`,{params:{proyecto}});
        try {
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.error(error);
        }
    }

        // Edita o modifica una tarea
        const actualizarTarea = async tarea => {

            try {
                const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
    
                dispatch({
                    type: ACTUALIZAR_TAREA,
                    payload: resultado.data.tarea
                })
            } catch (error) {
                console.log(error);
            }
        }

    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }


    //LIMPIAR LA TAREA SELECCIONADA 
    const limpiarTarea =  () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
                
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;