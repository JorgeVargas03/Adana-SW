import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import bgImage from '../assets/images/landing-page.jpg';
import img1 from '../assets/images/eligenos1.jpg';
import img3 from '../assets/images/eligenos3.jpg';
import img5 from '../assets/images/eligenos5.jpg';
import img7 from '../assets/images/eligenos7.jpg';
import img9 from '../assets/images/eligenos9.jpg';

const Home = () => {
  return (
    <div>
    {/*SECCION CON IMAGEN LANDING PAGE*/}
    <section 
      className="hero-container"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <h2 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: '5rem', marginTop: '3rem', color: '#FFFDEF'}}>Adana Pilates Estudio</h2>
      <p style={{ fontFamily:"Outfit", fontWeight: 200, fontSize: '2rem'}}>Move beyond your possibilities...</p>
    </section>
    {/* ¿PORQUE ELEGIRNOS? - LANDING PAGE*/}
    <section style={{
      padding: '4rem 2rem',
      backgroundColor: '#F0F1D2',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h2 style={{
        fontFamily: 'Outfit',
        fontWeight: 400,
        textAlign: 'center',
        fontSize: '4rem',
        marginBottom: '2rem',
        color: '#413324'
      }}>¿Por qué elegirnos?</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
      }}>
        {/* Fila 1 */}
        <div style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '22rem',
          height: '22rem'
        }}>
        </div>

        <div style={{
          backgroundColor: '#C3C37E',
          color: '#FFFDEF',
          fontSize: '1.3rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',          // Activa Flexbox
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center',     // Centra verticalmente
          width: '22rem',
          height: '22rem'
        }}>
          <p style={{ fontFamily: 'Outfit',
                      fontWeight: 300
          }}>
          En Adana, cada sesión está 
          diseñada para adaptarse a tu 
          nivel, ritmo y objetivos 
          personales. Nuestros 
          instructores certificados te 
          guían de forma cercana para 
          que avances de forma segura y 
          consciente.
          </p>
        </div>

        <div style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundImage: `url(${img3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '22rem',
          height: '22rem'
        }}>
        </div>

        {/* Fila 2 */}
        <div style={{
          backgroundColor: '#413324',
          color: '#FFFDEF',
          fontSize: '1.3rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',          // Activa Flexbox
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center',     // Centra verticalmente
          width: '22rem',
          height: '22rem'
        }}>
          <p style={{ fontFamily: 'Outfit',
                      fontWeight: 300
          }}>
          Tu cuerpo y mente merecen 
          entrenar en un lugar que inspire 
          calma. Nuestro estudio fue 
          diseñado para que vivas una 
          experiencia tranquila, elegante 
          y llena de buena energía desde 
          que entras.</p>
        </div>

        <div style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundImage: `url(${img5})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '22rem',
          height: '22rem'
        }}>
        </div>

        <div style={{
          backgroundColor: '#413324',
          color: '#FFFDEF',
          fontSize: '1.3rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',          // Activa Flexbox
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center',     // Centra verticalmente
          width: '22rem',
          height: '22rem'
        }}>
          <p style={{ fontFamily: 'Outfit',
                      fontWeight: 300
          }}>
            ¿Mañanas activas o tardes 
            relajantes? En Adana tienes 
            acceso a variedad de horarios, 
            para que integrar el Pilates a tu 
            rutina sea fácil y sostenible.
          </p>
        </div>

        {/* Fila 3 */}
        <div style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundImage: `url(${img7})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '22rem',
          height: '22rem'
        }}>
        </div>

        <div style={{
          backgroundColor: '#C3C37E',
          color: '#FFFDEF',
          fontSize: '1.3rem',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',          // Activa Flexbox
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center',     // Centra verticalmente
          width: '22rem',
          height: '22rem'
        }}>
          <p style={{ fontFamily: 'Outfit',
                      fontWeight: 300
          }}>
            Más allá de lo físico, notarás una mejor 
            postura, menos estrés y más conexión 
            contigo mismo. Descubre por qué nuestras 
            alumnas y alumnos dicen que Adana se 
            siente como un regalo para el cuerpo.
          </p>
        </div>

        <div style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundImage: `url(${img9})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '22rem',
          height: '22rem'
        }}>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
