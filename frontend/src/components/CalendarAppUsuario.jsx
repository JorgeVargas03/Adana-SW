import React, { useEffect, useState } from 'react';
import { startOfMonth } from 'date-fns';
import MonthView from './MonthView';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CalendarAppUsuario = ({month, user}) =>{
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserClasses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const instructorId = user?.id;
        console.log(instructorId)

        //const res = await axios.get(`http://localhost:3001/adana-api/v1/classes/instructor/${instructorId}/myClasses`);
                                    //checar la ruta
        
        //const res2 = await axios.get(`/instructor/${instructorId}/class/${instructorId}/details`);
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

    fetchUserClasses();
  }, [instructorId]);

  return (
    <div className="w-full p-4 rounded-xl">


      <MonthView month={firstDayOfMonth} events={classes} />
    </div>
  );

}

export default CalendarAppUsuario;