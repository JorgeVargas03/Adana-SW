import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';
import { CalendarApp } from '../components/Calendar';
import BotonFlotante from '../components/BotonFlotante';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { isTokenValid } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Reservation() {
  

  return (
    <section className="bg-[#FDF9EC] min-h-screen flex flex-col items-center p-6">


        <div className='justify-between'>
        <h2 className="font-outfit font-bold text-7xl text-[#413324] mb-8 text-right mt-16">
        Reserva con nosotros
      </h2>


        </div>
  
 
    </section>
  );
}
