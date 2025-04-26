import React from 'react';

const Wellness = () => {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16 font-outfit">
      {/* Artículo 1 - Bienestar mental */}
      <div className="bg-[#FFFDEF] rounded-lg shadow-lg p-12 mb-12">
        {/* Título principal */}
        <h1 className="font-bold text-[2.5rem] text-[#413324] mb-4">
          Bienestar mental
        </h1>
        
        {/* Subtítulo */}
        <h2 className="font-normal italic text-xl text-[#7E7EC3] mb-8">
          El poder de la mente en tu práctica de pilates
        </h2>
        
        {/* Autor y fecha */}
        <p className="text-gray-500 text-sm mb-8">
          Por la Dra. Rocío Rojas | 09 de abril del 2025
        </p>
        
        {/* Párrafo introductorio */}
        <p className="text-lg leading-relaxed text-[#413324] mb-8">
          El bienestar mental es esencial para tener una vida equilibrada, y juega un papel clave en tu práctica de Pilates. Una mente tranquila y enfocada puede transformar tu experiencia en clase, mejorando tu rendimiento físico y emocional. Aquí te contamos cómo:
        </p>
        
        {/* Sección Beneficios */}
        <h3 className="font-semibold text-[1.8rem] text-[#413324] my-8">
          Beneficios del bienestar mental en pilates
        </h3>
        
        {/* Lista de beneficios */}
        <ol className="list-decimal pl-6 space-y-6">
          <li>
            <div className="font-semibold text-lg text-[#7E7EC3] mb-2">
              Mejora tu concentración:
            </div>
            <p className="leading-relaxed text-[#413324]">
              Pilates requiere estar presente en cada movimiento. Cuando tu mente está en calma, puedes concentrarte mejor y lograr una práctica más efectiva.
            </p>
          </li>
          
          <li>
            <div className="font-semibold text-lg text-[#7E7EC3] mb-2">
              Reduce el estrés:
            </div>
            <p className="leading-relaxed text-[#413324]">
              La respiración profunda y el enfoque en el presente ayudan a disminuir el estrés y la ansiedad, dejándote sentir más relajado al final de cada clase.
            </p>
          </li>
          
          <li>
            <div className="font-semibold text-lg text-[#7E7EC3] mb-2">
              Aumenta tu energía:
            </div>
            <p className="leading-relaxed text-[#413324]">
              Al cuidar tu bienestar mental, también te sientes más energético y con mejor disposición para afrontar tu día.
            </p>
          </li>
        </ol>
      </div>

      {/* Divider entre artículos */}
      <div className="my-12 border-t border-gray-200" />

      {/* Artículo 2 */}
      <div className="bg-[#FFFDEF] rounded-lg shadow-lg p-12 mb-12">
        <h1 className="font-bold text-[2.5rem] text-[#413324] mb-4">
          Conexión mente-cuerpo
        </h1>
        
        <p className="text-gray-500 text-sm mb-8">
          Por el Dr. Carlos Méndez | 15 de abril del 2025
        </p>
        
        <p className="text-lg leading-relaxed text-[#413324]">
          La conexión entre mente y cuerpo es fundamental en Pilates. Te explicamos cómo fortalecer esta relación para una práctica más consciente y efectiva.
        </p>
      </div>
    </div>
  );
};

export default Wellness;