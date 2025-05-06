import React, { useState } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


const UsuariosRegistrados = () => {
  const [search, setSearch] = useState("");

  const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", tipo: "Admin" },
    { id: 2, nombre: "Ana Gómez", correo: "ana@example.com", tipo: "Usuario" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@example.com", tipo: "Usuario" },
  ];

  return (

    <section className="bg-accent1/70  min-h-screen items-center p-6">
      <div className="mt-30"></div>
      <div className="p-6 font-Outfit bg-barcolor rounded-3xl">
      <div className="flex items-center mb-10 ">
        <h1 className="text-5xl font-semibold mr-4 text-fontdef mx-4">Usuarios Registrados</h1>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 mr-4 mx-8"
        />
        <div className="flex space-x-2 ">
          <button className="p-2 rounded-full border hover:bg-accent2/70">
           
              <PencilIcon className="text-fontdef p-2 rounded-full w-8 h-8"/>
          </button>
          <button className="p-2 rounded-full border hover:bg-accent2/70">
               <TrashIcon className="text-fontdef p-2 rounded-full w-8 h-8"/>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg bg-bgcolor">
        <table className="min-w-full text-sm text-left text-fontdef">
          <thead className="bg-barcolor">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Correo</th>
              <th className="px-6 py-3">Tipo de Usuario</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter((usuario) =>
                usuario.nombre.toLowerCase().includes(search.toLowerCase())
              )
              .map((usuario) => (
                <tr key={usuario.id} className="bg-white border-b hover:bg-indigo-400/70">
                  <td className="px-6 py-4 mb-6">{usuario.id}</td>
                  <td className="px-6 py-4">{usuario.nombre}</td>
                  <td className="px-6 py-4">{usuario.correo}</td>
                  <td className="px-6 py-4">{usuario.tipo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  );
};

export default UsuariosRegistrados;
