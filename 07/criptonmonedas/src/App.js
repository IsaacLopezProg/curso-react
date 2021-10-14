import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import imagen from './cryptomonedas.png';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import styled from '@emotion/styled';
import Axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {


  const [moneda, guardarMoneda] = useState('');
  const [criptomodena, guardarCritomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  useEffect(()=>{

    const cotizarCriptonmoneda = async () => {
      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomodena}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);
      // mostrar el espinner
      guardarCargando(true);

      // ocultar el spiner
      setTimeout(() => {

        // cambiar el estado de cargando
        guardarCargando(false);


        // guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomodena][moneda]);
      }, 3000)


    }

    cotizarCriptonmoneda();

  }, [moneda, criptomodena])


  // mostrar el espinner o resultado

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;



  return (
    <Contenedor>
        <div>
          <Imagen 
            src={imagen}
            alt="imagen cripto"
          />
        </div>
        <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario 
              guardarCritomoneda={guardarCritomoneda}
              guardarMoneda={guardarMoneda}
            />
            
            {componente}

        </div>
    </Contenedor>
  );
}

export default App;
