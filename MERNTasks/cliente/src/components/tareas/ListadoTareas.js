import React, {Fragment, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

import Tarea from './Tarea';

const ListadoTareas = () => {

        // obtener el state de proyecto
        const proyectosContext = useContext(proyectoContext);
        const {proyecto, eliminarProyecto} = proyectosContext;

        // condicionando
        if(!proyecto) return <h1>Seleccione una proyecto</h1>

        //destructurando el proyecto
        const [proyectoActual] = proyecto;



    const tareasProyecto = [];

    // elimiar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id);
    }

    return ( 
        <Fragment>

            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                ? 
                    (<li className="tarea"><p>No hay tareas</p></li>)
                :   
                    tareasProyecto.map(tarea =>(
                    <Tarea
                        tarea={tarea}
                    />
                ))
                }
            </ul>
            <button type="button" onClick={onClickEliminar} className="btn btn-eliminar">Eliminar Proyecto &times;</button>
        </Fragment>



     );
}
 
export default ListadoTareas;