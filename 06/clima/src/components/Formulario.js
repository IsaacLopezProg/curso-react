import React, {Fragment} from 'react';

const Formulario = ({ciudad, valorciudad, guardarCiudad, guardarConsultar, setCoordenadas, setPais}) => {

    const handleChangeCiudad = e =>{
        let enter = e.key;

        if(enter === "enter" || enter === "Enter"){
            console.log(e.target.value)
            guardarCiudad({
                ...ciudad,
                [e.target.name] : e.target.value
            });
            guardarConsultar(true);
        }   
    }

    const handleChangePais = e => {
        if(Object.entries(valorciudad).length !== 0){
            let l = e.target.value;

            setPais(l);

            let q = document.getElementById(l);
            let latitud = q.dataset.lat;
            let longitud = q.dataset.lon;

            setCoordenadas({
                latitud,
                longitud
            });
        }
    }

    const handleForm = e =>{
        // actualizar el state
        let enter = e.key;
        if(enter === "enter" || enter === "Enter"){
            e.preventDefault();
        }
    } 

    return ( 
        <form  onKeyDown={handleForm} >
            <div className="mt-3 mb-3 col col-sm-12">
                <label htmlFor="ciudad" className="form-label text-white fs-5 ">Ciudad:</label>
                <input
                    className="form-control" 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onKeyDown={handleChangeCiudad}

                />
            </div>
            <div className="mt-3 mb-3 col col-sm-12">
                <label className="form-label text-white fs-5 " htmlFor="Pais">Pais:</label>
                <select
                    className="form-select"
                    name="pais"
                    id="pais"
                    aria-label="Paises"
                    onChange={handleChangePais}
                >
                    {
                        (Object.keys(valorciudad).length <= 1)
                    ?
                        null
                    :
                     <Fragment>
                        {valorciudad.map(cities =>(
                            <option name="Ciudad" id={cities.place_name} key={cities.id} value={cities.place_name} data-lat={cities.center[1]} data-lon={cities.center[0]}>{cities.place_name}</option>
                            ))}
                        </Fragment> 
                        }
            </select>
            </div>
        </form>
     );
}
 
export default Formulario;