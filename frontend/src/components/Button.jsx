import React from 'react';

const Button = ({ children, onClick, style = {}, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
