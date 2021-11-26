import React, {useContext, useEffect} from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Proyecto from './Proyecto';



const ListadoProyectos = () => {

        // Extraer proyectos de estate inicial
        const proyectosContext = useContext(proyectoContext);
        const {proyectos, obtenerProyectos} = proyectosContext;

        useEffect(() =>{
            obtenerProyectos();
        },[])
    
        if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return ( 

        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
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
