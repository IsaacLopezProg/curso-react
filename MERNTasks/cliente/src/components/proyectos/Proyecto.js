import React,{useContext} from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {

    // obtener el state de proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    // obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    // funcion para seleccionar proyecto
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    }

    return ( 
        <li>
            <button
                type="butto"
                className="btn btn-blank"
                onClick={()=>seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;