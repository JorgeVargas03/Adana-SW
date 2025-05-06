import React, { useEffect, useState } from 'react'; // <--- AHORA INCLUYE useEffect
import '../share/style/allPages.css';


export default function Reservation() {
  

  return (
    <section className="bg-[#FDF9EC] min-h-screen flex flex-col items-center p-6">


        <div className='text-center'>
    <h2 className="font-bold text-5xl text-center relative inline-block">
  <span className="relative inline-block before:absolute before:-inset-4 before:block before:-skew-y-2 before:translate-y-1 before:bg-bgcolor">
    <span className="relative text-fontdef">Mis Clases Reservadas</span>
  </span>
</h2>



        </div>
  
 
    </section>
  );
}
