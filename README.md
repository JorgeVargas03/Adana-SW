# Sistema de Gestión de Clases y Pagos

## Descripción del Proyecto

Este proyecto tiene como objetivo desarrollar un sistema integral que facilite la gestión de clases y pagos para una institución educativa o plataforma de aprendizaje. El sistema permitirá a los instructores crear y administrar clases, mientras que los estudiantes podrán inscribirse en ellas y realizar los pagos correspondientes de manera eficiente y segura.

## Estado del Proyecto

🚧 Proyecto en construcción 🚧

Actualmente, nos encontramos en las fases iniciales de planificación y estructuración del proyecto. A medida que avancemos en el desarrollo, se proporcionarán actualizaciones periódicas sobre el progreso y las funcionalidades implementadas.

## Estructura de Datos

Para garantizar una gestión eficiente de la información, hemos diseñado una estructura de datos en formato JSON que refleja las relaciones entre usuarios, clases y pagos. A continuación, se presenta un ejemplo de esta estructura:

```json
{
  "users": {
    "instructor_1": {
      "name": "Carlos Martínez",
      "email": "carlos.martinez@example.com",
      "password": "contraseña_encriptada",
      "role": "instructor",
      "estado": "activo",
      "clases": {
        "class_101": {
          "title": "Pilates Básico",
          "description": "Clase introductoria a Pilates",
          "price": 200,
          "schedule": {
            "date": "2025-05-10",
            "time": "09:00"
          },
          "capacity": 10,
          "reservations": {
            "res_1001": {
              "client_id": "student_1",
              "status": "confirmed"
            }
          }
        }
      }
    },
    "student_1": {
      "name": "Ana López",
      "email": "ana.lopez@example.com",
      "password": "contraseña_encriptada",
      "role": "cliente",
      "estado": "activo",
      "profile": {
        "phone": "+52 55 1234 5678",
        "registeredAt": "2025-04-01T10:00:00Z"
      }
    }
  },
  "payments": {
    "payment_5001": {
      "client_id": "student_1",
      "amount": 200,
      "date": "2025-04-05T15:45:00Z",
      "method": "PayPal",
      "status": "completed"
    }
  }
}