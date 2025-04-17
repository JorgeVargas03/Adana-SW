import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} Adana Pilates. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
