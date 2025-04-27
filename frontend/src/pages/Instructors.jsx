import React from 'react';
import ins1 from '../assets/images/personal - 1.jpg';
import ins2 from '../assets/images/personal - 2.jpg';
import ins3 from '../assets/images/personal - 3.jpg';
import ins4 from '../assets/images/personal - 4.jpg';
import bgImage from '../assets/images/instructors-page.jpg';

const Instructors = () => {
  return (
    <div className="w-full overflow-x-hidden font-Outfit">
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
<section className="py-16 px-8 bg-accent1/70 w-full flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1200px] rounded-lg p-8 relative w-full">
    
    {/* Líneas decorativas */}
    <div className="absolute inset-0 m-4 rounded-lg pointer-events-none"></div>
    
    {/* Celda 1 - Valeria */}
    <div className="group shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
          style={{ backgroundImage: `url(${ins1})` }}
        ></div>
        <div className="absolute inset-0 p-6 flex items-center justify-center bg-[#7E7EC3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-outfit font-light text-[#FFFDEF] text-center leading-relaxed">
            Con más de 10 años de experiencia en movimiento consciente, Valeria creó Adana como un refugio para quienes buscan reconectar con su cuerpo.
          </p>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-outfit font-semibold text-xl text-[#413324] mb-2">
          Valeria Cortés
        </h3>
        <p className="font-outfit font-normal text-[#7E7EC3] text-md">
          Fundadora de Adana | Especialista en Pilates Terapéutico
        </p>
      </div>
    </div>

    {/* Celda 2 - Mónica */}
    <div className="group shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
          style={{ backgroundImage: `url(${ins2})` }}
        ></div>
        <div className="absolute inset-0 p-6 flex items-center justify-center bg-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-outfit font-light text-white text-center leading-relaxed">
            Sus clases fluyen con elegancia y fuerza. Cada sesión es un viaje que fortalece, estira y alinea.
          </p>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
          Mónica Reyes
        </h3>
        <p className="font-outfit font-normal text-[#7E7EC3] text-md">
          Instructora certificada en Pilates Clásico y Danza Contemporánea
        </p>
      </div>
    </div>

    {/* Celda 3 - Alejandra */}
    <div className="group shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
          style={{ backgroundImage: `url(${ins3})` }}
        ></div>
        <div className="absolute inset-0 p-6 flex items-center justify-center bg-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-outfit font-light text-white text-center leading-relaxed">
            Acompaña a mujeres en el embarazo y postparto con contención, fuerza y confianza.
          </p>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
          Alejandra Vazquez
        </h3>
        <p className="font-outfit font-normal text-[#7E7EC3] text-md">
          Pilates para embarazadas y recuperación postparto
        </p>
      </div>
    </div>

    {/* Celda 4 - Cecilia */}
    <div className="group shadow-lg bg-[#FFFDEF] flex flex-col overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
          style={{ backgroundImage: `url(${ins4})` }}
        ></div>
        <div className="absolute inset-0 p-6 flex items-center justify-center bg-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-outfit font-light text-white text-center leading-relaxed">
            Clases llenas de presencia y energía vital para combatir el estrés y tensiones.
          </p>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-outfit font-bold text-xl text-[#413324] mb-2">
          Cecilia Ramírez
        </h3>
        <p className="font-outfit font-normal text-[#7E7EC3] text-md">
          Pilates funcional y respiración consciente
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Instructors;