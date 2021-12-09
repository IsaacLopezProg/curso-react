import React, {useState, useContext, useEffect} from 'react';

import { Link } from 'react-router-dom'

import AlertaContext from '../../context/alertas/alertaContext';

import AuthContext from '../../context/autenticacion/authContext';
const NuevaCuenta = (props) => {

    // state para iniciar Sesion
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    // extraer de usuario

    const {nombre, email, password, confirmar} = usuario;

 
    // obtener el state del alerta
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    // obtener el state del auth
    const authContext = useContext(AuthContext);
    const {mensaje,autenticacion,registrarUsuario} = authContext;

    // en caso de que el usuario se halla autenticado o registrado o sea un 
    // registro duplicado

    useEffect(() => {
        if(autenticacion){
            props.history.push('/proyectos'); //redirecciona a una pagina
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line

    },[mensaje, autenticacion, props.history, mostrarAlerta]);



    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });

    }

    // cuando el usuario quiere inicar sesion
    const onSubmit = e =>{
        e.preventDefault();

        
        // Validar que no existen campos vacios
        if(nombre.trim() === ''  ||
            email.trim() === '' ||
            password.trim() === ''||
            confirmar.trim() === '') {
                mostrarAlerta('Todos los campos son obligatorios','alerta-error');
                return;
        }

        // si el password es menor de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe de ser de almenos 6 caracteres', 'alerta-error');
            return;
        }

        // los 2 password no son iguales
        if(password !== confirmar){
            mostrarAlerta('Los 2 password no son iguales','alerta-error');
        }


        // pasarlo al action

        registrarUsuario({
            nombre,
            email,
            password
        });

    }


    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">
                            Nombre
                        </label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">
                            Confirmar Password
                        </label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;