import React from 'react';
import bgImage from '../assets/images/landing-page.jpg';
import img1 from '../assets/images/eligenos1.jpg';
import img3 from '../assets/images/eligenos3.jpg';
import img5 from '../assets/images/eligenos5.jpg';
import img7 from '../assets/images/eligenos7.jpg';
import img9 from '../assets/images/eligenos9.jpg';

const Home = () => {
  return (
    <div>
      {/* SECCION CON IMAGEN LANDING PAGE */}
      <section
        className="hero-container bg-cover bg-center bg-no-repeat flex flex-col items-center text-center py-32"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2 className="font-outfit font-bold text-[5rem] mt-12 text-[#FFFDEF]">
          Adana Pilates Estudio
        </h2>
        <p className="font-outfit font-extralight text-[2rem] text-white">
          Move beyond your possibilities...
        </p>
      </section>

      {/* ¿POR QUÉ ELEGIRNOS? */}
      <section className="py-16 px-4 bg-[#F0F1D2] max-w-[1200px] mx-auto">
        <h2 className="font-outfit font-normal text-center text-[4rem] mb-8 text-[#413324]">
          ¿Por qué elegirnos?
        </h2>

        {/* CONTENEDOR PRINCIPAL MODIFICADO */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center w-full">
            {/* CARD 1 */}
            <div
              className="w-[22rem] h-[22rem] bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img1})` }}
            ></div>

            <div className="w-[22rem] h-[22rem] bg-[#C3C37E] text-[#FFFDEF] text-[1.3rem] p-8 shadow-lg flex items-center justify-center text-center">
              <p className="font-outfit font-light">
                En Adana, cada sesión está diseñada para adaptarse a tu nivel,
                ritmo y objetivos personales. Nuestros instructores certificados
                te guían de forma cercana para que avances de forma segura y
                consciente.
              </p>
            </div>

            <div
              className="w-[22rem] h-[22rem] bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img3})` }}
            ></div>

            {/* CARD 2 */}
            <div className="w-[22rem] h-[22rem] bg-[#413324] text-[#FFFDEF] text-[1.3rem] p-8 shadow-lg flex items-center justify-center text-center">
              <p className="font-outfit font-light">
                Tu cuerpo y mente merecen entrenar en un lugar que inspire calma.
                Nuestro estudio fue diseñado para que vivas una experiencia
                tranquila, elegante y llena de buena energía desde que entras.
              </p>
            </div>

            <div
              className="w-[22rem] h-[22rem] bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img5})` }}
            ></div>

            <div className="w-[22rem] h-[22rem] bg-[#413324] text-[#FFFDEF] text-[1.3rem] p-8 shadow-lg flex items-center justify-center text-center">
              <p className="font-outfit font-light">
                ¿Mañanas activas o tardes relajantes? En Adana tienes acceso a
                variedad de horarios, para que integrar el Pilates a tu rutina
                sea fácil y sostenible.
              </p>
            </div>

            {/* CARD 3 */}
            <div
              className="w-[22rem] h-[22rem] bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img7})` }}
            ></div>

            <div className="w-[22rem] h-[22rem] bg-[#C3C37E] text-[#FFFDEF] text-[1.3rem] p-8 shadow-lg flex items-center justify-center text-center">
              <p className="font-outfit font-light">
                Más allá de lo físico, notarás una mejor postura, menos estrés y
                más conexión contigo mismo. Descubre por qué nuestras alumnas y
                alumnos dicen que Adana se siente como un regalo para el cuerpo.
              </p>
            </div>

            <div
              className="w-[22rem] h-[22rem] bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${img9})` }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;