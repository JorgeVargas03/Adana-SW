import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';
import { CalendarAppReservas } from '../components/CalendarAppReservas';

export default function Reservation() {
  

  return (
    <section className="bg-accent1 min-h-screen flex flex-col items-center p-6">


        <div className='justify-between'>
          <h2 className="font-outfit font-bold text-7xl text-[#413324] mb-8 text-right mt-16">
          Mis clases reservadas
          </h2>

          <div>
          <CalendarAppReservas/>

          </div>

        </div>
  
 
    </section>
  );
}
