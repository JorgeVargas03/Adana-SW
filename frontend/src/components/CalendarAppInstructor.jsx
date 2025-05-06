// CalendarAppInstructor.jsx
import React, { useEffect, useState } from 'react';
import { startOfMonth } from 'date-fns';
import MonthViewInstructor from './MonthViewInstructor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CalendarAppInstructor = ({ month, instructorId }) => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorClasses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const instructorId = user?.id;
        console.log(instructorId)

        const res = await axios.get(`http://localhost:3001/adana-api/v1/classes/instructor/${instructorId}/myClasses`);
        
        const res2 = await axios.get(`http://localhost:3001/adana-api/v1/classes/instructor/${instructorId}/class/${instructorId}/details`);
        //PARTE PENDIENTE
        const data = res.data;
        console.log("Respuesta del backend:", data);

        const formattedClasses = data.Clases.map(clase => ({
            title: clase.schedule.title,
            date: clase.schedule.date,
            time: clase.schedule.time,
            availableSpots: clase.capacity,
          }));          

        setClasses(formattedClasses);
      } catch (error) {
        console.error('Error al cargar las clases del instructor:', error);
      }
    };

    fetchInstructorClasses();
  }, [instructorId]);

  const handleCreateClass = () => {
    navigate(`/instructor/${instructorId}/crear-clase`);
  };

  const firstDayOfMonth = startOfMonth(month);

  return (
    <div className="w-full p-4 rounded-xl">
      <button
        onClick={handleCreateClass}
        className="absolute right-4 top-4 bg-[#7E7EC3] hover:bg-[#5f5fa5] text-white px-4 py-2 rounded-md shadow transition"
      >
        Crear Clase
      </button>

      <MonthViewInstructor month={firstDayOfMonth} events={classes} />
    </div>
  );
};

export default CalendarAppInstructor;
