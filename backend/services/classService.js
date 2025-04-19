// services/classService.js
const { userCollection } = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const emailServive = require('../utils/emailService');

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
        const updatedClasses = instructor.classes || {};
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

// Obtener clases disponibles con código de colores y filtro de fechas
exports.getAvailableClasses = async () => {
    try {
        const usersSnapshot = await userCollection.where("role", "==", "instructor").get();

        if (usersSnapshot.empty) {
            return { success: false, message: "No hay instructores registrados." };
        }

        const allClasses = [];
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2); // Hasta 2 meses desde hoy

        usersSnapshot.forEach(doc => {
            const instructor = doc.data();
            const instructorId = doc.id;

            if (instructor.clases) {
                Object.entries(instructor.clases).forEach(([classId, clase]) => {
                    const classDate = new Date(clase.schedule?.date);
                    if (classDate >= today && classDate <= maxDate) {
                        const reservedCount = clase.reservations ? Object.keys(clase.reservations).length : 0;
                        const availableSpots = clase.capacity - reservedCount;

                        let availability = "green"; // Alta disponibilidad
                        if (availableSpots === 0) availability = "red"; // Sin disponibilidad
                        else if (availableSpots <= 5) availability = "yellow"; // Media disponibilidad

                        allClasses.push({
                            id: classId,
                            title: clase.title,
                            description: clase.description,
                            //type: clase.type || "pilates",
                            date: clase.schedule?.date,
                            time: clase.schedule?.time,
                            capacity: clase.capacity,
                            availableSpots,
                            availability,
                            instructorId,
                            instructorName: `${instructor.name} ${instructor.lastname}`
                        });
                    }
                });
            }
        });

        return { success: true, data: allClasses };
    } catch (error) {
        console.error("Error obteniendo clases:", error);
        return { success: false, message: "Error del servidor." };
    }
};


// Servicio para reservar una clase
exports.reserveClass = async (userId, classId, instructorId) => {
    try {
        const instructorDoc = await userCollection.doc(instructorId).get();
        if (!instructorDoc.exists) {
            return { success: false, message: "Instructor no encontrado" };
        }

        const instructorData = instructorDoc.data();
        const classData = instructorData.clases?.[classId];
        if (!classData) {
            return { success: false, message: "Clase no encontrada" };
        }

        // Verificar disponibilidad
        const currentReservations = Object.keys(classData.reservations || {}).length;
        if (currentReservations >= classData.capacity) {
            return { success: false, message: "Clase sin disponibilidad" };
        }

        // Agregar reserva
        const reservationId = `res_${Date.now()}`;
        classData.reservations = classData.reservations || {};
        classData.reservations[reservationId] = {
            client_id: userId,
            status: "confirmed",
        };

        // Actualizar clase en Firestore
        await userCollection.doc(instructorId).update({ [`clases.${classId}`]: classData });

        // Obtener datos del cliente
        const clientDoc = await userCollection.doc(userId).get();
        const clientData = clientDoc.data();

        // Enviar correo de confirmación
        const classInfo = {
            title: classData.title,
            instructor: `${instructorData.name} ${instructorData.lastname}`,
            date: classData.schedule.date,
            time: classData.schedule.time
        };

        await emailServive.sendConfirmationEmail(clientData.email, classInfo);

        return { success: true, message: "Reserva realizada con éxito" };
    } catch (error) {
        console.error("Error al reservar clase:", error);
        return { success: false, message: "Error interno del servidor" };
    }
};

// Servicio para obtener las reservas de un usuario
exports.getUserReservations = async (userId) => {
    try {
        const snapshot = await userCollection.get();
        const reservations = [];

        snapshot.forEach((doc) => {
            const instructorData = doc.data();
            const instructorName = `${instructorData.name} ${instructorData.lastname}`;
            const clases = instructorData.clases || {};

            Object.entries(clases).forEach(([classId, classData]) => {
                const classReservations = classData.reservations || {};
                Object.values(classReservations).forEach((reservation) => {
                    if (reservation.client_id === userId) {
                        reservations.push({
                            classTitle: classData.title,
                            instructor: instructorName,
                            date: classData.schedule.date,
                            time: classData.schedule.time
                        });
                    }
                });
            });
        });

        if (reservations.length === 0) {
            return { success: false, status: 404, message: "Este usuario no tiene reservaciones registradas." };
        }

        return { success: true, data: reservations };
    } catch (error) {
        console.error("Error al obtener las reservaciones del usuario:", error);
        return { success: false, status: 500, message: "Error al consultar las reservaciones." };
    }
};



//Servicio para obtener todo el historial de clases creadas
exports.getAllClassesHistory = async () => {
    try {
        const usersSnapshot = await userCollection.where("role", "==", "instructor").get();

        const allClasses = [];

        usersSnapshot.forEach(doc => {
            const instructor = doc.data();
            const instructorId = doc.id;

            if (instructor.clases) {
                Object.entries(instructor.clases).forEach(([classId, clase]) => {
                    const reservations = clase.reservations
                        ? Object.entries(clase.reservations).map(([resId, res]) => ({
                            reservationId: resId,
                            ...res
                        }))
                        : [];

                    allClasses.push({
                        id: classId,
                        title: clase.title,
                        description: clase.description,
                        price: clase.price,
                        schedule: clase.schedule,
                        capacity: clase.capacity,
                        reservations,
                        instructorId,
                        instructorName: `${instructor.name} ${instructor.lastname}`,
                        //type: clase.type || "N/A", // Por si usas un campo llamado "type"
                        //duration: clase.duration || "N/A"
                    });
                });
            }
        });

        return { success: true, data: allClasses };
    } catch (error) {
        console.error("Error obteniendo historial de clases:", error);
        return { success: false, message: "Error del servidor." };
    }
};