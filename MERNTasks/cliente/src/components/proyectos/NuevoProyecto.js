import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectoContext';

const NuevoProyectos = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, mostrarFormulario} = proyectosContext;



    // state para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    // extraer nombre de proyecto
    const {nombre} = proyecto;


    // lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })

    }

    // cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }


    return ( 
        <Fragment>
            <button 
                type="button"
                className=" btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {
                formulario
                    ?
                        (
                            <form 
                                className="formulario-nuevo-proyecto"
                                onSubmit={onSubmitProyecto}
                            >
                                <input 
                                    type="text"
                                    className="input-text"
                                    placeholder="Nombre Proyecto"
                                    name="nombre"
                                    onChange={onChangeProyecto}
                                    value={nombre} 

                                />

                                <input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value="Agregar Proyecto"
                                    
                                    />
                            </form>
                        )
                        :
                        null
            }
        </Fragment>

     );
}
 
export default NuevoProyectos;