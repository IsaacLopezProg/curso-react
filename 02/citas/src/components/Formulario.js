import React, {Fragment, useState} from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, setCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });



    // Creando state de manejo de error en la autenticacion

    const [ error, setError ] = useState(false);

    //Funcion que se ejecuta cada vez que se actualiza el state
    // Actualizando el State
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name] : e.target.value, 
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;


    // Cuando el usuario preciosta el boton de cita
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if( mascota.trim() === '' || propietario.trim() === '' || 
            fecha.trim() === '' || hora.trim() === '' ||
            sintomas.trim() === '' ){
               
                setError(true);
                return;
            }



        // Eliminar el mensaje previo
        setError(false);

        // Asignar un ID, el cita.id es un nuevo valor agergado
        // al objeto de cita, directamente desde fuera del objeto
        cita.id = v4();
        console.log(cita);

        // Crear la cita
        crearCita(cita);


        // Reiniciar el form
        setCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        });


    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error 
            ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null
            }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del Dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                >  
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;