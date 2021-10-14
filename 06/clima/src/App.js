import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import City from './components/City';


// const color

function App() {

   // state del formulario
  const [ciudad, guardarCiudad ] = useState({
    ciudad:'',
  }) 
  const [valorciudad, setvalorCiudad] = useState([{}]);

  const [buscar, guardarConsultar] = useState(false);
  const [pais, setPais] = useState('');
  const [coordenas, setCoordenadas ] = useState({
    latitud:'',
    longitud:''
  })
  const [clima, setClima] = useState({
    temperatura:'',
    temperatura_max:'',
    temperatura_min:'',
    descripcion:''
  })

  useEffect(() => {
    
      const consultarCiudad = async () => {
  
        if(buscar){
  
          const ciudadToken = 'pk.eyJ1IjoiaXNhYWNsb3BlenByb2ciLCJhIjoiY2t1YmxvZ2dmMHJzajJ3cTZmbnkwMHQ5NyJ9.wopL-eJtH4musRspImoBLw';
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad.ciudad}.json?access_token=${ciudadToken}&limit=5&language=es`;
          const respuesta = await fetch(url);
          const res = await respuesta.json();
          const resultado = res.features;
          console.log(resultado);
          console.log(ciudad);
          // return resultado;

          setvalorCiudad(resultado);
          guardarConsultar(false);
        }
    }
    consultarCiudad();
  },[ciudad,buscar])

  useEffect(() => {
    

    const consultarClima = async () => {

      
      const {latitud, longitud} = coordenas;
      if(latitud.trim() === '' || longitud.trim() === ''){
        return null;
      }

      

        const climaToken = '5ec9319031dac6e4d54b269d01d579a7';
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${climaToken}&units=metric&lang=es`;
        const respuestaclima = await fetch(url);
        const resclima = await respuestaclima.json();
        setClima({
          temperatura:resclima.main.temp,
          temperatura_max:resclima.main.temp_max,
          temperatura_min:resclima.main.temp_min,
          descripcion:resclima.weather[0].description
        })
      
  }
  consultarClima();
},[coordenas,buscar])


  return (
    <Fragment>
      <Header  titulo='Clima React App' />

    <div className="container-fluid">
        <div className="row  bg-info bg-gradient p-2 text-dark bg-opacity-75">
          <div className="col-md-6 col-sm-12 ">
          
                <Formulario 
                  valorciudad={valorciudad}
                  ciudad={ciudad}
                  guardarCiudad={guardarCiudad}
                  guardarConsultar={guardarConsultar}
                  setCoordenadas={setCoordenadas}
                  setPais={setPais}
                />
            
          </div>
          <div className="col-md-6 col-sm-12 ">
            {
              (Object.keys(valorciudad).length <= 1)
              ?
                null
              :
                <Fragment>
                  <City 
                    pais={pais}
                    clima={clima}
                  />
                </Fragment>
            }
        </div>
        </div>
      </div>

    </Fragment>
    
  );
}

export default App;
