import React, {useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada,errortarea ,agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;
    
    // Effect detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])

    // State del formulario
    const [ tarea, guardarTarea] = useState({
        nombre:''
    })

    // extraer el nombre del state
    const {nombre} = tarea;
    
    // condicionando
    if(!proyecto) return null;
    //destructurando el proyecto
    const [proyectoActual] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // Agregar una nueva tarea
    const onSubmit = e =>{
        e.preventDefault();

        // validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Si es edicion o nueva tarea
        if(tareaseleccionada === null){
    
            // agregar la nueva tarea al state de tareas 
            //se cambia el nombre de proyectId a de proyecto
            // por que en el api el nombre es proyecto
            // y se elimina el tarea.estado = false, por que ya en el
            // modelo de tarea en la base de datos de la api, esta definido
            // como false el estado
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);

        } else {
            // actualizamos la tarea
            actualizarTarea(tarea);
            limpiarTarea();
        }


        // obtenter las tareas filtradas
        obtenerTareas(proyectoActual.id);


        // reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    return ( 

        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        placeholder="Nombre Tarea..."
                        className="input-text"
                        name="nombre" 
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea 
            ? <p className="mensaje error"> El nombre de la tarea debe de ser obligatorio</p>
            : null
            }
        </div>

     );
}
 
export default FormTarea;