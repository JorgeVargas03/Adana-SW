// utils/auth.js

export function isTokenValid() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decode base64 payload
    const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos

    if (payload.exp && payload.exp > currentTime) {
      return true;
    } else {
      // Token expirado
      localStorage.removeItem('token');
      return false;
    }
  } catch (error) {
    console.error('Token inválido', error);
    localStorage.removeItem('token');
    return false;
  }
}

export function removeToken() {
  localStorage.removeItem('token');
}