import React from 'react'
import { startOfMonth } from 'date-fns'
import MonthViewReservaClientes from './MonthViewReservaClientes'

// Calendario de Reservation, el que ve el CLIENTE para SUS RESERVAS
// Componente debe ser función normal (NO async)
export const CalendarAppReservas = ({ month }) => {
  // Eliminar el estado de los eventos y la llamada a la API
  // Ya no necesitamos el useState ni el useEffect para los eventos

  // Obtener el primer día del mes y pasarlo al calendario
  const firstDayOfMonth = startOfMonth(month)
  const monthsToShow = [firstDayOfMonth] // Solo uno por ahora

  return (
    <div className="w-full p-4 rounded-xl shadow">
      {monthsToShow.map((monthToShow, idx) => (
        <div key={idx} className="flex w-full h-full">
          {/* Solo pasar el mes al componente de vista mensual */}
          <MonthViewReservaClientes month={monthToShow} />
        </div>
      ))}
    </div>
  )
}
