import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    // obtener el state de proyectos 
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;


    // obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    // destructurando el proyecto
    const [ proyectoActual ] = proyecto;

    const tareaEliminar = id => {
        console.log(id);
        eliminarTarea(id, proyectoActual._id);
        // es necesario pasarle el proyecto
        obtenerTareas(proyectoActual.id);
    }

    // Cambiar el estado de las tarea
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        } else{
            tarea.estado = true
        }
        actualizarTarea(tarea);

    }

    // Selecciona una tarea actual cuando el usuario hace click en editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);

    }
    

    return ( 
    <li className="tarea sombra">
        <p>{tarea.nombre}</p>
        <div className="estado">
            {tarea.estado
                ?
                (
                    <button 
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >
                        Completo
                    </button>
                )
                :
                (
                    <button 
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)} 
                    >
                        Incompleto
                    </button>
                )

            }
        </div>
        <div className="acciones">
            <button onClick={() => seleccionarTarea(tarea)}  type="button" className="btn btn-primario">Editar</button>
            <button onClick={()=>tareaEliminar(tarea._id)} type="button" className="btn btn-secundario">Elimiar</button>
        </div>

    </li>
    );
}
 
export default Tarea;