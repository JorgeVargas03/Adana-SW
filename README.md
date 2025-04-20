# 🌿 ADANA SW - Sistema de Gestión de Citas para Pilates

![Badge en desarrollo](https://img.shields.io/badge/ESTADO-EN%20DESARROLLO-yellow) 

ADANA SW es una plataforma web desarrollada para facilitar la **reserva de clases de pilates** y la **gestión de horarios** en el estudio de pilates **Adana**. Este software busca optimizar la experiencia del cliente y al mismo tiempo ofrecer a administradores e instructores una herramienta eficiente para el manejo de sesiones.

## 📋 Descripción del Proyecto

El sistema permite a los clientes:
- Registrarse como usuarios
- Consultar clases disponibles
- Reservar un cupo en sesiones específicas

Y a los instructores y administradores:
- Crear nuevas clases
- Gestionar las reservas realizadas por los clientes
- Visualizar el historial de clases


## 🚫 Limitaciones Actuales: ¿Qué NO incluye esta versión del sistema?

| Función                    | Estado  |
|----------------------------|---------|
| Cancelación/modificación de reservaciones    | ❌      |
| Reservas >2 meses           | ❌      |
| Compra dem múltiples cupos  | ❌      |
| Recordatorios automáticos   | ❌      |
| Gestión de pagos reales     | ❌      |

## 📚 Funcionalidades implementadas

✅ Registro de usuario: Alta de nuevos usuarios (cliente, instructor o administrador).  
✅ Consulta de todos los usuarios registrados.  
✅ Cambio de estado de usuario: Activar, bloquear, banear.  
✅ Creación de clases: Por parte de instructores, con cupo, fecha, descripción, etc.  
✅ Consulta de disponibilidad de clases con código de colores.  
✅ Historial completo de clases (pasadas y futuras).  

## 🛠️ Modelo de Datos

### 👤 Estructura de Usuarios
```json
{
  "user_1": {
    "name": "Ana",
    "lastname": "López",
    "email": "ana.lopez@example.com",
    "password": "****",
    "role": "cliente",
    "estado": "activo",
    "sexo": "M",
    "phone": "+52 55 1234 5678",
    "registeredAt": "2025-04-01T10:00:00Z"
  },
  "user_2": {
    "name": "Carlos",
    "lastname": "Martínez",
    "email": "carlos.martinez@example.com",
    "password": "****",
    "role": "instructor",
    "estado": "activo",
    "sexo": "H",
    "phone": "+52 55 1234 5678",
    "registeredAt": "2025-04-01T10:00:00Z",
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
            "client_id": "user_1",
            "status": "confirmed"
          }
        }
      },
      "class_102": {
        "title": "Pilates Avanzado",
        "description": "Ejercicios avanzados de Pilates",
        "price": 300,
        "schedule": {
          "date": "2025-05-11",
          "time": "11:00"
        },
        "capacity": 8,
        "reservations": {}
      }
    }
  },
  "user_3": {
    "name": "Laura Gómez",
    "email": "laura.gomez@example.com",
    "password": "****",
    "role": "administrador",
    "estado": "activo",
    "profile": {
      "phone": "+52 55 8765 4321",
      "registeredAt": "2025-04-02T14:30:00Z"
    }
  }
}
```

## 🧘 Estructura de Clases

```json
{
  "class_101": {
    "title": "Pilates Básico",
    "description": "Clase introductoria",
    "price": 200,
    "schedule": {
      "date": "2025-05-10",
      "time": "09:00"
    },
    "capacity": 10,
    "reservations": {
      "res_1001": {
        "client_id": "user_1",
        "client_name": "Alan Brito",
        "status": "confirmed"
      }
    }
  }
}

```
### 💳 Estructura de Pagos
```json
{
  "payment_5001": {
    "client_id": "user_1",
    "amount": 200,
    "date": "2025-04-05T15:45:00Z",
    "method": "PayPal",
    "status": "completed"
  }
}
```
**Nota**: Esta es una versión en desarrollo del sistema. En futuras etapas se agregarán validaciones más robustas, autenticación de usuarios, recordatorios automáticos y una interfaz gráfica para clientes y administradores.