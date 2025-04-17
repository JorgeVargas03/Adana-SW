# 🌿 ADANA SW - Sistema de Gestión de Citas para Pilates

![Badge en desarrollo](https://img.shields.io/badge/ESTADO-EN%20DESARROLLO-yellow) 

Plataforma web para gestión de reservas y horarios en estudio de pilates.

## 📋 Descripción del Proyecto

Sistema diseñado para optimizar:
- Experiencia de reserva para clientes
- Gestión de sesiones para instructores
- Administración centralizada

## 🚀 Funcionalidades Principales

### 👤 Módulo de Usuarios
- Registro de nuevos usuarios (clientes, instructores, administradores)
- Consulta de usuarios registrados
- Gestión de estados (Activo/Bloqueado/Baneado)

### 🧘 Módulo de Clases
- Creación de clases con detalles completos
- Consulta de disponibilidad con código de colores
- Historial completo (pasadas/futuras)
- Sistema de reservas integrado

### 💳 Módulo de Pagos (Simulado)
- Registro de transacciones
- Seguimiento de estados (completado/pendiente)
- Historial de movimientos

## 🚫 Limitaciones Actuales
| Función                    | Estado  |
|----------------------------|---------|
| Cancelación/modificación    | ❌      |
| Reservas >2 meses           | ❌      |
| Múltiples cupos             | ❌      |
| Recordatorios automáticos   | ❌      |
| Pagos reales                | ❌      |

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
