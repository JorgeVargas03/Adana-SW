import { useEffect, useState } from "react";
import { startOfMonth } from "date-fns";
import MonthViewAdmin from "./MonthViewAdmin";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function CalendarAppAdmin() {
  const [classes, setClasses] = useState([]);
  const firstDayOfMonth = startOfMonth(new Date());

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/adana-api/v1/classes/`);
      console.log("Respuesta de la API:", response.data);
      const data = response.data;

      const formattedClasses = data.map(clase => {
  const [year, month, day] = clase.date.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));

  return {
    classId: clase.id,
    title: clase.title,
    description: clase.description,
    price: clase.price,
    date: localDate,
    time: clase.time,
    instructorId: clase.instructorId,
    instructorName: clase.instructorName,
    availableSpots: clase.availableSpaces,
    capacity: clase.capacity,
  };
});


      setClasses(formattedClasses);
    } catch (error) {
      console.error("Error al cargar clases del estudio:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="w-full h-full p-4">
      <MonthViewAdmin
        month={firstDayOfMonth}
        events={classes}
        onClassAdded={fetchClasses}
      />
    </div>
  );
}

export default CalendarAppAdmin;
