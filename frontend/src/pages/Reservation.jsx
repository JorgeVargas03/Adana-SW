import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';
import { CalendarApp } from '../components/Calendar';
import BotonFlotante from './BotonFlotante';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Reservation() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

  useEffect(() => {
    const validateToken = () => setHasToken(isTokenValid());
    validateToken();

    const handleStorageChange = () => validateToken();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="bg-[#FDF9EC] min-h-screen flex flex-col items-center p-6">


        <div className='justify-between'>
        <h2 className="font-outfit font-bold text-7xl text-[#413324] mb-8 text-right mt-16">
        Reserva con nosotros
      </h2>
                {/*Calendario*/}
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="space-y-4">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                        >
                          <span className="font-medium">¿Qué es este calendario?</span>
                          <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                        </Disclosure.Button>
                        <Disclosure.Panel
                          className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                          ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          Dentro de este calenderio encontrará las diferentes clases impartidas en Adana Studio
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
            </div>
          </div>
          
                     {/*Codigo de colores*/}
          <div className="max-w-5xl mx-auto px-5 py-5">
            <div className="space-y-4">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                        >
                          <span className="font-medium">¿Por qué las clases están de colores?</span>
                          <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                        </Disclosure.Button>
                        <Disclosure.Panel
                          className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                          ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          El color de una clase indica el número de espacios disponibles.
                          <p className='font-bold text-green-400'>Verde</p> Significa que hay bastantes espacios
                          <p className='font-bold text-red-500'>Rojo</p> Significa que no hay espacios
                          <p className='font-bold text-yellow-500'>Amarillo</p> Significa que hay una cantidad moderada de espacios
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
            </div>
        </div>
  
      <div className="flex gap-5 mb-6">
        <button onClick={handlePrevMonth} className="w-12 h-12 flex justify-center items-center rounded-full bg-[#C3C37E] text-white hover:scale-105 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button onClick={handleNextMonth} className="w-12 h-12 flex justify-center items-center rounded-full bg-[#C3C37E] text-white hover:scale-105 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        <CalendarApp month={currentMonth} />
      </div>

      {/* Mostrar botón flotante solo si hay token */}
      {hasToken && <BotonFlotante />}
    </section>
  );
}
