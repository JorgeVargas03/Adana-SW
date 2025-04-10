import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/about">Acerca</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
