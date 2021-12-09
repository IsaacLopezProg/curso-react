import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

import { REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticacion : null,
        usuario: null,
        mensaje: null,
        cargando: true,
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // las funciones

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            // console.log(respuesta);
            //respuesta y error son los payload que vamos a pasar al mensaje

            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            });

            // obtener usuario
            usuarioAutenticado();

        } catch (error) { //si el usuario esta registrado este es el error
            // console.error(error.response);

            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
            })
        }
    }


    // RETORNA EL USUARIO AUTENTICADO
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data
            })
        } catch (error) {
            console.error(error.response);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inica sesion
    const iniciarSesion = async datos =>{
        try {
            
            const respuesta = await clienteAxios.post('/api/auth',datos);
            // console.log(respuesta.data);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            });

            // obtener usuario
            usuarioAutenticado();

        } catch (error) {
             console.error(error.response);

             const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }

    // cerrar la sesion

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticacion: state.autenticacion,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}

        </authContext.Provider>

    )
}

export default AuthState;
