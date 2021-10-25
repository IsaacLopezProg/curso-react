import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, guardarBusqueda] = useState({
        nombre:'',
        categoria:''
    });

    // funcion para leer los contenidos
    const obtenterDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }


    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar} = useContext(RecetasContext);



    return ( 
        <form className="col-12"
            onSubmit={e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
            }}
        >
            <fieldset>
                <legend className="text-center">
                    Busca bebidas por Categoria o Ingrediente
                </legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenterDatosReceta}
                        />
                </div>
                <div className="col-md-4">
                    <select
                    className="form-control"
                    name="categoria"
                    onChange={obtenterDatosReceta}
                    >
                        <option value="">-- Selecciona Categoria --</option>
                        {categorias.map(categoria =>(
                            <option key={categoria.strCategory}
                                    value={categoria.strCategory}
                                    >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div 
                className="col-md-4"
                >
                    <input 
                     type="submit"
                     className="btn btn-block btn-danger"
                     value="Buscar Bebidas"
                    />
                    
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;