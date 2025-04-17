// services/classService.js
const { userCollection } = require("../models/users");
const { v4: uuidv4 } = require("uuid");

// Servicio para crear una nueva clase
exports.createClass = async (instructorId, classData) => {
    try {
        const instructorRef = userCollection.doc(instructorId);
        const instructorDoc = await instructorRef.get();

        // Verificar si el usuario existe
        if (!instructorDoc.exists) {
            return { success: false, message: "Instructor no encontrado" };
        }

        const instructor = instructorDoc.data();

        // Verificar si el usuario tiene rol de instructor
        if (instructor.role !== "instructor") {
            return { success: false, message: "Solo los instructores pueden crear clases" };
        }

        // Generar ID único para la clase
        const classId = `class_${uuidv4()}`;

        // Crear nueva clase
        const newClass = {
            title: classData.title,
            description: classData.description,
            price: classData.price,
            schedule: {
                date: classData.schedule.date,
                time: classData.schedule.time,
            },
            capacity: classData.capacity,
            reservations: {} // Inicialmente vacío
        };

        // Agregar clase al objeto existente o crear campo si no existe
        const updatedClasses = instructor.clases || {};
        updatedClasses[classId] = newClass;

        // Actualizar documento del instructor con la nueva clase
        await instructorRef.update({
            clases: updatedClasses
        });

        return { success: true, message: "Clase creada exitosamente", classId };
    } catch (error) {
        console.error("Error al crear la clase:", error);
        return { success: false, message: "Error del servidor" };
    }
};
