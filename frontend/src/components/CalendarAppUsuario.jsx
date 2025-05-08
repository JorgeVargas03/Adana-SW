import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthViewUser from './MonthViewUser';

export function CalendarAppUsuario () {
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState(new Date());

  const fetchEvents = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!userId) {
        console.warn('No se encontró userId en localStorage');
        return;
      }
      console.log(userId);

      const response = await axios.get(`http://localhost:3001/adana-api/v1/classes/reserves/${userId}`);
      console.log('Respuesta del backend:', response.data); 
      
      const reservas = response.data.reservaciones;

      const mappedEvents = reservas.map(reserva => ({
        title: reserva.classTitle,
        instructor: reserva.instructor,
        date: new Date(reserva.date),
      }));


      setEvents(mappedEvents);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full p-4 rounded-xl">
      
        <div className="flex w-full h-full">
          <MonthViewUser month={month} events={events} />
        </div>
    
    </div>
  );
};

export default CalendarAppUsuario;
