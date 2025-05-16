import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone } from "lucide-react";
import { completeRegistration } from "../services/loginWithGoogle";
import { toast } from "react-toastify";

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
      toast.success(`Registro completado exitosamente. Bienvenido ${response.name}`);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (error) {
      toast.error("Error al completar el registro.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-[#C3C37E] pt-28 pb-28 pl-28 pr-28">

      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-[#FDF9EC] rounded-2xl shadow-xl overflow-hidden">
        {/* LADO IMAGEN */}
        <div className="flex justify-center items-center p-6 md:w-1/2 bg-[#EDE8D0]">
          <img
            src={formData.profile_picture || '/default-profile.png'}
            alt="Perfil"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* LADO FORMULARIO */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#413324] mb-6 text-center">
            Completa tu registro
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Nombre", name: "name", icon: User, type: "text" },
              { label: "Apellido", name: "lastname", icon: User, type: "text" },
              { label: "Correo", name: "email", icon: Mail, type: "email", disabled: true },
              { label: "Contraseña", name: "password", icon: Lock, type: "password", note: "(opcional, solo si deseas ingresar sin Google)" },
              { label: "Teléfono", name: "phone", icon: Phone, type: "tel" }
            ].map(({ label, name, icon: Icon, type, disabled, note }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1 text-[#413324]">{label}
                  {note && <span className="text-xs text-gray-500 ml-1">{note}</span>}
                </label>
                <div className={`flex items-center gap-2 border rounded-2xl p-3 ${disabled ? 'bg-gray-100' : 'bg-[#F0F1D2]'}`}>
                  <Icon className="text-gray-500" size={20} />
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`w-full outline-none bg-transparent text-base ${disabled ? 'cursor-not-allowed' : ''}`}
                    required={!disabled && name !== 'password'}
                  />
                </div>
              </div>
            ))}

            {/* Género */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#413324]">Género</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-2xl bg-white text-gray-700 text-base"
                required
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Imagen oculta */}
            <input type="hidden" name="profileImage" value={formData.profile_picture} />

            <button
              type="submit"
              className="w-full bg-[#C3C37E] hover:bg-[#b1b167] transition-colors text-white p-3 rounded-2xl font-semibold text-lg mt-4"
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
