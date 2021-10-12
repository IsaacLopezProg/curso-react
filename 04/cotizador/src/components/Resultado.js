import React from 'react';
import styled from '@emoticion/styled';

const TextoCotizacion = styled.p`
	color:00838F;
	padding: 1rem;
	text-transform: uppercase;
	font-weigth:bold;
	margin:0;
`

const Resultado = ({cotizacion}) =>{
	return(
			<TextoCotizacion>El total es de $:{cotizacion}</TextoCotizacion>
		);
}

export default Resultado;