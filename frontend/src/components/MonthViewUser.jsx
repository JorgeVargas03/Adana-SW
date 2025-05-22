import { useState } from 'react';
import { format, startOfMonth, endOfMonth, getDay, isSameDay, eachDayOfInterval, startOfDay, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import iconDefault from '../assets/images/icon.png';
import { es } from 'date-fns/locale';
import axios from 'axios';
import { isTokenValid } from '../utils/auth';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;


function MonthViewUser({ month, events }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasToken, setHasToken] = useState(isTokenValid());
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7;


  const filteredEvents = selectedDate
    ? events.filter((event) => isSameDay(startOfDay(parseISO(event.date)), startOfDay(selectedDate)))
    : events;


  return (
    <div className="bg-[#F5F0FF] font-outfit rounded-3xl shadow-lg p-6 w-full h-full relative font-Outfit">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#7E5EC3] capitalize">
        {format(month, 'MMMM yyyy', { locale: es })}
      </h2>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center text-[#A18CD1] font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        <AnimatePresence>
          {days.map((day) => {
            const isToday = isSameDay(day, new Date());
            const dayEvents = filteredEvents.filter((e) =>
              isSameDay(startOfDay(parseISO(e.date)), startOfDay(day))
            );


                       return (
              <motion.div
                key={day}
                className={`bg-white border border-[#E9DFFB] p-3 rounded-2xl min-h-[150px] flex flex-col items-center hover:bg-[#f2e9fc] ${
                  isToday ? 'ring-2 ring-[#7E5EC3] bg-[#f6f0ff]' : ''
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  setSelectedEvent(null);
                  setShowModal(false);
                }}
              >
                <div className="text-md font-medium text-[#7E5EC3] mb-1">
                  {format(day, 'd')}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-ellipsis px-2 py-1 rounded-md text-center font-semibold cursor-pointer bg-bgcolor"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setShowModal(true);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

{/*Modal para ver el evento seleccionado*/}
      <AnimatePresence>
        {showModal && selectedEvent && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setShowModal(false);
                setSelectedEvent(null);
              }}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                setShowModal(false);
                setSelectedEvent(null);
              }}
            >
              <div
                className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-[#7E5EC3] mb-2">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Instructor:</span> {selectedEvent.instructor}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Descripcion:</span> {selectedEvent.description}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Hora:</span> {selectedEvent.time}
                </p>

                <button
                  className="mt-4 px-4 py-2 bg-[#7E5EC3] text-white rounded-lg hover:bg-[#6b4fc1] transition cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedEvent(null);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}



export default MonthViewUser;
