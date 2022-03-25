import React,{Fragment} from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';

import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';

export default function CrearCuenta() {
  return (
    <div>
      <Layout>
        <h1           css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >Crear cuenta</h1>
      <>
                <Formulario>
                    <Campo>
                        <label htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            id="nombre"
                            name="nombre"
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Tu correo"
                            id="email"
                            name="email" 
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Tu password"
                            id="password"
                            name="password"
                        />
                    </Campo>
                    <InputSubmit 
                      type="submit"
                      value="Crear Cuenta"
                    />
                </Formulario>
                </>
      </Layout>
    </div>
  )
}
