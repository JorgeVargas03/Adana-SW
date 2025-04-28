import React, { useState, useEffect } from 'react';
import { PaperClipIcon, CameraIcon } from '@heroicons/react/20/solid';
import iconDefault from '../assets/images/mymelokuromi.jpg';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, removeToken } from '../utils/auth';

const MyProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    profile_picture: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null); // Guardamos la nueva imagen si cambia
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token) {
          removeToken();
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:3001/adana-api/v1/users/${user.id}/info`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
        }

        const data = await response.json();

        setProfileData({
          name: data.name || '',
          lastname: data.lastname || '',
          email: data.email || '',
          phone: data.phone || '',
          profile_picture: data.profile_picture || '',
        });

        setOriginalData({
          name: data.name || '',
          lastname: data.lastname || '',
          phone: data.phone || '',
          profile_picture: data.profile_picture || '',
        });
      } catch (error) {
        console.error('Error cargando la información del perfil:', error);
        removeToken();
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB

    if (file.size > MAX_SIZE) {
      alert('La imagen es demasiado grande. El tamaño máximo es 1MB.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      // Crear un objeto de imagen para redimensionar
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        // Redimensionar la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Cambiar el tamaño de la imagen, por ejemplo, a un máximo de 500px de ancho
        const MAX_WIDTH = 500;
        const scale = MAX_WIDTH / img.width;
        const newHeight = img.height * scale;
        canvas.width = MAX_WIDTH;
        canvas.height = newHeight;

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir a base64
        const base64 = canvas.toDataURL(file.type); // Obtén base64 del canvas
        const mimeType = file.type;

        // Guardar la nueva imagen
        setNewProfilePicture({
          data: base64.split(',')[1], // Extraer solo el contenido de base64
          mimeType: mimeType,
        });

        // Actualizar el estado de la imagen en el perfil
        setProfileData((prev) => ({
          ...prev,
          profile_picture: base64,
        }));
      };
    };

    reader.readAsDataURL(file); // Leer el archivo como base64
  };



  const handleSaveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if (!user || !token) {
      removeToken();
      navigate('/login');
      return;
    }
  
    const body = {}; // Creamos un objeto para enviar los datos
  
    let hasChanges = false; // Variable para verificar si hay cambios
  
    // Solo agregar campos que realmente han cambiado
    if (profileData.name !== originalData.name) {
      body.name = profileData.name;
      hasChanges = true;
    }
  
    if (profileData.lastname !== originalData.lastname) {
      body.lastname = profileData.lastname;
      hasChanges = true;
    }
  
    if (profileData.phone !== originalData.phone) {
      body.phone = profileData.phone;
      hasChanges = true;
    }
  
    if (newProfilePicture && newProfilePicture.data !== originalData.profile_picture) {
      // Agregar la imagen en formato base64 y su mimeType
      body.profile_picture = newProfilePicture.data;
      body.profile_picture_mime_type = newProfilePicture.mimeType;
      hasChanges = true;
    }
    console.log(newProfilePicture)
  
    // Si no hay cambios, no hacer la solicitud
    if (!hasChanges) {
      alert('No hay cambios para guardar');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/adana-api/v1/users/profile/${user.id}/updateProfile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Enviamos el cuerpo como JSON
        },
        body: JSON.stringify(body), // Usamos JSON.stringify para enviar los datos
      });
  
      if (!response.ok) {
        throw new Error('Error actualizando el perfil');
      }
  
      const updatedData = await response.json();
      console.log('Perfil actualizado:', updatedData);
  
      // Actualizar los datos en localStorage si la actualización fue exitosa
      setOriginalData((prevData) => ({
        ...prevData,
        name: updatedData.name,
        lastname: updatedData.lastname,
        phone: updatedData.phone,
        profile_picture: updatedData.profile_picture,
      }));
  
      setProfileData(updatedData);
  
      alert('Cambios guardados exitosamente');
      navigate(0); // Refresca la página para recargar la información
    } catch (error) {
      console.error('Error guardando cambios:', error);
      alert('Hubo un error guardando los cambios');
    }
  };
  
  
  
  

  return (
    <section className="min-h-screen flex items-center justify-center bg-accent1/70 py-12 font-Outfit pt-30">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Foto de perfil */}
          <div className="relative md:w-1/3 bg-[#F0F1D2] flex flex-col items-center justify-center py-10">
            <div className="relative">
              <img
                src={profileData.profile_picture || iconDefault}
                alt="User Icon"
                className="w-50 h-50 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label className="cursor-pointer absolute bottom-1 right-1 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 border-2 border-white">
                <CameraIcon className="h-6 w-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <h2 className="mt-6 text-xl font-bold text-gray-700">Foto de Perfil</h2>
          </div>

          {/* Información de usuario */}
          <div className="flex-1 p-8">
            <div className="border-b pb-6 mb-6 border-gray-400">
              <h3 className="text-2xl font-semibold text-fontdef">Perfil de usuario</h3>
              <p className="mt-1 text-sm text-fontdef/50">Visualiza y edita tu información aquí.</p>
            </div>

            <dl className="divide-y divide-gray-200">
              {/* Nombre */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Nombre</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </dd>
              </div>

              {/* Apellido */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Apellido</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={profileData.lastname}
                    onChange={(e) => setProfileData({ ...profileData, lastname: e.target.value })}
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </dd>
              </div>

              {/* Correo */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Correo</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    readOnly
                    value={profileData.email}
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </dd>
              </div>

              {/* Teléfono */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-fontdef">Teléfono</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full border border-gray-400 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </dd>
              </div>

              {/* Botón guardar */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSaveChanges}
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
};

export default MyProfile;
