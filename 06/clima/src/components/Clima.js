import React, {Fragment} from 'react';

const Clima = ({clima}) => {

    // extraer los valores
    const {temperatura, temperatura_max, temperatura_min, descripcion} = clima;
    if(!clima) return null;

    return ( 
        <Fragment>
            <h5 className="card-title text-center">Este es su estado del tiempo:</h5>
            <p className="card-text mt-3 mb-3 text-center fs-1">{temperatura}  <span> &#x2103; </span></p>
            <p className="card-text text-center">Temperatura Maxima: {temperatura_max} <span> &#x2103; </span></p>
            <p className="card-text text-center">Temperatura Minima:{temperatura_min} <span> &#x2103; </span></p>
            <p className="card-text text-center">Descripcion de  tiempo: <span className="fs-5 text-bold">{descripcion}</span></p>
        </Fragment>
     );
}
 
export default Clima;