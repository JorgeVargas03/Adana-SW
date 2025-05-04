import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Phone, Venus, Mars } from "lucide-react";
import { completeRegistration } from "../services/loginWithGoogle";

const CompleteRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
    email: "",
    gender: "",
    phone: "",
    profile_picture: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
        profile_picture: storedUser.profile_picture || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await completeRegistration(formData);
      console.log(response)
      alert(`Registro completado exitosamente. Bienvenido ${response.name}`);
      // Guarda el token en localStorage
      window.dispatchEvent(new Event('storage'));
      // Redirigir después de un inicio de sesión exitoso
      navigate('/');
    } catch (error) {
      alert("Error al completar el registro.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#C3C37E]">
      <div className="flex w-11/12 md:w-9/12 h-[700px] rounded-2xl bg-[#FDF9EC] shadow-xl">
        {/* LOGO + BARRA */}
        <div className="flex-1 relative flex items-center justify-center">
          <img
            src={formData.profile_picture || '/default-profile.png'}
            alt="Perfil"
            className="w-3/4 max-w-[300px] h-auto rounded-full border-4 border-white shadow-md"
          />
          <div className="hidden lg:flex h-full w-[15px] bg-gray-200 absolute right-0"></div>
        </div>

        {/* FORMULARIO */}
        <div className="flex-1 flex flex-col items-center justify-start pt-16 h-full ml-[-7.5px] overflow-y-auto">
          <h2 className="text-4xl font-bold font-outfit text-[#413324] mb-8">
            Completa tu registro
          </h2>

          <form onSubmit={handleSubmit} className="w-full px-8 space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">Nombre</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 bg-[#F0F1D2]">
                <User className="text-gray-500" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-lg"
                  required
                />
              </div>
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">Apellido</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 bg-[#F0F1D2]">
                <User className="text-gray-500" size={20} />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-lg"
                  required
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">Correo</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 bg-gray-100">
                <Mail className="text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full outline-none bg-transparent text-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">
                Contraseña
                <span className="text-sm text-gray-500 font-normal ml-2">
                  (opcional, solo si deseas ingresar sin Google)
                </span>
              </label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 bg-[#F0F1D2]">
                <Lock className="text-gray-500" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-lg"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">Teléfono</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl p-3 bg-[#F0F1D2]">
                <Phone className="text-gray-500" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-lg"
                  required
                />
              </div>
            </div>

            {/* Género */}
            <div>
              <label className="block text-lg font-medium mb-2 text-[#413324]">Género</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-2xl bg-white text-gray-700 text-lg"
                required
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>

            {/* Imagen (oculta) */}
            <input type="hidden" name="profileImage" value={formData.profile_picture} />

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full bg-[#C3C37E] hover:bg-[#b1b167] transition text-white p-3 rounded-2xl font-medium text-lg mt-6"
            >
              Completar registro
            </button>
          </form>
        </div>
      </div>
    </div>
  );


};

export default CompleteRegistration;
