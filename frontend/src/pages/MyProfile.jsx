import React, { useState, useRef, useEffect } from 'react';
import { PaperClipIcon, CameraIcon } from '@heroicons/react/20/solid';
import iconDefault from '../assets/images/mymelokuromi.jpg';
import {useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth'; // Asegúrate de tener estas funciones

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    profile_picture: {
        base64: '',
        mimeType: ''
      }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(iconDefault);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          // Redirigir a login si no hay token
          navigate("/signin");
          return;
        }

        const userData = localStorage.getItem("user");
        const user = JSON.parse(userData);

        const userId = user.id;

        const response = await fetch(`/adana-api/v1/users/${userId}/info`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        });

        if (!response.ok) throw new Error('Error al obtener datos del usuario');

        const data = await response.json();
        
        setUserData({
          nombre: data.name || '',
          apellido: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          profilePic: data.profile_picture || iconDefault
        });
        
      } catch (error) {
        setError(error.message);
        removeToken();
        // Redirigir a login si hay error
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Crear preview temporal (solo para visualización en el frontend)
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Extrae solo el Base64 sin el prefijo
      setUserData(prev => ({
        ...prev,
        profilePicture: {
          base64: base64String,
          mimeType: file.type
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  

  const handleUpdate = async () => {
    try {
      const token = getToken();
      const userId = getUserIdFromToken(token);
      
      const response = await fetch(`/adana-api/v1/users/${userId}/info`, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          firstName: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone
        })
      });

      if (!response.ok) throw new Error('Error al actualizar los datos');
      
      // Manejar respuesta exitosa
      alert('Datos actualizados correctamente');
      
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-accent1/70 py-12 font-Outfit pt-30">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Foto de perfil */}
          <div className="relative md:w-1/3 bg-[#F0F1D2] flex flex-col items-center justify-center py-10">
            <div className="relative">
              <img
                src={userData.profilePic}
                alt="User Icon"
                className="w-50 h-50 rounded-full object-cover border-4 border-white shadow-md"
              />

              <button
                type="button"
                onClick={handleButtonClick}
                className="cursor-pointer absolute bottom-1 right-1 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 border-2 border-white"
              >
                <CameraIcon className="h-6 w-6" />
              </button>
            </div>

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
            <div className="border-b pb-6 mb-6 border-gray-400">
              <h3 className="text-2xl font-semibold text-fontdef">Perfil de usuario</h3>
              <p className="mt-1 text-sm text-fontdef/50">Visualiza y edita tu información aquí.</p>
            </div>

            <dl className="divide-y divide-gray-200">
              {/* Campos del formulario */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Nombre</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={userData.nombre}
                    onChange={(e) => setUserData({...userData, nombre: e.target.value})}
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </dd>
              </div>

              {/* Resto de campos similares con userData */}
              
              {/* Correo */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Correo</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={userData.email}
                    readOnly
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </dd>
              </div>

              {/* Botón guardar */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleUpdate}
                  className="w-1/2 py-3 px-6 text-white bg-fontlink hover:bg-linkselect rounded-lg font-semibold transition duration-200"
                >
                  Guardar cambios
                </button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;