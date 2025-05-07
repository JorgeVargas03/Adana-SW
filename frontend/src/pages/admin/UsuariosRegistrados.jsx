import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import iconDefault from '../../assets/images/icon.png';

const UsuariosRegistrados = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", tipo: "Admin" },
    { id: 2, nombre: "Ana Gómez", correo: "ana@example.com", tipo: "Usuario" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@example.com", tipo: "Usuario" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/adana-api/v1/users`);
        const data = response.data;

        const formattedUsers = data.map(user => ({
          id: user.id,
          name: `${user.name} ${user.lastname}`,
          email: user.email,
          role: user.role,
          status: user.status,
          profile_picture: user.profile_picture,
          phone: user.phone,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
  <section className="bg-bgcolor min-h-screen">
    <div className="p-6 flex relative bg-bgcolor">
      {/* Vista principal */}
      <div className="flex-1 font-Outfit">
      <div className="mb-30"></div>
        <div className="flex items-center mb-10">
          <h1 className="text-2xl font-semibold mr-4 text-fontdef">Usuarios Registrados</h1>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-fontdef/50 rounded-lg p-2 mr-4 text-fontdef bg-barcolor"
          />

        <div>
          
        </div>

        </div>

        {/* Encabezados */}
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-fontdef mb-2 px-2">
          <div>ID</div>
          <div>Nombre</div>
          <div>Correo</div>
          <div>Tipo</div>
        </div>

        {/* Tarjetas */}
        <ul role="list" className="divide-y divide-gray-100 bg-barcolor px-6 rounded-2xl">
        {users
  .filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((usuario) => (
    <li key={usuario.email} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={usuario.profile_picture || iconDefault} // opcional si no tienes imagen
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

      {/* Panel lateral animado */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            key="sidepanel"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-80 absolute right-0 top-0 bottom-0 bg-white shadow-xl rounded-l-xl p-6 border-l mt-30 border-gray-200 z-10"
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-3 text-fontdef hover:text-accent2 text-xl cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4 text-fontdef">Detalles del Usuario</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">ID:</span> {selectedUser.id}</p>
              <p><span className="font-medium">Nombre:</span> {selectedUser.nombre}</p>
              <p><span className="font-medium">Correo:</span> {selectedUser.correo}</p>
              <p><span className="font-medium">Tipo:</span> {selectedUser.tipo}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
  );
};

export default UsuariosRegistrados;
