import { useState, useEffect } from 'react';
import axios from 'axios';
import { isTokenValid } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, getDay, isSameDay, eachDayOfInterval, startOfDay, parseISO, } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { es } from 'date-fns/locale';
import { useCarrito } from '../context/CarritoContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

//Realiza el calendario y sus modales
function MonthView({ month }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  const { agregarEvento } = useCarrito();
  //const userId = localStorage.getItem("userDoc.id");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [userReservations, setUserReservations] = useState([]);


  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  });

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7;
  //localStorage.setItem("usuarioId", userId);

  //Obtener los id de clases reservadas del usuario
  useEffect(() => {
    const fetchUserReservations = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${API_URL}/adana-api/v1/classes/reserves/${userId}`);
        const reservas = response.data.reservaciones;
        const ids = reservas.map(reserva => reserva.classId); // 👈 Asegúrate de que exista
        setUserReservations(ids);
      } catch (error) {
        console.error("Error al obtener clases reservadas del usuario:", error);
      }
    };

    fetchUserReservations();
  }, [userId]);

  //token de inicio de sesión
  useEffect(() => {
    const validateToken = () => setHasToken(isTokenValid());
    validateToken();

    const handleStorageChange = () => validateToken();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //petición para obtener la info al back
        const response = await axios.get(`${API_URL}/adana-api/v1/classes/availability`);
        const fetchedEvents = response.data.map(clase => {
          const [hour, minute] = clase.time.split(':');
          const [year, month, day] = clase.date.split('-').map(Number);

          // Construimos fecha/hora como objeto local
          const dateWithTime = new Date(year, month - 1, day, parseInt(hour), parseInt(minute));

          console.log('Evento generado:', {
            fechaOriginal: clase.date,
            horaOriginal: clase.time,
            fechaFinal: dateWithTime.toString()
          });

          //información de las clases que retorna
          return {
            classId: clase.id,
            title: clase.title,
            instructor: clase.instructorName,
            instructorId: clase.instructorId,
            availableSpots: clase.availableSpots,
            description: clase.description,
            capacity: clase.capacity,
            price: clase.price,
            date: dateWithTime
          };
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  //dibujar el calendario
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

      <div className="grid grid-cols-7 gap-1 ">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        <AnimatePresence>
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            const dayEvents = events.filter(e =>
              isSameDay(startOfDay(e.date), startOfDay(day))
            );

            //console log para calar el 30 de abril q no jalaba ajsjasjajs
            if (format(day, 'yyyy-MM-dd') === '2025-04-30') {
              console.log('Eventos del 30 de abril:', dayEvents);
            }

            return (
              //cuadritos de cada uno de los días, si es el día de HOY se marca el cuadro
              <motion.div
                key={day}
                className={`bg-white border border-[#E9DFFB] p-3 rounded-2xl min-h-[150px] flex flex-col items-center  hover:bg-[#f2e9fc] ${isToday ? 'ring-2 ring-[#7E5EC3] bg-[#f6f0ff]' : ''
                  }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  setSelectedEvent(null); // reset si clic sin evento
                  setShowModal(false);
                }}
              >
                <div className="text-md font-medium text-[#7E5EC3] mb-1">
                  {format(day, 'd')}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx} //trae el color de las clases, cambiar en el futuro para que se extraiga luego luego del back
                      className={`text-xs text-ellipsis px-2 py-1 rounded-md text-center font-semibold cursor-pointer ${getEventColor(event.availableSpots, event.capacity)}`}
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
                //Creo que va a ser aquí dodne le tengo que cambiar
                className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()}
              >

                {hasToken ? (
                  selectedEvent && (
                    <> {/*Si INICIO SESION al hacer click el modal muestra la info de la clase*/}
                      <h2 className="text-2xl font-bold text-[#C3C37E] mb-4">{selectedEvent.title}</h2>
                      <p className="text-sm text-gray-700 mb-2"><strong>Instructor:</strong> {selectedEvent.instructor}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Descripción:</strong> {selectedEvent.description}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Capacidad:</strong> {selectedEvent.capacity}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Precio MXN:</strong> ${selectedEvent.price}</p>
                      <p className="text-sm text-gray-700 mb-4"><strong>Reservados:</strong> {selectedEvent.capacity - selectedEvent.availableSpots} / {selectedEvent.capacity}</p> {/*capacity-availablespots pa ver cuantos son*/}
                      {/*Boton para unirse*/}
                      <button
                        className="bg-[#C3C37E] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer"
                        onClick={() => {
                          const yaInscrito = userReservations.includes(selectedEvent.classId);

                          if (yaInscrito) {
                            setShowModal(false);
                            setSelectedEvent(null);
                            toast.error("Ya estás inscrito en esta clase!!");
                            return;
                          }

                          if (selectedEvent.availableSpots === 0) {
  setShowModal(false);
  setSelectedEvent(null);
  toast.error("Esta clase ya está llena.");
  return;
}

agregarEvento({
  classId: selectedEvent.classId,
  instructorId: selectedEvent.instructorId,
  title: selectedEvent.title,
  description: selectedEvent.description,
  instructorName: selectedEvent.instructor,
  price: selectedEvent.price,
  formattedDate: format(selectedEvent.date, "dd/MM/yyyy HH:mm"),
  availableSpots: selectedEvent.availableSpots // 👈 importante para futura validación
});


                          console.log('Evento guardado:', selectedEvent.classId);
                          setShowModal(false);
                          setSelectedEvent(null);
                        }}

                      >
                        Unirme
                      </button>

                    </>
                  )
                ) : (
                  <> {/*Si NO INICIO SESION el modal le dice que se registre*/}
                    <h2 className="text-2xl font-bold text-[#C3C37E] mb-4">¿Quieres reservar?</h2>
                    <Link to="/signup">
                      <button
                        className="bg-[#C3C37E] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer"
                        onClick={() => {
                          setShowModal(false);
                          setSelectedEvent(null);
                        }}
                      >
                        ¡Regístrate!
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

//metodo para los colores, actualizar
function getEventColor(spots, capacity) {
  const total = Number(capacity);
  const percentage = (spots / total) * 100;

  if (percentage > 50) return 'bg-green-200 text-green-800';
  if (percentage >= 25) return 'bg-yellow-200 text-yellow-800';
  if (percentage > 0) return 'bg-orange-200 text-yellow-800';
  return 'bg-red-200 text-red-800';
}


export default MonthView;