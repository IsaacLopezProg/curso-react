import { REGISTRO_EXITOSO, 
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION
    } from '../../types';

export default(state,action) => {
	switch (action.type) {

        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token); //pasamos el token al storage con setItem
            return{
                ...state,
                autenticacion: true, 
                mensaje:null,
                cargando:false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload,
                autenticacion: true,
                cargando:false
            }

        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                usuario: null,
                autenticacion: null,
                mensaje:action.payload,
                cargando:false
            }


		default:
			return state;
	}
}