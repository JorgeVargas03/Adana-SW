// services/classService.js
const { userCollection } = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const emailService = require('../utils/emailService');

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
            classes: updatedClasses
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

        // Obtener la fecha actual en zona horaria de Mazatlán
        const now = new Date();
        const localNowStr = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Mazatlan',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }).format(now);

        const [month, day, year, hour, minute, second] = localNowStr.match(/\d+/g);
        const today = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

        // Crear fecha máxima (2 meses después)
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 2);

        usersSnapshot.forEach(doc => {
            const instructor = doc.data();
            const instructorId = doc.id;

            if (instructor.classes) {
                Object.entries(instructor.classes).forEach(([classId, clase]) => {
                    const dateStr = clase.schedule?.date; // ejemplo: "2025-04-30"
                    const timeStr = clase.schedule?.time || "00:00"; // ejemplo: "15:30"
                    const classDate = new Date(`${dateStr}T${timeStr}:00`);

                    if (classDate >= today && classDate <= maxDate) {
                        const reservedCount = clase.reservations ? Object.keys(clase.reservations).length : 0;
                        const availableSpots = clase.capacity - reservedCount;

                        let availability = "green";
                        if (availableSpots === 0) availability = "red";
                        else if (availableSpots <= 5) availability = "yellow";

                        // Formatear fecha en español mexicano y en zona Mazatlán
                        const formattedDate = new Intl.DateTimeFormat('es-MX', {
                            timeZone: 'America/Mazatlan',
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }).format(classDate);

                        allClasses.push({
                            id: classId,
                            title: clase.title,
                            description: clase.description,
                            price: clase.price,
                            date: clase.schedule?.date,
                            time: clase.schedule?.time,
                            formattedDate,
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
        const classData = instructorData.classes?.[classId];
        if (!classData) {
            return { success: false, message: "Clase no encontrada" };
        }

        // Verificar disponibilidad
        const currentReservations = Object.keys(classData.reservations || {}).length;
        if (currentReservations >= classData.capacity) {
            return { success: false, message: "Clase sin disponibilidad" };
        }

        // Obtener datos del cliente
        const clientDoc = await userCollection.doc(userId).get();
        const clientData = clientDoc.data();

        // Agregar reserva
        const reservationId = `res_${Date.now()}`;
        classData.reservations = classData.reservations || {};
        classData.reservations[reservationId] = {
            client_id: userId,
            client_name: `${clientData.name} ${clientData.lastname}`,
            status: "confirmed",
        };

        // Actualizar clase en Firestore
        await userCollection.doc(instructorId).update({ [`classes.${classId}`]: classData });

        // Enviar correo de confirmación
        const classInfo = {
            title: classData.title,
            instructor: `${instructorData.name} ${instructorData.lastname}`,
            date: classData.schedule.date,
            time: classData.schedule.time,
            totalPrice: classData.price
        };

        await emailService.sendConfirmationEmail(clientData.email, classInfo);

        return { success: true, message: "Reserva realizada con éxito" };
    } catch (error) {
        console.error("Error al reservar clase:", error);
        return { success: false, message: "Error interno del servidor" };
    }
};

//Servicio para reservar multiples clases
exports.reserveMultipleClasses = async (userId, selectedClasses) => {
    const results = [];
    const updatesByInstructor = {};
    const confirmedClasses = [];

    try {
        // 1. Obtener datos del cliente una sola vez
        const clientDoc = await userCollection.doc(userId).get();
        if (!clientDoc.exists) {
            return { success: false, message: "Cliente no encontrado" };
        }

        const clientData = clientDoc.data();

        // 2. Procesar cada clase seleccionada
        for (const { instructorId, classId } of selectedClasses) {
            try {
                const instructorDoc = await userCollection.doc(instructorId).get();
                if (!instructorDoc.exists) {
                    results.push({ classId, success: false, message: "Instructor no encontrado" });
                    continue;
                }

                const instructorData = instructorDoc.data();
                const classData = instructorData.classes?.[classId];

                if (!classData) {
                    results.push({ classId, success: false, message: "Clase no encontrada" });
                    continue;
                }

                const currentReservations = Object.keys(classData.reservations || {}).length;
                if (currentReservations >= classData.capacity) {
                    results.push({ classId, success: false, message: "Clase sin disponibilidad" });
                    continue;
                }

                // Preparar reserva
                const reservationId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
                classData.reservations = classData.reservations || {};
                // Verificar si el usuario ya está inscrito
                const alreadyReserved = Object.values(classData.reservations).some(
                    (res) => res.client_id === userId
                );

                if (alreadyReserved) {
                    results.push({ classId, success: false, message: "Ya estás inscrito en esta clase" });
                    continue;
                }
                classData.reservations[reservationId] = {
                    client_id: userId,
                    client_name: `${clientData.name} ${clientData.lastname}`,
                    status: "confirmed",
                };

                // Acumular la clase modificada por instructor
                updatesByInstructor[instructorId] = updatesByInstructor[instructorId] || {};
                updatesByInstructor[instructorId][`classes.${classId}`] = classData;

                // Acumular para el correo de confirmación
                confirmedClasses.push({
                    title: classData.title,
                    instructor: `${instructorData.name} ${instructorData.lastname}`,
                    date: classData.schedule.date,
                    time: classData.schedule.time,
                    totalPrice: classData.price,
                });

                results.push({ classId, success: true });

            } catch (error) {
                console.error(`Error al procesar clase ${classId}:`, error);
                results.push({ classId, success: false, message: "Error interno al reservar esta clase" });
            }
        }

        // 3. Aplicar todas las actualizaciones en Firestore por instructor
        const updatePromises = Object.entries(updatesByInstructor).map(([instructorId, updateData]) =>
            userCollection.doc(instructorId).update(updateData)
        );

        await Promise.all(updatePromises);

        // 4. Enviar correo si hubo clases confirmadas
        if (confirmedClasses.length > 0) {
            await emailService.sendMultipleConfirmationEmail(clientData.email, confirmedClasses);
        }

        return {
            success: true,
            message: "Procesamiento completo",
            results,
        };

    } catch (error) {
        console.error("Error al reservar múltiples clases:", error);
        return {
            success: false,
            message: "Error general al procesar las reservas",
            results: [],
        };
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
            const clases = instructorData.classes || {};

            Object.entries(clases).forEach(([classId, classData]) => {
                const classReservations = classData.reservations || {};
                Object.values(classReservations).forEach((reservation) => {
                    if (reservation.client_id === userId) {
                        reservations.push({
                            classId,
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

// Servicio para obtener las clases de un instructor
exports.getInstructorClasses = async (instructorId) => {
    try {
        const instructorDoc = await userCollection.doc(instructorId).get();

        if (!instructorDoc.exists) {
            return { success: false, status: 404, message: "Instructor no encontrado." };
        }

        const instructorData = instructorDoc.data();
        const clases = instructorData.classes || {};

        const formattedClasses = Object.entries(clases).map(([classId, classData]) => {
            const reservationCount = Object.keys(classData.reservations || {}).length;

            return {
                id: classId,
                title: classData.title,
                description: classData.description,
                schedule: classData.schedule,
                capacity: classData.capacity,
                reserved: reservationCount,
            };
        });

        return { success: true, data: formattedClasses };
    } catch (error) {
        console.error("Error al obtener las clases del instructor:", error);
        return { success: false, status: 500, message: "Error al consultar las clases." };
    }
};

//Servicio para consultar el listado de alumnos de una clase
exports.getClassWithReservations = async (instructorId, classId) => {
    try {
        const instructorDoc = await userCollection.doc(instructorId).get();
        if (!instructorDoc.exists) {
            return { success: false, code: 404, message: "Instructor no encontrado" };
        }

        const instructorData = instructorDoc.data();
        const classData = instructorData.classes?.[classId];

        if (!classData) {
            return { success: false, code: 404, message: "Clase no encontrada" };
        }

        const reservations = classData.reservations || {};
        const students = [];

        for (const res of Object.values(reservations)) {
            const clientDoc = await userCollection.doc(res.client_id).get();
            if (clientDoc.exists) {
                const clientData = clientDoc.data();
                students.push({
                    id: res.client_id,
                    name: `${clientData.name} ${clientData.lastname}`,
                    phone: clientData.phone,
                    profile_picture: clientData.profile_picture
                });
            }
        }

        return {
            success: true,
            class: {
                id: classId,
                title: classData.title,
                date: classData.schedule?.date,
                time: classData.schedule?.time,
                capacity: classData.capacity,
                available: classData.capacity - students.length,
                instructor: `${instructorData.name} ${instructorData.lastname}`,
                students
            }
        };
    } catch (error) {
        console.error("Error al obtener detalles de la clase:", error);
        return { success: false, code: 500, message: "Error interno del servidor" };
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

            if (instructor.classes) {
                Object.entries(instructor.classes).forEach(([classId, clase]) => {
                    const reservations = clase.reservations
                        ? Object.entries(clase.reservations).map(([resId, res]) => ({
                            reservationId: resId,
                            client_name: res.client_name
                        }))
                        : [];

                    allClasses.push({
                        id: classId,
                        title: clase.title,
                        description: clase.description,
                        price: clase.price,
                        instructorId,
                        instructorName: `${instructor.name} ${instructor.lastname}`,
                        date: clase.schedule.date,
                        time: clase.schedule.time
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
