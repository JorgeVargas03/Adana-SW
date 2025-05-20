// MonthViewAdmin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  isSameDay,
  eachDayOfInterval,
  startOfDay,
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCarrito } from '../context/CarritoContext';
import { isTokenValid } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

function MonthViewAdmin({ month, events, onClassAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userIdToEnroll, setUserIdToEnroll] = useState('');
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  const { agregarEvento } = useCarrito();

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7;

  useEffect(() => {
    const validateToken = () => setHasToken(isTokenValid());
    validateToken();
    const handleStorageChange = () => validateToken();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleEnroll = async () => {
    try {
      const body = {
        classId: selectedEvent.classId,
        instructorId: selectedEvent.instructorId,
      };
      await axios.post(
        `${API_URL}/adana-api/v1/classes/reserve/onlyOne/${userIdToEnroll}`,
        body
      );

      toast.success('Usuario inscrito correctamente');
      setShowEnrollModal(false);
      setShowModal(false);
      setSelectedEvent(null);
      onClassAdded();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al inscribir usuario';
      toast.error(message);
    }
  };

  return (
    <div className="bg-[#F5F0FF] font-outfit rounded-3xl shadow-lg p-6 w-full h-full relative">
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
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            const dayEvents = events.filter(e =>
              isSameDay(startOfDay(new Date(e.date)), startOfDay(day))
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

      {/* Modal de detalles */}
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
                <p className="text-sm text-gray-700 mb-1"><strong>Clase ID:</strong> {selectedEvent.classId}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Instructor:</strong> {selectedEvent.instructorName}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Instructor ID:</strong> {selectedEvent.instructorId}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Descripción:</strong> {selectedEvent.description}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Fecha:</strong> {format(new Date(selectedEvent.date), "PPP", { locale: es })}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Hora:</strong> {selectedEvent.time}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Precio:</strong> ${selectedEvent.price}</p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Cupos:</strong> {selectedEvent.availableSpots} / {selectedEvent.capacity}
                </p>

                <button
                  className="mt-2 mr-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={() => setShowEnrollModal(true)}
                >
                  Inscribir un usuario
                </button>

                <button
                  className="mt-2 px-4 py-2 bg-[#7E5EC3] text-white rounded-lg hover:bg-[#6b4fc1] transition"
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

      {/* Modal para inscribir usuario */}
      <AnimatePresence>
        {showEnrollModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowEnrollModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setShowEnrollModal(false)}
            >
              <div
                className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-[#7E5EC3] mb-4">Inscribir usuario</h3>
                <input
                  type="text"
                  placeholder="ID del usuario"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  value={userIdToEnroll}
                  onChange={(e) => setUserIdToEnroll(e.target.value)}
                />
                <div className="flex justify-center gap-2">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={handleEnroll}
                  >
                    Inscribir
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    onClick={() => setShowEnrollModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MonthViewAdmin;
