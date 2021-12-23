import React from 'react';

import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProductos from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

// ROUTING
import {
  BrowserRouter,
  Routes, // Just Use Routes instead of "Switch"
  Route,
} from "react-router-dom";


// Redux
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
              <Header />
                <div className="container mt-5">
                <Routes>
                    <Route exact path="/" element={<Productos />} ></Route>
                    <Route exact path="/productos/nuevo" element={<NuevoProductos />}></Route>
                    <Route exact path="/productos/editar/:id" element={<EditarProducto />} ></Route>
                </Routes>
            </div>
            </Provider>
        </BrowserRouter>
  );
}

export default App;
