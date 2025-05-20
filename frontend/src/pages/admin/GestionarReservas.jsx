import React, { useEffect, useState } from 'react';
import CalendarAppAdmin from '../../components/CalendarAppAdmin';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function GestionarReservas(){
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
    <section className="bg-accent1/50 min-h-screen flex flex-col items-center p-6 font-Outfit pt-38">
      <div className="text-center pb-12">
    <h2 className="font-bold text-5xl text-center relative inline-block">
  <span className="relative inline-block before:absolute before:-inset-4 before:block before:-skew-y-2 before:translate-y-1 before:bg-bgcolor">
    <span className="relative text-fontdef text-7xl">Clases</span>
  </span>
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
        <CalendarAppAdmin month={currentMonth}/>
      </div>
    </section>
  );
}
