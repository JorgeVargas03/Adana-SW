import React from 'react';
import ins1 from '../assets/images/personal - 1.jpg';
import ins2 from '../assets/images/personal - 2.jpg';
import ins3 from '../assets/images/personal - 3.jpg';
import ins4 from '../assets/images/personal - 4.jpg';

const Instructors = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Sección título */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontFamily: "Outfit", 
          fontWeight: 700, 
          fontSize: '5rem', 
          marginTop: '2rem',
          textAlign: 'center',
          color: '#413324'
        }}>
          El Equipo Adana
        </h2>
        <p style={{ 
          fontFamily: "Outfit",
          fontWeight: 300,
          fontSize: '1.7rem',
          textAlign: 'center',
          width: 'min(50rem, 90%)',
          color: '#413324',
          margin: '2rem auto',
          lineHeight: '1.6'
        }}>
          En Adana creemos que la energía del espacio la crean las personas que lo habitan. Por eso, nuestras instructoras no solo guían clases: acompañan procesos, inspiran bienestar y transforman cuerpos desde el respeto y la conciencia. Conocé a las mujeres detrás de cada movimiento:
        </p>
      </section>

      {/* Sección grid 2x2 */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: '#F0F1D2',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(300px, 1fr))',
          gap: '3rem',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1200px'
        }}>
          
          {/* Celda 1 - Valeria */}
          <div style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#FFFDEF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px'
          }}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${ins1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'Outfit',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#413324',
                marginBottom: '0.5rem'
              }}>Valeria Cortés</h3>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 600,
                color: '#7E7EC3',
                fontSize: '1.1rem',
                marginBottom: '1.5rem'
              }}>Fundadora de Adana | Especialista en Pilates Terapéutico</p>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: '#413324',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Con más de 10 años de experiencia en movimiento consciente, Valeria creó Adana como un refugio para quienes buscan reconectar con su cuerpo. Su enfoque combina precisión técnica, calidez humana y una mirada profunda sobre el bienestar integral.
              </p>
            </div>
          </div>

          {/* Celda 2 */}
          <div style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#FFFDEF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px'
          }}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${ins2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'Outfit',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#413324',
                marginBottom: '0.5rem'
              }}>Mónica Reyes</h3>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 600,
                color: '#7E7EC3',
                fontSize: '1.1rem',
                marginBottom: '1.5rem'
              }}>Instructora certificada en Pilates Clásico y Danza Contemporánea</p>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: '#413324',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Mónica viene del mundo de la danza, y eso se nota: sus clases fluyen con elegancia y fuerza. Cada sesión con ella es un viaje que fortalece, estira y alinea. Es ideal para quienes buscan un enfoque creativo y exigente, pero amoroso.
              </p>
            </div>
          </div>

          {/* Celda 3 */}
          <div style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#FFFDEF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px'
          }}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${ins3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'Outfit',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#413324',
                marginBottom: '0.5rem'
              }}>Alejandra Vazquez</h3>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 600,
                color: '#7E7EC3',
                fontSize: '1.1rem',
                marginBottom: '1.5rem'
              }}>Pilates para embarazadas y recuperación postparto</p>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: '#413324',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Su sensibilidad y conocimientos la convierten en la guía perfecta para etapas especiales. Acompaña a mujeres a lo largo del embarazo y en su reconexión después del parto. Con ella, cada clase es contención, fuerza y confianza.
              </p>
            </div>
          </div>

          {/* Celda 4 */}
          <div style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#FFFDEF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px'
          }}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${ins4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'Outfit',
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#413324',
                marginBottom: '0.5rem'
              }}>Cecilia Ramírez</h3>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 600,
                color: '#7E7EC3',
                fontSize: '1.1rem',
                marginBottom: '1.5rem'
              }}>Pilates funcional y respiración consciente</p>
              <p style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: '#413324',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Ceci cree en el poder del movimiento como medicina diaria. Sus clases están llenas de presencia y energía vital. Ideal para quienes llegan con estrés, tensiones o simplemente necesitan volver al centro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instructors;