import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'
import { Link } from 'react-router-dom'

function MonthView({ month, events }) {
  const [showModal, setShowModal] = useState(false)

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  })

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7

  return (
    <div className="bg-[#F5F0FF] font-outfit rounded-3xl shadow-lg p-6 w-full h-full relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#7E5EC3]">
        {format(month, 'MMMM yyyy')}
      </h2>

      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center text-[#A18CD1] font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        <AnimatePresence>
          {days.map(day => {
            const dayEvents = events.filter(e => isSameDay(new Date(e.date), day))

            return (
              <motion.div
                key={day}
                className="bg-white border border-[#E9DFFB] p-3 rounded-2xl min-h-[100px] flex flex-col items-center cursor-pointer hover:bg-[#f2e9fc]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setShowModal(true)}
              >
                <div className="text-md font-medium text-[#7E5EC3] mb-1">
                  {format(day, 'd')}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full text-center font-semibold ${getEventColor(event.availableSpots)}`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Modal animado */}
      <AnimatePresence>
            {showModal && (
          <>
            {/* Fondo invisible que cierra al hacer click */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowModal(false)}
            />

            {/* Modal principal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setShowModal(false)} // <<--- click en el fondo también aquí
            >
              {/* El contenido del modal: evita que el click se propague */}
              <div
                className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()} // <<--- IMPORTANTE: para que no cierre si haces click en el contenido
              >
                <h2 className="text-2xl font-bold text-[#C3C37E] mb-4">¿Quieres reservar?</h2>
                <Link to="/signup">
                  <button
                    className="bg-[#C3C37E] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    ¡Regístrate!
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function getEventColor(spots) {
  if (spots >= 5) return 'bg-green-200 text-green-800'
  if (spots >= 2) return 'bg-yellow-200 text-yellow-800'
  return 'bg-red-200 text-red-800'
}

export default MonthView
