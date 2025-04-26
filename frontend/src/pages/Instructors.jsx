import React from 'react';
import ins1 from '../assets/images/personal - 1.jpg';
import ins2 from '../assets/images/personal - 2.jpg';
import ins3 from '../assets/images/personal - 3.jpg';
import ins4 from '../assets/images/personal - 4.jpg';
import bgImage from '../assets/images/instructors-page.jpg';

const Instructors = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Sección título */}
      <section className="w-screen min-h-[120vh] bg-cover bg-center bg-no-repeat flex flex-col items-center text-center py-32 justify-start relative"
        style={{ backgroundImage: `url(${bgImage})` }}>
          {/* Capa oscura con opacidad */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <h2 className="font-outfit font-bold text-8xl mt-8 text-center text-barcolor z-10 text-shadow-lg pt-14">
          El Equipo Adana
        </h2>
        <p className="font-outfit font-extralight text-[1.7rem] text-center max-w-[50rem] mx-auto text-barcolor my-8 leading-relaxed z-10 text-shadow-lg">
          En Adana creemos que la energía del espacio la crean las personas que lo habitan. Por eso, nuestras instructoras no solo guían clases: acompañan procesos, inspiran bienestar y transforman cuerpos desde el respeto y la conciencia. Conocé a las mujeres detrás de cada movimiento:
        </p>
      </section>

      {/* Sección grid 2x2 */}
      <section className="py-16 px-8 bg-[#F0F1D2] w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1200px]">
          
          {/* Celda 1 - Valeria */}
          <div className="shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg">
            <div 
              className="h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${ins1})` }}
            ></div>
            <div className="p-8 text-center">
              <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
                Valeria Cortés
              </h3>
              <p className="font-outfit font-semibold text-[#7E7EC3] text-[1.1rem] mb-6">
                Fundadora de Adana | Especialista en Pilates Terapéutico
              </p>
              <p className="font-outfit font-light text-[#413324] leading-relaxed text-base">
                Con más de 10 años de experiencia en movimiento consciente, Valeria creó Adana como un refugio para quienes buscan reconectar con su cuerpo. Su enfoque combina precisión técnica, calidez humana y una mirada profunda sobre el bienestar integral.
              </p>
            </div>
          </div>

          {/* Celda 2 - Mónica */}
          <div className="shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg">
            <div 
              className="h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${ins2})` }}
            ></div>
            <div className="p-8 text-center">
              <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
                Mónica Reyes
              </h3>
              <p className="font-outfit font-semibold text-[#7E7EC3] text-[1.1rem] mb-6">
                Instructora certificada en Pilates Clásico y Danza Contemporánea
              </p>
              <p className="font-outfit font-light text-[#413324] leading-relaxed text-base">
                Mónica viene del mundo de la danza, y eso se nota: sus clases fluyen con elegancia y fuerza. Cada sesión con ella es un viaje que fortalece, estira y alinea. Es ideal para quienes buscan un enfoque creativo y exigente, pero amoroso.
              </p>
            </div>
          </div>

          {/* Celda 3 - Alejandra */}
          <div className="shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg">
            <div 
              className="h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${ins3})` }}
            ></div>
            <div className="p-8 text-center">
              <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
                Alejandra Vazquez
              </h3>
              <p className="font-outfit font-semibold text-[#7E7EC3] text-[1.1rem] mb-6">
                Pilates para embarazadas y recuperación postparto
              </p>
              <p className="font-outfit font-light text-[#413324] leading-relaxed text-base">
                Su sensibilidad y conocimientos la convierten en la guía perfecta para etapas especiales. Acompaña a mujeres a lo largo del embarazo y en su reconexión después del parto. Con ella, cada clase es contención, fuerza y confianza.
              </p>
            </div>
          </div>

          {/* Celda 4 - Cecilia */}
          <div className="shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg">
            <div 
              className="h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${ins4})` }}
            ></div>
            <div className="p-8 text-center">
              <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
                Cecilia Ramírez
              </h3>
              <p className="font-outfit font-semibold text-[#7E7EC3] text-[1.1rem] mb-6">
                Pilates funcional y respiración consciente
              </p>
              <p className="font-outfit font-light text-[#413324] leading-relaxed text-base">
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