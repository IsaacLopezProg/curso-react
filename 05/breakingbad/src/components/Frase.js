import React, {useState, Fragment} from 'react';
import styled from '@emotion/styled';


const ContenedorFrase = styled.div`
    padding: 3rem;
    border-radius: .5rem;
    background-color: #fff;
    max-width:800px;
    
    @media (min-width: 992px) {
        margin-top: 10rem;
    }
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        position: relative;
        padding-left: 4rem;
        &::before {
            content: open-quote;
            font-size: 10rem;
            color: black;
            position: absolute;
            left: -1rem;
            top: -2rem;
        }
    }
    p {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1.4rem;
        font-weight:bold;
        text-align: right;
        color: #666;
        margin-top: 2rem;
    }
`;

const Frase = ({frase}) => {

    // const [traducir, guardarTraducir] = useState({
    //     cita:'',
    //     escritor:''
    // });

    // // let prueba = 'Happy Day';

    // const traduce = async () => {

    //     try{

    //     let endpoint = await fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?q=${frase.quote}&langpair=en%7Ces&de=a%40b.c&onlyprivate=0&mt=1`, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "translated-mymemory---translation-memory.p.rapidapi.com",
    //         "x-rapidapi-key": "a5a182fd2fmsh1621521d0263aebp1f3a35jsn3c4aea10ac34"
    //     }
    //     });
    //     let respuesta = await endpoint.json();
    //     // console.log(respuesta.responseData);
    //     let  traducido = respuesta.responseData.translatedText;
    //     setTimeout(() => {
    //         guardarTraducir({
    //             cita: traducido,
    //             escritor:frase.author
    //         });
    //     }, 3000);
        

    //     // if (!respuesta.ok) throw { status: respuesta.responseStatus, statusText: respuesta.responseDetails };
    //     }catch (err) {
    //         console.error(err);
    //   }
    // }

    // traduce();




    return ( 
        
        <ContenedorFrase>
            {/* {(!traducir.cita === '' || traducir.cita !== 'indefinido'  ) */}
                <Fragment>
                    <h1>{frase.quote}</h1>                    {/* <h1>{traducir.cita}</h1>  */}
                    <p>{frase.author}</p>                            {/* <p>{traducir.escritor}</p>   */}
                </Fragment>            
        </ContenedorFrase>
     );
}
 
export default Frase;
