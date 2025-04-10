# 📝 API REST - Gestión de Publicaciones y Comentarios

Este proyecto es una API REST construida con **Node.js** y **Express** que permite gestionar publicaciones, comentarios y tendencias. La API está diseñada para ser sencilla de consumir, ideal para prácticas académicas, pruebas de integración o como base para proyectos más complejos.

## 🚀 Características principales

- 📄 CRUD completo de publicaciones (crear, consultar, actualizar y eliminar)
- 💬 Gestión de comentarios por publicación (agregar, consultar, actualizar y eliminar)
- 👍 Sistema de likes en comentarios
- 🔥 Endpoint para consultar las publicaciones más populares (likes + comentarios)
- 📂 Conexión con base de datos para almacenamiento persistente
- 🧪 Filtrado de lenguaje inapropiado al crear comentarios

## 📚 Tecnologías utilizadas

- **Node.js** - Entorno de ejecución JavaScript del lado del servidor
- **Express.js** - Framework web para Node.js
- **MongoDB / Firestore** (según configuración del equipo) - Base de datos para almacenamiento de publicaciones y comentarios
- **Postman** o similar - Para pruebas de los endpoints
- **Render** - Para despliegue y pruebas online del backend

## 📦 Estructura general (provisional)

- `/routes` - Archivos con rutas del servidor
- `/controllers` - Lógica que gestiona las solicitudes a la API
- `/models` - (Próximamente) Esquemas y estructuras de los datos
- `/middlewares` - (Próximamente) Validaciones, filtrado y autenticación
- `/services` - (Próximamente) Servicios auxiliares o integraciones externas

## 🔐 Autenticación

Actualmente, la API no requiere autenticación para probar los endpoints. En futuras versiones podría integrarse un sistema de autenticación con `API Keys` o `JWT`.

## 📍 Ejemplo de despliegue

> Puedes probar esta API en:  
> [https://ejercicio-apirest-nodejs.onrender.com/api/publication](https://ejercicio-apirest-nodejs.onrender.com/api/publication)

## 📄 Documentación de endpoints

La documentación completa de los endpoints disponibles se encuentra en el archivo `documentacion_endpoints.md` (o en la carpeta `/docs`, según la estructura del proyecto).

## 🧑‍💻 Equipo de desarrollo

Este proyecto fue desarrollado como parte de una actividad académica por estudiantes de Ingeniería en Sistemas Computacionales, buscando aplicar conceptos fundamentales del desarrollo de APIs RESTful y buenas prácticas backend.

---

**Nota:** Este repositorio está en desarrollo activo. El código fuente será publicado próximamente.

