
---
# 📥 Endpoint: Registro de Usuario

## 🔗 URL



## 📝 Descripción

Registra un nuevo usuario en la plataforma (cliente, instructor o administrador) utilizando su correo electrónico y contraseña.

- La contraseña es encriptada con `bcrypt`.
- La información del usuario se almacena en Firebase Firestore.
- Se valida que el correo no esté previamente registrado.


## 📨 Request Body (JSON)

```json
{
  "name": "Brit",
  "lastname": "Backend",
  "email": "brit@example.com",
  "password": "123456",
  "role": "cliente",
  "gender": "femenino",
  "phone": "1234567890"
}

# 🔐 Endpoint: Inicio de Sesión

## 🔗 URL


---

## 📝 Descripción

Este endpoint permite a los usuarios registrados (cliente, instructor o administrador) iniciar sesión usando su **correo electrónico** y **contraseña**.

Valida credenciales, verifica si el correo ha sido confirmado (`isVerified`), y devuelve un **token JWT** junto con los datos del usuario para autenticación y redirección.

---

## 📨 Request Body (JSON)

```json
{
  "email": "brit@example.com",
  "password": "123456"
}

# 🔐 Endpoint: Inicio de Sesión / Registro con Google

## 🔗 URL


---

## 📝 Descripción

Este endpoint permite a los usuarios autenticarse mediante su cuenta de **Google** usando Firebase Authentication.

- Si el usuario ya está registrado en Firestore, se le permite iniciar sesión directamente.
- Si no está registrado, se crea automáticamente un nuevo usuario en la base de datos usando los datos del token.
- Siempre se devuelve un **token JWT** con los datos necesarios para redirección en el frontend.

---

## 📨 Request Body (JSON)

```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." 
}


# 🔐 Endpoint: Inicio de Sesión con Cuenta de Google (sin registro automático)

## 🔗 URL


---

## 📝 Descripción

Este endpoint permite a los usuarios iniciar sesión en la plataforma usando su **cuenta de Google**, autenticada previamente con **Firebase Authentication**.

- Si el correo ya existe en Firestore, se genera un token JWT y se devuelven los datos del usuario.
- Si no existe, se devuelve un mensaje de error indicando que debe registrarse primero.

Este flujo es útil cuando el frontend **quiere separar el registro y el login** con Google.

---

## 📨 Request Body (JSON)

```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." 
}

