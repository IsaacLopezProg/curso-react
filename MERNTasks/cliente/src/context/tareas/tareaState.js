
import React, {useReducer} from 'react';
import tareaReducer from './tareaReducer';
import tareaContext from './tareaContext';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas : [ 
            {id:1 ,nombre:'Elegir Plataforma', estado:true, proyectoId:1},
            {id:2 ,nombre:'Elegir Colores', estado:false, proyectoId:2},
            {id:3 ,nombre:'Elegir Plataforma de pago', estado:true, proyectoId:3},
            {id:4 ,nombre:'Elegir Hosting', estado:false, proyectoId:4},
            {id:5 ,nombre:'Elegir Plataforma', estado:true, proyectoId:1},
            {id:6 ,nombre:'Elegir Colores', estado:false, proyectoId:4},
            {id:7 ,nombre:'Elegir Plataforma de pago', estado:true, proyectoId:3},
            {id:8 ,nombre:'Elegir Hosting', estado:false, proyectoId:1},
            {id:9 ,nombre:'Elegir Plataforma', estado:true, proyectoId:3},
            {id:10 ,nombre:'Elegir Colores', estado:false, proyectoId:4},
            {id:11 ,nombre:'Elegir Plataforma de pago', estado:true, proyectoId:3},
            {id:12 ,nombre:'Elegir Hosting', estado:false, proyectoId:4}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada : null
    }

    // crear el state y el dispatch
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // crear las funciones de un proyecto

    // obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload:proyectoId
        })
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // validar tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = id =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type:ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareas:state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;