import { useState } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'
import MonthView from './MonthView'

//función
function CalendarApp({ month }) {
  //const [events, setEvents] = useState([])

  //eventos son fijos
  //ya conectado con el back, estos deberían de ser traidos directamente de la base de datos
  // fechas en el formato correcto (YYYY-MM-DD) o en objetos de tipo Date para que isSameDay los detecte bien.
  const events = [
    { title: 'Pilates Marco', date: '2025-04-30', availableSpots: 3 },
    { title: 'Pilates Martha', date: '2025-04-02', availableSpots: 0 },
    { title: 'Pilates Lily', date: '2025-04-05', availableSpots: 6 },
  ]
  
  //constante para en base a la fecha de la computadora 
  // en lugar de usar new Date(), usar month que viene de props bg-[#FDF9EC]
  const firstDayOfMonth = startOfMonth(month)
  const monthsToShow = [firstDayOfMonth] // Solo uno a la vez

  //estructura física del calendario
  return (
    <div className="w-full p-4 rounded-xl shadow">
      {monthsToShow.map((month, idx) => (
        <div className="flex w-full h-full">
          <MonthView key={idx} month={month} events={events} />
        </div>
      ))}
    </div>
  )
  
}

export default CalendarApp

