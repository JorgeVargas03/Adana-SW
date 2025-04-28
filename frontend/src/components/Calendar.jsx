import React, { useState, useEffect } from 'react'
import { startOfMonth } from 'date-fns'
import MonthView from './MonthView'
import axios from 'axios'

// Componente debe ser función normal (NO async)
export const CalendarApp = ({ month }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/adana-api/v1/classes/availability");

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

  const firstDayOfMonth = startOfMonth(month)
  const monthsToShow = [firstDayOfMonth] // Solo uno por ahora

  return (
    <div className="w-full p-4 rounded-xl shadow">
      {monthsToShow.map((monthToShow, idx) => (
        <div key={idx} className="flex w-full h-full">
          <MonthView month={monthToShow} events={events} />
        </div>
      ))}
    </div>
  )
}
