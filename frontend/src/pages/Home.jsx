import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <section>
      <h2>ADANA PILATES ESTUDIO</h2>
      <p>Move beyond your possibilities...</p>
      <Button style={{ backgroundColor: '#7E7EC3'}} onClick={() => alert('¡Hola desde Home!')}>Click aquí</Button>
    </section>
  );
};

export default Home;
