import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'; 

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProductos = () => {

     // state del componente
     const [nombre, guardarNombre] = useState('');
     const [precio, guardarPrecio] = useState(0);
 

    // utilizar use dispatch y te crea una función
    const dispatch = useDispatch();
    const navigate = useNavigate(); // activando navigate para rediccion


    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );


    // llamando al state del store
    // const store = useSelector(state => state);
    // console.log(store);
    // const cargando = useSelector(state => state.productos.cargando);
    const error = useSelector(state => state.productos.error);

    // alerta del state de alerta
    const alerta = useSelector(state => state.alerta.alerta);



    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // validar formulario
        if(nombre.trim() === '' || precio <= 0) {
            
            const alerta = {
                msg:'Todos los campos son obligatorios',
                class:'alert alert-danger text-center text-uppercase p3',
            }

            dispatch(mostrarAlerta(alerta));
            return;
        }

        // si no hay errores
        dispatch(ocultarAlertaAction());
        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        navigate('/'); // redireccionado
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta? 
                        <p className={alerta.class}>{alerta.msg}</p>
                        :
                        null
                        }

                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e =>  guardarPrecio( Number(e.target.value) )}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {error ? <p className="alert alert-danger p2 mt-2 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default NuevoProductos; 