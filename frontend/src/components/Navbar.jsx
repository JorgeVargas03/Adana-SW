import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/icon.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Adana logo" style={{ height: '30px', marginRight: '8px' }} />
        Adana Pilates Estudio
      </div>
      <ul className="nav-links">
        <li><Link to="/reservation">RESERVA</Link></li>
        <li><Link to="/">CONÓCENOS</Link></li>
        <li><Link to="/instructors">INSTRUCTORES</Link></li>
        <li><Link to="/wellness">BIENESTAR</Link></li>
        <li><Link to="/faq">FAQs</Link></li>
        <li><Link to="/signin">INGRESAR</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
