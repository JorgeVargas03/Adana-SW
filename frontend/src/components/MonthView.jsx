import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

function MonthView({ month, events }) {

    //intervalo de días para cada mes
    const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  })

  return (
    //formato
    <div className="bg-[#413324] rounded-xl shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-[#FFFDEF]">
        {format(month, 'MMMM yyyy')}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
            //método para ver si el día coincide con el día de hoy
          const dayEvents = events.filter(e => isSameDay(new Date(e.date), day))
          return (
            <div key={day} className="border border-[#FFFDEF] p-2 rounded min-h-[100px] min-w-[100px]">
              <div className="text-sm font-medium text-[#FFFDEF]">{format(day, 'd')}</div>
              <div className="mt-1 space-y-1">
                {/*Mapea los eventos pa ver si hay evento ese día*/}
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-1 py-0.5 rounded ${getEventColor(event.availableSpots)}`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getEventColor(spots) {
  if (spots >= 5) return 'bg-green-300'
  if (spots >= 2) return 'bg-yellow-300'
  return 'bg-red-400'
}

export default MonthView
