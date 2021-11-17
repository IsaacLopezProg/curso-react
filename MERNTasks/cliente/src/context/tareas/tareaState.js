
import React, {useReducer} from 'react';
import tareaReducer from './tareaReducer';
import TareaContext from './tareaContext';

const TareaState = props => {
    const initialState = {
        tareas : [ 
            {nombre:'Elegir Plataforma', estado:true},
            {nombre:'Elegir Colores', estado:false},
            {nombre:'Elegir Plataforma de pago', estado:true},
            {nombre:'Elegir Hosting', estado:false}
    ],
    }

    // crear el state y el dispatch
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    return (
        <TareaContext.Provider>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;