import React from 'react';
import Head from 'next/head';

const Error: React.FC = () => (  
  <React.Fragment>
    <Head>
      <title>Error</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>#SaleMal</h1>    
    <p>No se ha podido conectar con el servidor</p>
    <a href="#" onClick={(): void => { window.history.back()}}>Volver</a>
  </React.Fragment>
);


export default Error;
