
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const CarritoContext = createContext();

// 2. Hook para consumir el contexto más fácilmente
export const useCarrito = () => useContext(CarritoContext);

// 3. Componente proveedor
export const CarritoProvider = ({ children }) => {
  const [eventosUnidos, setEventosUnidos] = useState([]);

  const agregarEvento = (evento) => {
    const yaExiste = eventosUnidos.some(
      (e) => e.id === evento.id && e.instructorId === evento.instructorId
    );
    if (!yaExiste) {
      setEventosUnidos((prev) => [...prev, evento]);
    }
  };

  const quitarEvento = (eventoId) => {
    setEventosUnidos((prev) =>
      prev.filter((e) => e.id !== eventoId)
    );
  };

  return (
    <CarritoContext.Provider value={{ eventosUnidos, agregarEvento, quitarEvento }}>
      {children}
    </CarritoContext.Provider>
  );
};
