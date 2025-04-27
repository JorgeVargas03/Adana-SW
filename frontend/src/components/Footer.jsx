import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-barcolor text-fontdef py-4 font-Outfit h-30 pt-8">
      <p className="text-center text-2xl font-bold transition-all duration-300 ease-in-out transform hover:translate-y-1/8 overflow-hidden">
        Adana Pilates Estudio
      </p>
      <p className="text-center text-sm font-extralight transition-all duration-300 ease-in-out transform hover:translate-y-1/8 overflow-hidden">
        &copy; {new Date().getFullYear()}Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
