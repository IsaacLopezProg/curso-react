import React, {useEffect, useState} from 'react';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptnomeda';
import Error from './Error';

import styled from '@emotion/styled';
import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarCritomoneda, guardarMoneda}) => {

    // state del listado de criptomodenas
    const [listacripto, guardarCritomonedas ] = useState([]);
    const [ error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    // utilizar useModena
    const [ moneda, SelectMonedas, actualizarState] = useMoneda('Elige tu Moneda','', MONEDAS);
    
    // utilizar useCriptomoneda
    const [criptomodena, SelectCrip ] = useCriptomoneda('Elige tu Criptomodena','', listacripto);    
    
    
    useEffect(() => {
        const consultatAPI = async () => {
            const endpoint = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
            const resultado = await Axios.get(endpoint);
            guardarCritomonedas(resultado.data.Data);
        }
        consultatAPI();
    },[]);



    const cotizarMoneda = e =>{
        e.preventDefault();

        // validacion
        if(moneda === '' || criptomodena === ''){
            guardarError(true);

            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCritomoneda(criptomodena);


    }


    return ( 
        <form 
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />
            <SelectCrip />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

export default Formulario;