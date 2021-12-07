import React, {useContext, useEffect} from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Proyecto from './Proyecto';

import AlertaContext from '../../context/alertas/alertaContext';


const ListadoProyectos = () => {

        // Extraer proyectos de estate inicial
        const proyectosContext = useContext(proyectoContext);
        const {proyectos, mensaje, obtenerProyectos} = proyectosContext;

        const alertaContext = useContext(AlertaContext);
        const {alerta, mostrarAlerta} = alertaContext;

        useEffect(() =>{

            // si hay un error
            if(mensaje){
                mostrarAlerta(mensaje.msg, mensaje.categoria);
            }


            obtenerProyectos();
        },[mensaje])
    
        if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return ( 

        <ul className="listado-proyectos">
        {alerta?
        (
            <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ):
        null
        }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

     );
}
 
export default ListadoProyectos;
