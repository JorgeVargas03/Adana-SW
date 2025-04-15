import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/icon.png';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-20 px-8 bg-white shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Adana logo" className="h-8 mr-3" />
        <span className="font-[Outfit] font-semibold text-2xl text-[#413324]">Adana Pilates Estudio</span>
      </div>
      
      <div className="flex items-center gap-8">
        {[
          { to: "/reservation", label: "RESERVA" },
          { to: "/", label: "CONÓCENOS" },
          { to: "/instructors", label: "INSTRUCTORES" },
          { to: "/wellness", label: "BIENESTAR" },
          { to: "/faq", label: "FAQs" },
          { to: "/signin", label: "INGRESAR" }
        ].map((item, index) => (
          <div 
            key={index}
            className="px-2 transition transform hover:scale-105 hover:text-[#7E7EC3] cursor-pointer"
          >
            <Link 
              to={item.to} 
              className="font-[Outfit] text-base font-bold text-[#413324] no-underline hover:no-underline"
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
