import React, { useEffect, useState } from 'react';
import CalendarAppInstructor from '../components/CalendarAppInstructor';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function InstructorClasses() {
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

  const handleCreateClass = () => {
    // Puede redirigir a una página o abrir un modal
    navigate('/'); // asegúrate de tener esta ruta definida
  };

  return (
    <section className="bg-accent1/50 min-h-screen flex flex-col items-center p-6">
      <div className="justify-between">
        <h2 className="font-outfit font-bold text-7xl text-[#413324] mb-8 text-right mt-20">
          Mis Clases
        </h2>

      </div>

      {/* Navegación de Meses */}
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

      {/* Calendario */}
      <div className="w-full max-w-6xl flex flex-col items-center">
        <CalendarAppInstructor month={currentMonth} />
      </div>

      {/* Botón para crear clase */}
      <div className="mt-10">
        <button
          onClick={handleCreateClass}
          className="px-6 py-3 bg-[#7E7EC3] text-white font-semibold rounded-lg hover:bg-[#5c5ca3] transition duration-300"
        >
          Crear nueva clase
        </button>
      </div>
    </section>
  );
}
