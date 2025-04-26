import bgImage from '../assets/images/landing-page.jpg';
import img1 from '../assets/images/eligenos1.jpg';
import img3 from '../assets/images/eligenos3.jpg';
import img5 from '../assets/images/eligenos5.jpg';
import img7 from '../assets/images/eligenos7.jpg';
import img9 from '../assets/images/eligenos9.jpg';

import React from 'react';

const Home = () => {
  return (
    <div className="font-outfit bg-barcolor text-gray-800 min-h-full w-full overflow-x-hidden">
      {/* Hero Section */}
      <section 
  className="w-screen min-h-[120vh] bg-cover bg-center bg-no-repeat flex flex-col items-center text-center py-32 justify-start relative"
  style={{ backgroundImage: `url(${bgImage})` }}>
  
  {/* Capa oscura con opacidad */}
  <div className="absolute inset-0 bg-black/50 z-0"></div>
  
  <h2 className="font-Outfit font-bold text-8xl mt-30 text-barcolor relative z-10 text-shadow-lg">
    Adana Pilates Estudio
  </h2>
  <p className="font-Outfit font-extralight text-3xl text-barcolor relative z-10 text-shadow-lg pt-2">
    Move beyond your possibilities...
  </p>
</section>

      {/* Main Content */}
      <div className="flex-1 bg-bgcolor/70 w-full py-16 items-center">
        <section className="h-full w-full max-w-[1800px] mx-auto px-4 items-center">
          <h2 className="font-outfit text-center text-7xl mb-10 text-[#413324]">
            ¿Por qué elegirnos?
          </h2>
          
          {/* Grid de 9 elementos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {/* Fila 1 */}
            <div 
              className="w-100 h-100 bg-cover bg-center shadow-lg filter grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 hover:scale-105 overflow-hidden" 
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
            
            <div className="w-100 h-100 bg-accent1 text-barcolor p-8 shadow-lg flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-fontdef overflow-hidden">
              <p className="font-outfit font-light text-2xl">
                En Adana, cada sesión está diseñada para adaptarse a tu nivel,
                ritmo y objetivos personales...
              </p>
            </div>
            
            <div 
              className="w-100 h-100 bg-cover bg-center shadow-lg filter grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 hover:scale-105 overflow-hidden" 
              style={{ backgroundImage: `url(${img3})` }}
            ></div>

            {/* Fila 2 */}
            <div className="w-100 h-100 bg-accent1 text-barcolor p-8 shadow-lg flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:bg-fontdef hover:scale-105 overflow-hidden">
              <p className="font-outfit font-light text-2xl">
                Tu cuerpo y mente merecen entrenar en un lugar que inspire calma...
              </p>
            </div>
            
            <div 
              className="w-100 h-100 bg-cover bg-center shadow-lg filter grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 hover:scale-105 overflow-hidden" 
              style={{ backgroundImage: `url(${img5})` }}
            ></div>
            
            <div className="w-100 h-100 bg-accent1 text-barcolor p-8 shadow-lg flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:bg-fontdef hover:scale-105 overflow-hidden">
              <p className="font-outfit font-light text-2xl">
                ¿Mañanas activas o tardes relajantes? En Adana tienes acceso a
                variedad de horarios...
              </p>
            </div>

            {/* Fila 3 */}
            <div 
              className="w-100 h-100 bg-cover bg-center shadow-lg filter grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 hover:scale-105 overflow-hidden" 
              style={{ backgroundImage: `url(${img7})` }}
            ></div>
            
            <div className="w-100 h-100 bg-accent1 text-barcolor p-8 shadow-lg flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:bg-fontdef hover:scale-105 overflow-hidden">
              <p className="font-outfit font-light text-2xl">
                Más allá de lo físico, notarás una mejor postura, menos estrés...
              </p>
            </div>
            
            <div 
              className="w-100 h-100 bg-cover bg-center shadow-lg filter grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 hover:scale-105 overflow-hidden" 
              style={{ backgroundImage: `url(${img9})` }}
            ></div>
          </div>
        </section>
        </div>
      </div>
  );
};

export default Home;