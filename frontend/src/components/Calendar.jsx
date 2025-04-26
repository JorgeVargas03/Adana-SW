import { useState } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths } from 'date-fns'
import MonthView from './MonthView'

//función
function Calendar() {
  const [events, setEvents] = useState([])

  //constante para en base a la fecha de la computadora 
  const today = new Date()
  const thisMonth = startOfMonth(today)
 // const nextMonth = startOfMonth(addMonths(today, 1))

  //meses que debe de mostrar el calendario
  const monthsToShow = [thisMonth] //,nextMonth

  //estructura física del calendario
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F0F1D2]">
      {monthsToShow.map((month, idx) => (
        <MonthView key={idx} month={month} events={events} />
      ))}
    </div>
  )
}

export default Calendar

