import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {

  // definir la categoria y noticias
  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias ] = useState([]);

  useEffect(()=>{
    const consultarAPI =async () => {
      const token = '8d5579935fa9418a83f439853556e2ef';
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${token}`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();

      guardarNoticias(noticias.articles);
    }

    consultarAPI();
  }, [categoria])



  return (
    <Fragment>
      <Header 
      titulo='Buscador de Noticias'
      />
      <Formulario 
        guardarCategoria ={guardarCategoria}
      />

      <ListadoNoticias noticias={noticias} />
    </Fragment>
  );
}

export default App;
