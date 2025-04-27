import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import articles from '../assets/articles/Articles';

export default function Wellness() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
  <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 font-Outfit pt-34 bg-accent1/70">
    {/* Listado de Artículos */}
    <div className="bg-barcolor rounded-lg shadow-sm">
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border-b last:border-0 rounded-lg border-gray-200 p-6 hover:bg-white/80 transition"
        >
          <div>
            <h2 className="text-indigo-500 text-lg font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-500 text-sm">{article.subtitle}</p>
          </div>
          <div className="flex flex-col items-center mt-4 md:mt-0 space-y-2">
            {/* Badge del tipo de artículo */}
          <span
            className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-inset"
            style={{
              backgroundColor: article.color + '2A',  // Fondo con opacidad
              color: article.color,                    // Color de texto
              boxShadow: `0 0 0 1px ${article.color}40`, // Anillo con color y opacidad (80 = 50% opacidad)
            }}
          >
            {article.category}
</span>

            
            {/* Botón para ver detalles */}
            <a
              onClick={(e) => {
                e.preventDefault();
                setSelectedArticle(article);
                setIsModalOpen(true);
              }}
              className="text-indigo-500 text-sm hover:underline cursor-pointer"
            >
              Ver más 
            </a>
          </div>
        </div>
      ))}
    </div>

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