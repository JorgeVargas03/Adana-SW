//calendario para que los clientes vean

import React from 'react';
import '../share/style/allPages.css'; // o './App.css', según cómo lo nombres

import CalendarApp from '../components/Calendar';

const Reservation = () => {
  return (
    <section>
        <h2 className="font-outfit font-bold text-left text-[4rem] mb-8 text-[#413324] ">
          Reserva con nosotros
        </h2>

        <div >
          
          <div className='flex gap-5 mb-4 items-end'>
            <button className='cursor-pointer hover:scale-[1.01] rounded-xl w-[10px] h-10 p-5 m-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

            </button>

            <button className='cursor-pointer hover:scale-[1.01] rounded-xl w-[10px] h-10 p-5 m-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

            </button>
            </div> 
 
            <div className='flex justify-center items-center'>
            <CalendarApp></CalendarApp>         
            </div>
          
        </div>    
    </section>
  );
};

export default Reservation;