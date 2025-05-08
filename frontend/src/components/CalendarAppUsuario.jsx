import React, { useState, useEffect } from 'react'
import { startOfMonth } from 'date-fns'
import MonthViewUser from './MonthViewUser'
import axios from 'axios'

//Calendario de Reservation, el que ve el CLIENTE para reservar clases
// Componente debe ser función normal (NO async)
export const CalendarAppUsuario = ({ month }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    //traer la información de la base de datos con un get
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/adana-api/v1/reserves/:userId");
        //router.get("/reserves/:userId", classController.getUserReservations);

        //info de los eventos que trae al calendario para lo basico que es titulo, la fecha pa ver donde ponerlo y los lugares para poner el color
        const fetchedEvents = response.data.map(evento => ({
          title: evento.title,
          date: evento.date
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
          <MonthViewUser month={monthToShow} events={events} />
        </div>
      ))}
    </div>
  )
}
