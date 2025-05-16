import React, { useState, useEffect } from 'react'
import { startOfMonth } from 'date-fns'
import MonthView from './MonthView'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

//Calendario de Reservation, el que ve el CLIENTE para reservar clases
// Componente debe ser función normal (NO async)
export const CalendarApp = ({ month }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    //traer la información de la base de datos con un get
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/adana-api/v1/classes/availability`);

        //info de los eventos que trae al calendario para lo basico que es titulo, la fecha pa ver donde ponerlo y los lugares para poner el color
        const fetchedEvents = response.data.map(evento => ({
          title: evento.title,
          date: evento.date,
          availableSpots: evento.availableSpots
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("No se encontraron eventos.")
        } else {
          console.error("Error al cargar eventos:", error);
        }
      }
    }

    fetchEvents();
  }, []); // Se ejecuta solo una vez

  //pal calendario en sí ahora sí
  const firstDayOfMonth = startOfMonth(month)
  const monthsToShow = [firstDayOfMonth] // Solo uno por ahora

  return (
    <div className="w-full p-4 rounded-xl">
      {monthsToShow.map((monthToShow, idx) => (
        <div key={idx} className="flex w-full h-full">
          <MonthView month={monthToShow} events={events} />
        </div>
      ))}
    </div>
  )
}
