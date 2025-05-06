import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, getDay, isSameDay, eachDayOfInterval } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { es } from 'date-fns/locale';

function MonthViewReservaClientes({ month }) {
  const [days, setDays] = useState([]);
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const firstDayIndex = (getDay(startOfMonth(month)) + 6) % 7;

  // Generar los días del mes
  useEffect(() => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month)
    });
    setDays(daysInMonth);
  }, [month]);

  return (
    <div className="bg-[#F5F0FF] font-outfit rounded-3xl shadow-lg p-6 w-full h-full relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#7E5EC3]">
        {format(month, 'MMMM yyyy', { locale: es })}
      </h2>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center text-[#A18CD1] font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        <AnimatePresence>
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            return (
              <motion.div
                key={day}
                className={`bg-white border border-[#E9DFFB] p-3 rounded-2xl min-h-[150px] flex flex-col items-center cursor-pointer hover:bg-[#f2e9fc] ${isToday ? 'ring-2 ring-[#7E5EC3] bg-[#f6f0ff]' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-md font-medium text-[#7E5EC3] mb-1">
                  {format(day, 'd')}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MonthViewReservaClientes;
