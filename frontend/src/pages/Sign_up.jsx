import React, { useState, useRef, useEffect } from 'react';
import icon from '../assets/images/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle } from "../services/loginWithGoogle";
import { registerUser } from '../services/authService';


const SignUp = () => {
  const navigate = useNavigate();

  //Verificar si el usuario ya inicio sesion, si es asi, lo lleva a home
  if (localStorage.getItem('token')) {
    navigate("/");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Género');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setIsDropdownOpen(false);
  };

  // Este efecto se encarga de cerrar el dropdown si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //metodo para el registro de google 

  const handleRegister = async () => {
      try {
        const user = await loginWithGoogle();
        window.dispatchEvent(new Event('storage'));
        console.log("Bienvenido:", user.name);
        // Redirigir después de un inicio de sesión exitoso
        navigate('/');
      } catch (error) {
        if (error.code === 'USER_NOT_FOUND') {
          console.log("Usuario no encontrado. Redirigiendo al formulario de registro...");
          // Guarda el user temporalmente en localStorage
          localStorage.setItem("user", JSON.stringify({
            name: error.profile.displayName,
            email: error.profile.email,
            profile_picture: error.profile.photoURL || ""
          }));
          // Redirigir a la página de registro (o completar el registro)
          navigate('/register');
        } else {
          console.error("Error desconocido:", error);
          alert("Error al iniciar sesión con Google.");
        }
      }
    };

  const handleNormalRegister = async () => {
    try {
      if (
        !nombre ||
        !apellido ||
        !correo ||
        !contraseña ||
        !telefono ||
        selectedGender === 'Género'
      ) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const userData = {
        name: nombre,
        lastname: apellido,
        email: correo,
        password: contraseña,
        phone: telefono,
        gender: selectedGender,
        role: 'cliente'
      };

      await registerUser(userData);
      alert("¡Registro exitoso!");
      navigate('/signin');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar. Verifica los datos o intenta más tarde.");
    }
  };

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');


  return (
    <div className='flex justify-center items-center h-screen w-full bg-accent1/70 mt-20 font-Outfit'>
      <div className='flex w-9/12 h-[650px] rounded-2xl bg-[#FDF9EC]'>
        {/* LOGO + BARRA */}
        <div className='flex-1 relative flex items-center justify-center'>
          <img src={icon} className='w-3/4 max-w-[300px] h-auto' alt='icon' />
          <div className='hidden lg:flex h-full w-[15px] bg-gray-200 absolute right-0'></div>
        </div>

        {/* FORMULARIO */}
        <div className='flex-1 flex flex-col items-center h-full ml-[-7.5px] pt-12'>
          <div className="w-full max-w-[400px] px-4">
            <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-fontdef">
              Regístrate
            </h1>

            <form className="mt-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Nombre</label>
                  <input
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    name="nombre"
                    className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900">Apellido</label>
                  <input
                    type="text"
                    onChange={(e) => setApellido(e.target.value)}
                    name="apellido"
                    className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Género</label>
                <div ref={dropdownRef} className="relative mt-1">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex w-full justify-between items-center rounded-md bg-white py-1.5 px-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {selectedGender}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      {['Hombre', 'Mujer', 'Otro'].map((gender) => (
                        <div
                          key={gender}
                          onClick={() => handleSelect(gender)}
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Teléfono</label>
                <input
                  type="tel"
                  onChange={(e) => setTelefono(e.target.value)}
                  name="telefono"
                  className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fontdef">
                  <span>Correo</span>
                </label>
                <div className="mt-2">
                  <input type="email" 
                   onChange={(e) => setCorreo(e.target.value)}
                   placeholder="Ingrese un correo" className="peer block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  <p className="text-red-700 hidden peer-invalid:block">Por favor, proporciona un correo válido.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Contraseña</label>
                <input
                  type="password"
                  onChange={(e) => setContraseña(e.target.value)}
                  name="contraseña"
                  className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleNormalRegister}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Registrarse
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  className="flex items-center justify-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.75 16A7.745 7.745 0 0 1 8.718 18.626L4.285 22.172A13.244 13.244 0 0 0 29.25 16" fill="#00AC47" />
                    <path d="M23.75 16a7.739 7.739 0 0 1-3.252 6.299l4.382 3.506A13.204 13.204 0 0 0 29.25 16" fill="#4285F4" />
                    <path d="M8.25 16a7.698 7.698 0 0 1 .468-2.626L4.285 9.828a13.177 13.177 0 0 0 0 12.344l4.433-3.546A7.698 7.698 0 0 1 8.25 16Z" fill="#FFBA00" />
                    <path d="M16 8.25a7.699 7.699 0 0 1 4.558 1.496l4.06-3.789A13.215 13.215 0 0 0 4.285 9.828l4.433 3.546A7.756 7.756 0 0 1 16 8.25Z" fill="#EA4435" />
                    <path d="M29.25 15v1L27 19.5H16.5V14H28.25a1 1 0 0 1 1 1Z" fill="#4285F4" />
                  </svg>
                  Google
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/signin"
                className="font-semibold text-fontlink hover:text-linkselect"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;