import axios from "./axios_config"

//Tabla AllPrices
export const getAllPrices = () => axios.get(`/AllPrices/get`);
export const getPrice = (id) => axios.get(`/AllPrices/get/${id}`);
export const insertPrice = (values) => axios.post(`/AllPrices/insert`, values);
export const updatePrice = (id, values) => axios.put(`/AllPrices/update/${id}`, values);
export const deletePrice = (id) => axios.delete(`/AllPrices/delete/${id}`);

//Tabla Precios
export const insertPrecio = (id, values) => axios.post(`/Precios/insert/${id}`, values);
export const updatePrecio = (id, id_subdoc, values) => axios.put(`/Precios/update/${id}/${id_subdoc}`, values);
export const deletePrecio = (id, id_subdoc) => axios.delete(`/Precios/delete/${id}/${id_subdoc}`);

//Tabla Roles
export const insertRol = (id, values) => axios.post(`/Roles/insert/${id}`, values);
export const updateRol = (id, id_subdoc, values) => axios.put(`/Roles/update/${id}/${id_subdoc}`, values);
export const deleteRol = (id, id_subdoc) => axios.delete(`/Roles/delete/${id}/${id_subdoc}`);

//Tabla Promociones
export const insertPromocion = (id, values) => axios.post(`/Promociones/insert/${id}`, values);
export const updatePromocion = (id, id_subdoc, values) => axios.put(`/Promociones/update/${id}/${id_subdoc}`, values);
export const deletePromocion = (id, id_subdoc) => axios.delete(`/Promociones/delete/${id}/${id_subdoc}`);

//Tabla Negocios
export const insertNegocio = (id, values) => axios.post(`/Negocios/insert/${id}`, values);
export const updateNegocio = (id, id_subdoc, values) => axios.put(`/Negocios/update/${id}/${id_subdoc}`, values);
export const deleteNegocio = (id, id_subdoc) => axios.delete(`/Negocios/delete/${id}/${id_subdoc}`);
