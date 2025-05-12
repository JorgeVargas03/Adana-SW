import React, { useState, useEffect } from 'react';
import { PaperClipIcon, CameraIcon } from '@heroicons/react/20/solid';
import iconDefault from '../assets/images/icon.png';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isTokenValid, removeToken } from '../utils/auth';
import { toast } from "react-toastify";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

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
    fetchUserInfo();
  }, [navigate]);
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);


  const fetchUserInfo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        removeToken();
        navigate('/signin');
        window.dispatchEvent(new Event('storage'));
        return;
      }

      const response = await fetch(`${API_URL}/adana-api/v1/users/${user.id}/info`, {
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
      navigate('/signin');
      window.dispatchEvent(new Event('storage'));
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const checkIfUserHasPassword = async () => {
      try {
        const res = await fetch(`${API_URL}/adana-api/v1/users/profile/${userId}/hasPassword`);
        const data = await res.json();
        setHasPassword(data.hasPassword);
      } catch (error) {
        console.error("Error al verificar si el usuario tiene contraseña:", error);
      }
    };

    if (userId) {
      checkIfUserHasPassword();
    }
  }, []);

  const handleDiscardChanges = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      removeToken();
      navigate('/login');
      return;
    }

    let hasChanges = false;
    hasChanges = validateChanges(false);

    if (!hasChanges) {
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      name: originalData.name,
      lastname: originalData.lastname,
      phone: originalData.phone,
      profile_picture: originalData.profile_picture,
    }));
    setNewProfilePicture(null);

    toast.info("Sus modificaciones se han descartado");
  };

  const handleSaveNewPassword = async () => {
    // Validar que los campos no estén vacíos ni sean espacios en blanco
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Todos los campos son obligatorios y no deben ser espacios en blanco.");
      return;
    }

    // Verificar que la nueva contraseña y la confirmación sean iguales
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    // Llamar a la API para actualizar la contraseña
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        removeToken();
        navigate('/signin');
        return;
      }

      // Enviar solicitud PUT o PATCH a la API para actualizar la contraseña
      const response = await axios.put(
        `${API_URL}/adana-api/v1/users/profile/${user.id}/updatePassword`,
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        handleCloseModal(); // Cerrar modal después de éxito
      } else {
        toast.error(response.data.message || "Error al actualizar la contraseña.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Hubo un problema al cambiar la contraseña. Inténtalo de nuevo.");
    }
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      toast.warn('La imagen es demasiado grande. El tamaño máximo es 1MB.');
      return;
    }

    setNewProfilePicture(file);

    // Para mostrar vista previa
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        profile_picture: reader.result, // Solo para previsualizar
      }));
    };
    reader.readAsDataURL(file);
  };


  const handleSaveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      removeToken();
      navigate('/login');
      return;
    }

    const formData = new FormData(); // ← Nuevo: usamos FormData para enviar campos + archivos
    let hasChanges = false;

    // Solo agregamos los campos que cambiaron
    if (profileData.name !== originalData.name) {
      formData.append('name', profileData.name);
      hasChanges = true;
    }
    if (profileData.lastname !== originalData.lastname) {
      formData.append('lastname', profileData.lastname);
      hasChanges = true;
    }
    if (profileData.phone !== originalData.phone) {
      formData.append('phone', profileData.phone);
      hasChanges = true;
    }
    if (newProfilePicture) {
      formData.append('profile_picture', newProfilePicture); // ← El archivo como tal
      hasChanges = true;
    }

    if (!hasChanges) {
      toast.info('No hay cambios para guardar');
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/adana-api/v1/users/profile/${user.id}/updateProfile`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Error actualizando el perfil');
      }


      const updatedData = response.data;
      if (updatedData.profileP !== "") {
        // Obtener y parsear el objeto del localStorage
        let ND = JSON.parse(localStorage.getItem('user'));

        // Actualizar el campo deseado
        ND.profile_picture = updatedData.profileP; // Asegúrate del nombre correcto: ¿es `profile_picture` o `profileP`?

        // Guardar de nuevo en localStorage como string
        localStorage.setItem('user', JSON.stringify(ND));

        console.log(localStorage.getItem('user'));
        // Notificar cambios
        window.dispatchEvent(new Event('storage'));
      }

      await fetchUserInfo();
      toast.success('Cambios guardados exitosamente');

      //navigate(0); // Refrescamos la página
    } catch (error) {
      console.error('Error guardando cambios:', error);
      toast.error('Hubo un error guardando los cambios');
    }
  };

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 10); // delay breve para activar animación
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 300); // espera animación
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
  };


  const validateChanges = (hasChanges) => {
    if (profileData.name !== originalData.name) {
      hasChanges = true;
    }
    if (profileData.lastname !== originalData.lastname) {
      hasChanges = true;
    }
    if (profileData.phone !== originalData.phone) {
      hasChanges = true;
    }
    if (newProfilePicture) {
      hasChanges = true;
    }
    return hasChanges;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-accent1/70 py-12 font-Outfit pt-30 pr-30 pl-30">
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
              <div className="mt-8 flex justify-center gap-x-15">
                <button
                  onClick={handleSaveChanges}
                  className="w-1/2 py-3 mb-8 px-6 text-white bg-fontlink hover:bg-linkselect rounded-lg font-semibold transition duration-200"
                >
                  Guardar cambios
                </button>
                <button
                  onClick={handleDiscardChanges}
                  className="w-1/2 py-3 mb-8 px-6 text-white bg-red-400 hover:bg-red-500 rounded-lg font-semibold transition duration-200"
                >
                  Descartar cambios
                </button>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={openModal}
                  disabled={!hasPassword}
                  title={!hasPassword ? "Esta función solo está disponible si usas contraseña" : ""}
                  className={`w-1/2 py-3 px-6 rounded-lg text-white font-semibold transition duration-200 
                      ${hasPassword
                      ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 text-white cursor-not-allowed'}`}
                > {/* text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200*/}
                  Cambiar contraseña
                </button>
              </div>

            </dl>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleCloseModal}
            >
              <div
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto text-fontdef"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-center text-[#7E5EC3] mb-6">Cambiar contraseña</h2>

                <div className="space-y-4">
                  {/* Contraseña actual */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña actual</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full rounded-lg text-xl border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                    />
                  </div>

                  {/* Nueva contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full rounded-lg text-xl border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                    />
                  </div>

                  {/* Confirmar nueva contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-lg text-xl border border-gray-300 shadow-sm focus:ring-[#C3C37E] focus:border-[#C3C37E] text-sm px-3 py-2"
                    />
                  </div>
                </div>


                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium transition duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNewPassword}
                    className="bg-[#7E5EC3] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition duration-300"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>



    </section>
  );
};


export default MyProfile;
