import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {


  // Citas en el local storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  // Arreglo de citas
  const [listcitas, setListcitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando
  // es estate cambia

  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(listcitas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [listcitas]);


  // Funciones que toma las citas actuales y toma la nueva

  const crearCita = cita =>{
    setListcitas([
      ...listcitas,
      cita
    ]);
  }

  // Funcion que elimina a una cita por su id
  const eliminarCita = id =>{
    const nuevasCitas = listcitas.filter(cita => cita.id !== id);
    setListcitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = listcitas.length === 0
  ? 'No hay citas'
  : 'Administra tus citas';


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {listcitas.map(cita => (
                <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
                />
              ))}
              {/* { Object.keys(listcitas).length === 0
              ?
                <div className="cita">
                    <p>No hay ninguna cita, agerga una.</p>
                  </div>
              :
                  Esta es una manera personal condicional
                  para comprobar si un objeto esta vacio
              
              listcitas.map(cita => (
                <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
                />
              ))} */}
            </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
