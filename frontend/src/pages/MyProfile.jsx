import React, { useState, useRef } from 'react';
import { PaperClipIcon, CameraIcon } from '@heroicons/react/20/solid'; // usando CameraIcon
import iconDefault from '../assets/images/mymelokuromi.jpg';

const MyProfile = () => {
  const [nombre, setNombre] = useState("nombreRandom");
  const [apellido, setApellido] = useState("apellidoRandom");
  const [password, setPassword] = useState("contraseñaRandom");
  const [profilePic, setProfilePic] = useState(iconDefault);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-accent1/70 py-12 font-Outfit pt-30">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Foto de perfil */}
<div className="relative md:w-1/3 bg-[#F0F1D2] flex flex-col items-center justify-center py-10">
  <div className="relative">
    {/* Imagen del usuario */}
    <img
      src={profilePic}
      alt="User Icon"
      className="w-50 h-50 rounded-full object-cover border-4 border-white shadow-md"
    />

    {/* Botón sobre la foto */}
    <button
      type="button"
      onClick={handleButtonClick}
      className="cursor-pointer absolute bottom-1 right-1 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 border-2 border-white"
    >
      <CameraIcon className="h-6 w-6" />
    </button>
  </div>

  {/* input oculto */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />

  <h2 className="mt-6 text-xl font-bold text-gray-700">Foto de Perfil</h2>
</div>


          {/* Información de usuario */}
          <div className="flex-1 p-8">
            <div className="border-b pb-6 mb-6">
              <h3 className="text-2xl font-semibold text-fontdef">Perfil de usuario</h3>
              <p className="mt-1 text-sm text-fontdef/50">Visualiza y edita tu información aquí.</p>
            </div>

            <dl className="divide-y divide-gray-200">
              {/* Nombre */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Nombre</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </dd>
              </div>

              {/* Apellido */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Apellido</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </dd>
              </div>

              {/* Correo */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Correo</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value="correoRandom@example.com"
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </dd>
              </div>

              {/* Contraseña */}
              {/* Contraseña */}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Contraseña</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 flex justify-center">
                    <button
                    type="button"
                    className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                    Cambiar
                    </button>
                </dd>
                </div>


            </dl>

            {/* Botón guardar */}
            <div className="mt-8 flex justify-center">
              <button
                className="w-1/2 py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition duration-200"
              >
                Guardar cambios
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
