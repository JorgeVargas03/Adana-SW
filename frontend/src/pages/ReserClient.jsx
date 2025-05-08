import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';
import { CalendarAppUsuario } from '../components/CalendarAppUsuario';
import { CalendarDaysIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../utils/auth';
import { useNavigate } from 'react-router-dom';


export default function ReserClient() {
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
          <span className="relative text-fontdef">Mis Reservas</span>
        </span>
      </h2>
      </div> {/* Final div del título*/}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className=" gap-12 bg-bgcolor rounded-xl px-16 py-12">
          {/* ¿Qué es este calendario? */}
          <div className="flex items-center space-x-4">
            <CalendarDaysIcon className="h-8 w-8 text-fontdef flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">¿Qué es este calendario?</h3>
              <p className="mt-2 text-gray-700 text-justify">
                Dentro de este calendario encontrará tus diferentes clases, organizadas por fecha y hora.
              </p>
            </div>
          </div>
        </div>
      </div> {/* Fin del div de información */}
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
      </div> {/* Fin botones*/}

      <div className="w-full max-w-6xl flex flex-col items-center">
        <CalendarAppUsuario month={currentMonth} />
      </div> {/* Fin calendario */}

    </section>
  );
}
