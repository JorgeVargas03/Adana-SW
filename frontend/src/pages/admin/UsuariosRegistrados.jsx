import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import iconDefault from '../../assets/images/icon.png';
const API_URL = import.meta.env.VITE_API_URL;
import { Dialog } from '@headlessui/react';


const UsuariosRegistrados = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [genderFilter, setGenderFilter] = useState("Todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

     const [newUser, setNewUser] = useState({
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      role: "",
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

  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "Todos" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesGender = genderFilter === "Todos" || user.gender?.toLowerCase() === genderFilter.toLowerCase();
    return matchesName && matchesRole && matchesGender;
  });

//poiner un fakin nuevo user
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario nuevo:", newUser);
    setIsModalOpen(false);
    // Aquí podrías hacer un POST con axios
  };


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
            {/*botón agrehgar neuvo usuario*/}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent2 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent2/90 cursor-pointer"
              >
                +
              </button>
          </div>

          <ul role="list" className="divide-y divide-gray-100 bg-barcolor px-6 rounded-2xl">
            {filteredUsers.map((usuario) => (
              <li
                key={usuario.email}
                onClick={() => setSelectedUser(usuario)}
                className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-100 rounded-xl transition"
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
              className="w-96 absolute right-0 top-0 bottom-0 bg-white shadow-2xl rounded-l-3xl p-6 mt-12 z-10 border-l-2 border-gray-200"
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
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

        {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-[#FFFDEF] p-6 shadow-xl space-y-4">
            <Dialog.Title className="text-lg font-bold text-gray-700">Nuevo Usuario</Dialog.Title>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="name" placeholder="Nombre" onChange={handleInputChange} className="input rounded-sm" required />
                <input type="text" name="lastname" placeholder="Apellido" onChange={handleInputChange} className="input" required />
              </div>
              <input type="email" name="email" placeholder="Correo electrónico" onChange={handleInputChange} className="input w-full" required />
              <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} className="input w-full" required />
              <input type="text" name="phone" placeholder="Teléfono" onChange={handleInputChange} className="input w-full" />
              <select name="gender" onChange={handleInputChange} className="input w-full cursor-pointer" required>
                <option value="">Selecciona género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
              <select name="role" onChange={handleInputChange} className="input w-full cursor-pointer" required>
                <option value="">Selecciona rol</option>
                <option value="administrador">Administrador</option>
                <option value="instructor">Instructor</option>
                <option value="cliente">Cliente</option>
              </select>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-accent2 text-white rounded-md cursor-pointer">Guardar</button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      </div>
    </section>
  );
};

export default UsuariosRegistrados;
