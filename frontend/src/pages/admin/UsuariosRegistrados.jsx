import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import iconDefault from '../../assets/images/icon.png';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

const UsuariosRegistrados = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [genderFilter, setGenderFilter] = useState("Todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    role: '',
  });

  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setSelectedUser(null);
      }
    }

    if (selectedUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/adana-api/v1/users`);
        const data = response.data;

        const formattedUsers = data.map(user => ({
          id: user.id,
          name: `${user.name} ${user.lastname}`,
          email: user.email,
          role: user.role,
          status: user.status,
          profile_picture: user.profile_picture,
          phone: user.phone,
          gender: user.gender,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", formData);
      console.log("Usuario creado:", response.data);
      setIsModalOpen(false);
      setFormData({ name: '', lastname: '', email: '', password: '', phone: '', gender: '', role: '' });
    } catch (error) {
       if (error.response && error.response.status === 400) {
        toast.error("Error ese correo ya está en uso.");
         console.log("Error, este correo ya está en uso")
      } else {
        setError("Ocurrió un error al registrar el usuario");
       
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "Todos" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesGender = genderFilter === "Todos" || user.gender?.toLowerCase() === genderFilter.toLowerCase();
    return matchesName && matchesRole && matchesGender;
  });

  return (
    <section className="bg-bgcolor min-h-screen">
      <div className="p-6 flex relative bg-bgcolor">
        <div className="flex-1 font-Outfit">
          <div className="mb-30" />
          <div className="flex items-center mb-10 gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-fontdef">Usuarios Registrados</h1>
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-fontdef/50 rounded-lg p-2 text-fontdef bg-barcolor"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border-2 border-fontdef/50 rounded-lg p-2 text-fontdef bg-barcolor cursor-pointer"
            >
              <option value="Todos">Todos los roles</option>
              <option value="administrador">Administrador</option>
              <option value="instructor">Instructor</option>
              <option value="cliente">Cliente</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border-2 border-fontdef/50 rounded-lg p-2 text-fontdef bg-barcolor cursor-pointer"
            >
              <option value="Todos">Todos los géneros</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-accent2 text-white rounded-lg hover:bg-accent2/90 transition"
            >
              Agregar usuario
            </button>
          </div>

          <ul role="list" className="divide-y divide-gray-100 bg-barcolor rounded-2xl">
            {filteredUsers.map((usuario) => (
              <li
                key={usuario.email}
                onClick={() => setSelectedUser(usuario)}
                className="flex justify-between gap-x-6 py-5 px-6 cursor-pointer hover:bg-gray-100 rounded-xl transition"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={usuario.profile_picture || iconDefault}
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{usuario.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{usuario.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900 capitalize">{usuario.role}</p>
                  <p className="mt-1 text-xs/5 text-gray-500 uppercase">{usuario.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

             {/* Panel lateral con diseño mejorado */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              key="sidepanel"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={panelRef}
              className="w-96 h-115 sticky top-0 right-0 bottom-0 bg-white shadow-2xl rounded-l-3xl p-6 mt-25 z-10 border-l-2 border-gray-200 "
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold mt-2 cursor-pointer"
              >
                ×
              </button>
              <div className="text-center mt-10 font-Outfit">
                <img
                  src={selectedUser.profile_picture || iconDefault}
                  alt="Foto de perfil"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-accent2"
                />
                <h2 className="text-xl font-bold text-fontdef">{selectedUser.name}</h2>
                <p className="text-sm text-gray-600 mb-6">{selectedUser.email}</p>
                <div className="text-left text-fontdef space-y-2 text-sm">
                  <p><strong>ID:</strong> {selectedUser.id}</p>
                  <p><strong>Rol:</strong> {selectedUser.role}</p>
                  <p><strong>Estado:</strong> {selectedUser.status}</p>
                  <p><strong>Género:</strong> {selectedUser.gender || "No especificado"}</p>
                  <p><strong>Teléfono:</strong> {selectedUser.phone || "No disponible"}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal para agregar usuario */}
        {isModalOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <h2 className="text-lg font-semibold text-fontdef mb-4">Registrar nuevo usuario</h2>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" />
                <input type="text" placeholder="Apellido" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} className="input" />
                <input type="email" placeholder="Correo" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" />
                <input type="password" placeholder="Contraseña" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input" />
                <input type="tel" placeholder="Teléfono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input" />
                <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="input">
                  <option value="">Seleccione género</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Otro">Otro</option>
                </select>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="input">
                  <option value="">Seleccione rol</option>
                  <option value="cliente">Cliente</option>
                  <option value="instructor">Instructor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancelar</button>
                <button onClick={handleUserSubmit} className="px-4 py-2 bg-accent2 text-white rounded-md hover:bg-accent2/90">Registrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsuariosRegistrados;
