import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Adana Pilates Estudio</div>
      <ul className="nav-links">
        <li><Link to="/">CONÓCENOS</Link></li>
        <li><Link to="/instructors">INSTRUCTORES</Link></li>
        <li><a>BIENESTAR</a></li>
        <li><a>FAQs</a></li>
        <li><a>INGRESAR</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
