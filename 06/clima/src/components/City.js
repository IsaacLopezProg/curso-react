import React from 'react';
import Clima from './Clima';

const City = ({pais, clima}) => {

    if(!pais) return null;
    return ( 
        <div className="card bg-white col col-sm-12 mt-2 mb-2">
            <div className="card-body">
                <h5 className="card-title text-center">El nombre de la ciudad es:</h5>
                <p className="card-subtitle mb-2 text-center">{pais}</p>
                <Clima 
                    clima={clima}    
                />
            </div>
        </div>
     );
}

export default City;

