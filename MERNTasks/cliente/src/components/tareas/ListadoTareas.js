import React, {Fragment, useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Tarea from './Tarea';

const ListadoTareas = () => {

        // obtener el state de proyecto
        const proyectosContext = useContext(proyectoContext);
        const {proyecto, eliminarProyecto} = proyectosContext;

        // obtener el state de tareas
        const tareasContext = useContext(tareaContext);
        const {tareasproyecto} = tareasContext;


        // condicionando
        if(!proyecto) return <h1>Seleccione una proyecto</h1>

        //destructurando el proyecto
        const [proyectoActual] = proyecto;


    // elimiar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>

            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                ? 
                    (<li className="tarea"><p>No hay tareas</p></li>)
                :   
                    <TransitionGroup>
                    {tareasproyecto.map(tarea =>(
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                                />
                        </CSSTransition>
                ))}
                        </TransitionGroup>
                }
            </ul>
            <button type="button" onClick={onClickEliminar} className="btn btn-eliminar">Eliminar Proyecto &times;</button>
        </Fragment>



     );
}
 
export default ListadoTareas;