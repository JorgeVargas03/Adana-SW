import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';
import { CalendarApp } from '../components/Calendar';
import BotonFlotante from '../components/BotonFlotante';
import { CalendarDaysIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Reservation() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

  //Token de inicio de sesión para CLIENTES
  useEffect(() => {
    const validateToken = () => setHasToken(isTokenValid());
    validateToken();

    const handleStorageChange = () => validateToken();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="bg-accent1/50 min-h-screen flex flex-col items-center p-6 font-Outfit">


        <div className='justify-between'>
          <div className="text-center">
    <h2 className="font-bold text-5xl text-center relative inline-block pt-28 pb-8">
  <span className="relative inline-block before:absolute before:-inset-4 before:block before:-skew-y-2 before:translate-y-1 before:bg-bgcolor">
    <span className="relative text-fontdef">Reserva con Nosotros</span>
  </span>
</h2>
</div>
<div className="max-w-6xl mx-auto px-6 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-bgcolor rounded-xl px-16 py-12">
    
    {/* ¿Qué es este calendario? */}
    <div className="flex items-start space-x-4">
      <CalendarDaysIcon className="h-8 w-8 text-fontdef flex-shrink-0" />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">¿Qué es este calendario?</h3>
        <p className="mt-2 text-gray-700 text-justify">
          Dentro de este calendario encontrará las diferentes clases impartidas en Adana Studio, organizadas por fecha y hora.
        </p>
      </div>
    </div>

    {/* ¿Por qué las clases están de colores? */}
    <div className="flex items-start space-x-4">
      <SwatchIcon className="h-8 w-8 text-fontdef flex-shrink-0" />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">¿Por qué las clases están de colores?</h3>
        <p className="mt-2 text-gray-700 text-justify mb-1">
          El color indica el número de espacios disponibles:
        </p>
        <ul className="text-gray-700 list-disc list-inside text-justify">
          <li><span className="font-bold text-green-500">Verde:</span> Muchos espacios disponibles</li>
          <li><span className="font-bold text-yellow-500">Amarillo:</span> Espacios moderados</li>
          <li><span className="font-bold text-red-500">Rojo:</span> Sin espacios disponibles</li>
        </ul>
      </div>
    </div>

  </div>
  <div> {/*Boton pa sus reservas*/}
      <Link
      to="/client/myreservation"
      className="flex w-full justify-center font-Outfit items-center gap-2 rounded-md bg-accent2 px-3 py-1.5 text-md font-semibold text-[#FFFDEF] shadow-xs hover:bg-accent2/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer h-10"
    >
      Consulta AQUI tus Reservas
    </Link>

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

      <div className="w-full max-w-6xl flex flex-col items-center">
        <CalendarApp month={currentMonth} />
      </div>

      {/* Mostrar botón flotante solo si hay token de inicio de sesión*/}
      {hasToken && <BotonFlotante />}
    </section>
  );
}
