import { useEffect, useState } from "react";
import { startOfMonth } from "date-fns";
import MonthViewInstructor from "../components/MonthViewInstructor";
import axios from "axios";

function CalendarAppInstructor() {
  const [classes, setClasses] = useState([]);
  const firstDayOfMonth = startOfMonth(new Date());

  useEffect(() => {
    const fetchInstructorClasses = async () => {
      try {
        const instructorId = JSON.parse(localStorage.getItem("user"))?.id;
        const response = await axios.get(`http://localhost:3001/adana-api/v1/classes/instructor/${instructorId}/myClasses`);
        const data = response.data;

        const formattedClasses = data.Clases.map(clase => ({
          classId: clase.id,
          title: clase.title,
          date: clase.schedule.date,
          time: clase.schedule.time,
          instructorId: instructorId,
          availableSpots: clase.capacity-clase.reserved,
          capacity: clase.capacity,
        }));

        setClasses(formattedClasses);
      } catch (error) {
        console.error("Error al cargar clases del instructor:", error);
      }
    };

    fetchInstructorClasses();
  }, []);

  return (
    <div className="w-full h-full p-4">
      <MonthViewInstructor month={firstDayOfMonth} events={classes} />
    </div>
  );
}

export default CalendarAppInstructor;
