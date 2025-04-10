import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REST_API_ECOMMERCE
});

export default instance;