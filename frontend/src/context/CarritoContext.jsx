
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// 1. Crear el contexto
const CarritoContext = createContext();

// 2. Hook para consumir el contexto más fácilmente
export const useCarrito = () => useContext(CarritoContext);

// 3. Componente proveedor
export const CarritoProvider = ({ children }) => {
  const [eventosUnidos, setEventosUnidos] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(eventosUnidos));
  }, [eventosUnidos]);

  const agregarEvento = (evento) => {
    const yaExiste = eventosUnidos.some(
      (e) => e.classId === evento.classId && e.instructorId === evento.instructorId
    );
    if (!yaExiste) {
      setEventosUnidos((prev) => [...prev, evento]);
      toast.info("Clase agregada al carrito",{
        position: 'bottom-left'
      });
    } else {
      toast.warn("Esta clase ya se encuentra en el carrito");
      return;

    }
  };

  const limpiarCarrito = () => {
    setEventosUnidos([]);
    localStorage.removeItem("carrito");
  };


  //quitar?
  const quitarEvento = (eventoId) => {
    setEventosUnidos((prev) =>
      prev.filter((e) => e.classId !== eventoId)
    );
  };

  return (
    <CarritoContext.Provider value={{ eventosUnidos, agregarEvento, quitarEvento, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
