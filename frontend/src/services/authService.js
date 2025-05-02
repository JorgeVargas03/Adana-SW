import axios from "axios";

const API_URL = "http://localhost:3001/auth"; // Ajusta si es necesario

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error desconocido al registrar" };
  }
};


export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(token);
    return user;
  } catch (error) {
    throw error.response?.data || { message: "Error desconocido al iniciar sesion" };
  }
};
