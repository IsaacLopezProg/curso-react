// https://reactjs.org/docs/higher-order-components.html
// un componente que tiene componentes dentro ahora lo
// vamos a utilizar para la seguridad de componentes

import React, {useEffect, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component:Component, ...props }) =>{

    const authContext = useContext(AuthContext);
    const {autenticacion,cargando, usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
    },[])

    return(
        <Route { ...props} render={ props => !autenticacion && !cargando ?
            (
                <Redirect to="/" />
            ) :
            (
                <Component {...props} />
            )
            }
        />
    );


}

export default RutaPrivada;