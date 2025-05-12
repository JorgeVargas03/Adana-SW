import { useState } from 'react';
import { format, startOfMonth, endOfMonth, getDay, isSameDay, eachDayOfInterval, startOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { es } from 'date-fns/locale';
import axios from 'axios';
import { isTokenValid } from '../utils/auth';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
const API_URL = import.meta.env.VITE_API_URL;


function MonthViewInstructor({ month, events, onClassAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasToken, setHasToken] = useState(isTokenValid());
  const [students, setStudents] = useState([]); // Estudiantes
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
  const [newClass, setNewClass] = useState({
    title: undefined,
    description: undefined,
    price: 0,
    schedule: {
      date: undefined,
      time: undefined,
    },
    capacity: 0,
    reserved: 0,
  });
  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7;

  const handleCreateClass = async () => {
    try {
      const classData = {
        title: newClass.title,
        description: newClass.description,
        price: newClass.price,
        schedule: {
          date: newClass.schedule.date,  // Fecha en formato YYYY-MM-DD
          time: newClass.schedule.time,  // Hora en formato HH:MM
        },
        capacity: newClass.capacity,
        reserved: newClass.reserved,
      };
      const instructorId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!newClass.title || !newClass.description || !newClass.schedule.date || !newClass.schedule.time || !newClass.capacity) {
        toast.info("Por favor completa todos los campos requeridos.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/adana-api/v1/classes/${instructorId}/newClass`,
        classData
      );

      console.log('Clase creada:', response.data);

      // Recargar clases en el padre
      onClassAdded();

      // Mostrar notificación
      toast.success("Clase agregada correctamente");

      setNewClass({
        title: '',
        description: '',
        price: 0,
        schedule: { date: '', time: '' },
        capacity: 0,
        reserved: 0,
      });

    } catch (error) {
      toast.error("No se pudo crear la clase, intente de nuevo mas tarde");
      console.error('Error al crear clase:', error);
    }
    setShowCreateModal(false);
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    setShowModal(true);

    try {
      // Asegurarse de que la URL y el manejo de la respuesta son correctos
      const response = await axios.get(
        `${API_URL}/adana-api/v1/classes/instructor/${event.instructorId}/class/${event.classId}/details`
      );

      // Verificar que los estudiantes estén presentes en la respuesta
      if (response.data && response.data.students) {
        setStudents(response.data.students || []);
      } else {
        console.error('No se encontraron estudiantes');
        setStudents([]); // En caso de que no haya estudiantes
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      setStudents([]); // En caso de error, limpiar los estudiantes
    }
  };

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
                key={format(day, 'yyyy-MM-dd')}
                className={`bg-white border border-[#E9DFFB] p-3 rounded-2xl min-h-[150px] flex flex-col items-center cursor-pointer hover:bg-[#f2e9fc] ${isToday ? 'ring-2 ring-[#7E5EC3] bg-[#f6f0ff]' : ''
                  }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  // No hagas nada aquí
                }}
              >
                <div className="text-md font-medium text-[#7E5EC3] mb-1">
                  {format(day, 'd')}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  {dayEvents.map((event) => (
                    <div
                      key={event.classId}
                      className={`text-xs text-ellipsis px-2 py-1 rounded-md text-center font-semibold ${getEventColor(event.availableSpots)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(event.date); // ✅ Aquí sí se selecciona la fecha correcta
                        handleEventClick(event);
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

      <AnimatePresence>
        {showModal && (
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
                setStudents([]);
                setSelectedDate(null); // <-- limpiar la fecha
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
                setStudents([]);
                setSelectedDate(null); // <-- limpiar la fecha
              }}
            >

              <div
                className="bg-white p-8 rounded-3xl shadow-2xl text-center w-xl max-h-xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {hasToken ? (
                  selectedEvent && (
                    <>
                      <h2 className="text-2xl font-bold text-[#C3C37E] mb-4">{selectedEvent.title}</h2>
                      <p className="text-sm text-gray-700 mb-2"><strong>Descripción:</strong> {selectedEvent.description}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Hora:</strong> {selectedEvent.time}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Capacidad:</strong> {selectedEvent.capacity}</p>
                      <p className="text-sm text-gray-700 mb-4"><strong>Reservados:</strong> {selectedEvent.capacity - selectedEvent.availableSpots} / {selectedEvent.capacity}</p>

                      {students.length > 0 && (
                        <div className="text-left text-sm mb-4">
                          <strong className="text-lg">Estudiantes inscritos:</strong>
                          <ul className="justify-end mt-2 divide-y divide-gray-100">
                            {students.map((s, i) => (
                              <li key={i}>
                                <div className="flex min-w-0 gap-x-5 py-1">
                                  <img
                                    alt=""
                                    src={s.profile_picture || iconDefault} // opcional si no tienes imagen
                                    className="size-8 flex-none rounded-full bg-gray-50"
                                  />
                                  <div className="min-w-0 flex-auto">
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">{s.name}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button
                        className="bg-[#C3C37E] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer"
                        onClick={() => {
                          setShowModal(false);
                          setSelectedEvent(null);
                          setStudents([]);
                          setSelectedDate(null); // ← si deseas limpiar también la fecha seleccionada
                        }}
                      >
                        Cerrar
                      </button>

                    </>
                  )
                ) : null}
              </div>
            </motion.div>
          </>
        )}
        <AnimatePresence>
          {showCreateModal && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black bg-opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setShowCreateModal(false);
                }}
              />
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  setShowCreateModal(false);
                }}
              >
                <div
                  className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto text-fontdef"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold text-center text-[#7E5EC3] mb-6">Crear nueva clase</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Título</label>
                      <input
                        type="text"
                        value={newClass.title}
                        onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <textarea
                        value={newClass.description}
                        onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2 resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Precio</label>
                        <input
                          type="number"
                          value={newClass.price}
                          onChange={(e) => setNewClass({ ...newClass, price: parseFloat(e.target.value) })}
                          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                        <input
                          type="number"
                          value={newClass.capacity}
                          onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha y hora</label>
                      <input
                        type="datetime-local"
                        onChange={(e) => {
                          const [date, time] = e.target.value.split('T');
                          setNewClass((prev) => ({
                            ...prev,
                            schedule: { date, time }
                          }));
                        }}
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateClass}
                    className="mt-6 w-full bg-[#7E5EC3] hover:bg-[#5e46a5] text-white px-4 py-3 rounded-full font-semibold text-base transition duration-300"
                  >
                    Crear Clase
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </AnimatePresence>
      {/* Botón para crear clase */}
      <div className="mt-10 items-center text-center">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-[#7E7EC3] text-white font-semibold rounded-lg hover:bg-[#5c5ca3] transition duration-300"
        >
          Crear nueva clase
        </button>
      </div>
    </div>
  );
}

function getEventColor(spots) {
  if (spots >= 5) return 'bg-green-200 text-green-800';
  if (spots >= 2) return 'bg-yellow-200 text-yellow-800';
  return 'bg-red-200 text-red-800';
}

export default MonthViewInstructor;
