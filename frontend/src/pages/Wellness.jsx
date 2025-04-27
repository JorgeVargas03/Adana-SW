import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Dialog } from '@headlessui/react';

const Wellness = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articles = [
    {
      id: 1,
      title: 'Bienestar mental',
      subtitle: 'El poder de la mente en tu práctica de pilates',
      author: 'Dra. Rocío Rojas',
      date: '09 de abril del 2025',
      content: `El bienestar mental es esencial para tener una vida equilibrada, y en Adana Pilates Studio entendemos que la conexión mente-cuerpo es fundamental. Nuestro enfoque holístico integra técnicas de respiración consciente con movimientos precisos para crear una experiencia transformadora. Descubre cómo una práctica regular puede ayudarte a:
      
      - Reducir los niveles de estrés cotidiano
      - Mejorar tu concentración en actividades diarias
      - Desarrollar mayor conciencia corporal
      - Equilibrar tus emociones a través del movimiento`,
      benefits: [
        'Mejora tu concentración',
        'Reduce el estrés',
        'Aumenta tu energía',
        'Mejora la calidad del sueño'
      ],
      category: 'Salud Mental'
    },
    {
      id: 2,
      title: 'Respiración Consciente',
      subtitle: 'La clave para un Pilates transformador',
      author: 'Lic. Martín Gómez',
      date: '15 de abril del 2025',
      content: `La respiración es el puente entre el cuerpo y la mente. En este artículo exploraremos:
      
      • Técnicas básicas de respiración diafragmática
      • Cómo sincronizar la respiración con el movimiento
      • Ejercicios para aumentar la capacidad pulmonar
      • Errores comunes y cómo evitarlos
      
      Nuestros instructores certificados te guiarán en un viaje de descubrimiento corporal a través de la respiración consciente.`,
      benefits: [
        'Oxigenación muscular mejorada',
        'Mayor control de los movimientos',
        'Reducción de tensiones',
        'Mejor postura natural'
      ],
      category: 'Técnicas Avanzadas'
    },
    {
      id: 3,
      title: 'Pilates Postparto',
      subtitle: 'Recuperación segura y efectiva',
      author: 'Lic. Laura Fernández',
      date: '22 de abril del 2025',
      content: `La etapa postparto requiere cuidados especiales. Nuestro programa incluye:
      
      - Ejercicios para fortalecer el suelo pélvico
      - Rutinas para recuperar la fuerza abdominal
      - Técnicas de relajación para nuevas madres
      - Adaptaciones progresivas según tu evolución
      
      Trabajamos en conjunto con fisioterapeutas especializados para garantizar una recuperación segura y personalizada.`,
      benefits: [
        'Fortalecimiento del core',
        'Mejora de la postura',
        'Prevención de diástasis',
        'Aumento de energía'
      ],
      category: 'Salud Femenina'
    },
    {
      id: 4,
      title: 'Pilates y Nutrición',
      subtitle: 'La combinación perfecta',
      author: 'Nutr. Carla Domínguez',
      date: '29 de abril del 2025',
      content: `Descubre cómo complementar tu práctica de Pilates con una alimentación consciente:
      
      • Alimentos para mejorar el rendimiento
      • Hidratación óptima durante la práctica
      • Snacks pre y post clase
      • Suplementación natural recomendada
      
      Incluye un plan de alimentación semanal gratuito para nuestros lectores.`,
      benefits: [
        'Mayor energía durante las clases',
        'Recuperación muscular acelerada',
        'Mejor hidratación celular',
        'Equilibrio metabólico'
      ],
      category: 'Nutrición'
    },
    {
      id: 5,
      title: 'Rutina Matutina',
      subtitle: 'Empieza tu día con energía',
      author: 'Instr. Javier Morales',
      date: '6 de mayo del 2025',
      content: `Una rutina de 15 minutos para activar tu cuerpo:
      
      1. Estiramientos cervicales
      2. Movilización de columna
      3. Activación de core
      4. Ejercicios de equilibrio
      5. Relajación final
      
      Incluye video tutorial exclusivo y modificaciones para todos los niveles.`,
      benefits: [
        'Mejor movilidad articular',
        'Activación metabólica',
        'Postura optimizada',
        'Reducción de dolores musculares'
      ],
      category: 'Rutinas Diarias'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-outfit bg-bgcolor">
      {/* Listado de Artículos */}
      {articles.map((article) => (
        <article 
          key={article.id}
          className="group bg-[#FFFDEF] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 mb-14 overflow-hidden transform hover:-translate-y-1 transition-transform"
        >
          <div className="p-8 md:p-12">
            <header className="mb-8">
              <span className="inline-block bg-[#7E7EC3] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h1 className="font-bold text-3xl md:text-4xl text-[#413324] mb-4 leading-tight">
                {article.title}
              </h1>
              <h2 className="font-normal italic text-xl text-[#7E7EC3] mb-4">
                {article.subtitle}
              </h2>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  {article.author}
                </span>
                <span>•</span>
                <time dateTime={article.date}>{article.date}</time>
              </div>
            </header>

            <p className="text-lg leading-relaxed text-[#413324] mb-8">
              {article.content.split('\n')[0]}
            </p>

            <button 
              onClick={() => {
                setSelectedArticle(article);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#7E7EC3] hover:bg-[#6B6BAF] transition-colors"
            >
              Leer artículo completo
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        </article>
      ))}

      {/* Paginación */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#413324]">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{' '}
              <span className="font-medium">5</span> artículos
            </p>
          </div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
              disabled
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            
            {[1].map((page) => (
              <button
                key={page}
                className="relative z-10 inline-flex items-center bg-[#7E7EC3] px-4 py-2 text-sm font-semibold text-white"
              >
                {page}
              </button>
            ))}
            
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
              disabled
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-[#FFFDEF] rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            {selectedArticle && (
              <>
                <Dialog.Title className="font-bold text-3xl text-[#413324] mb-4">
                  {selectedArticle.title}
                </Dialog.Title>
                <p className="text-xl text-[#7E7EC3] italic mb-6">{selectedArticle.subtitle}</p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-8">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <time>{selectedArticle.date}</time>
                </div>

                <div className="prose max-w-none text-[#413324]">
                  {selectedArticle.content.split('\n').map((line, index) => (
                    <p key={index} className="mb-4">{line}</p>
                  ))}
                </div>

                <div className="bg-[#F0F1D2] rounded-lg p-6 mt-8">
                  <h3 className="font-semibold text-2xl text-[#413324] mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#7E7EC3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Beneficios Clave
                  </h3>
                  <ul className="space-y-4">
                    {selectedArticle.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#7E7EC3] flex items-center justify-center">
                            <span className="text-white text-sm">{index + 1}</span>
                          </div>
                        </div>
                        <span className="ml-4 text-[#413324]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#7E7EC3] hover:bg-[#6B6BAF] transition-colors"
                >
                  Cerrar artículo
                  <ChevronLeftIcon className="w-4 h-4 ml-2" />
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Wellness;