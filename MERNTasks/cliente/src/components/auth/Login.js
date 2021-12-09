import React, {useState, useContext, useEffect} from 'react';

import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';

import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    // obtener el state del alerta
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    // obtener el state del auth
    const authContext = useContext(AuthContext);
    const {mensaje,autenticacion, iniciarSesion} = authContext;

    // en caso de que el password o el usuario no exista
    useEffect(() => {
        if(autenticacion){
            props.history.push('/proyectos'); //redirecciona a una pagina
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
    },[mensaje, autenticacion, props.history]);


    // state para iniciar Sesion
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    // extraer de usuario

    const {email, password} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });

    }

    // cuando el usuario quiere inicar sesion
    const onSubmit = e =>{
        e.preventDefault();

        // validar que los campos no esten vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // pasarlor al action

        iniciarSesion({
            email, password
        })

    }


    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;