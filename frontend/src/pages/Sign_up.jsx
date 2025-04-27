import React, { useState, useRef, useEffect } from 'react';
import icon from '../assets/images/icon.png';
import { Link } from 'react-router-dom';
import { registerWithGoogle } from "../services/registerWithGoogle";

const SignUp = () => {
  
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
        const user = await registerWithGoogle();
        console.log("Registro exitoso:", user.name);
        // Redirigir o mostrar mensaje de bienvenida
      } catch (error) {
        alert("Error al registrarse con Google.");
      }
    };

  
<<<<<<< HEAD
  return (
  
  <div className=' flex justify-center items-center h-screen w-full bg-[#C3C37E]'>

      <div className='flex w-9/12 h-[650px] rounded-2xl bg-[#FDF9EC]'> 
         
         {/* LOGO + BARRA */}
        <div className='flex-1 relative flex items-center justify-center'>
          <img src={icon} className='w-3/4 max-w-[300px] h-auto' alt='icon' />
          <div className='hidden lg:flex h-full w-[15px] bg-gray-200 absolute right-0'></div>
        </div>

        {/* FORMULARIO: contenido centrado horizontal entre barra y borde */}
          <div className='flex-1 flex flex-col items-center justify-start pt-5 h-full ml-[-7.5px]'>
          
          <div className=''>

            <div className=''>
            <h1 className="text-center font-[700] font-[Outfit] text-4xl pb-1">
                  Registrate
              </h1>
            </div>
            
                        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                            <div className="w-full max-w-[1000px]">
                              <label className="block text-base sm:text-lg font-medium mb-2">Nombre</label>
                              <input
                                type="text"
                                name="nombre"
                                className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                          </div>

                          <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                            <div className="w-full max-w-[1000px]">
                              <label className="block text-base sm:text-lg font-medium mb-2">Apellido</label>
                              <input
                                type="text"
                                name="apellido"
                                className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                        
                        </div>

                         {/* DROPDOWN: ayuda me tronó y no se pq */}
                        <div
                              ref={dropdownRef}
                              className="w-full flex justify-start px-4 sm:px-6 md:px-8 mt-3 max-w-[1000px] select-none relative z-20"
                            >
                              <div>
                                <div
                                  onClick={toggleDropdown}
                                  className="w-[120px] h-9 px-4 flex items-center justify-between text-base sm:text-lg font-medium mb-2 rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                                >
                                  {selectedGender}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
                                  </svg>
                                </div>

                                {isDropdownOpen && (
                                  <div className="absolute mt-1 w-[120px] bg-[#F0F1D2] rounded-xl shadow-lg py-1 z-30">
                                    {['Hombre', 'Mujer', 'Otro'].map((gender) => (
                                      <div
                                        key={gender}
                                        onClick={() => handleSelect(gender)}
                                        className="px-4 py-2 cursor-pointer hover:bg-[#C3C37E] rounded-xl"
                                      >
                                        {gender}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                          </div>


                        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                            <div className="w-full max-w-[1000px]">
                              <label className="block text-base sm:text-lg font-medium mb-2">Número de teléfono</label>
                              <input
                                type="number"
                                name="telefono"
                                className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                        </div>

                        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                            <div className="w-full max-w-[1000px]">
                              <label className="block text-base sm:text-lg font-medium mb-2">Correo</label>
                              <input
                                type="text"
                                name="correo"
                                className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                        </div>

                        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                            <div className="w-full max-w-[1000px]">
                              <label className="block text-base sm:text-lg font-medium mb-2">Contraseña</label>
                              <input
                                type="password"
                                name="contraseña"
                                className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              />
                            </div>
                        </div>


                      
                        <div className='mt-8 flex flex-row justify-center items-center gap-x-4 '>
                            <button className='w-[150px] h-12 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl text-[#FFFDEF] text-lg font-bold bg-blue-600 cursor-pointer'> 
                              Acceder
                            </button>

                            <button 
                             onClick={handleRegister}
                            className='flex items-center justify-center gap-2 w-[150px] h-12 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl text-[#FFFDEF] text-lg font-bold bg-red-500 cursor-pointer'>
                              <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"/>
                                <path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"/>
                                <path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"/>
                                <path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"/>
                                <path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"/>
                              </svg>
                              Google

                              
                            </button>
                        </div>


                    <div className='mt-5 flex justify-center items-center gap-x-3'>
                      <p>¿Ya tienes una cuenta?</p> <Link className='ml-2 font-medium text-blue-700 hover:underline hover:text-blue-900 transition-all duration-200' to= '/signin'> Inicia Sesión </Link>
=======
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
                      name="nombre"
                      className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Apellido</label>
                    <input
                      type="text"
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
>>>>>>> origin/Java3
                      </div>
                    )}
                  </div>
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-900">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-900">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-900">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    className="mt-1 block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
    
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="submit"
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
                      <path d="M23.75 16A7.745 7.745 0 0 1 8.718 18.626L4.285 22.172A13.244 13.244 0 0 0 29.25 16" fill="#00AC47"/>
                      <path d="M23.75 16a7.739 7.739 0 0 1-3.252 6.299l4.382 3.506A13.204 13.204 0 0 0 29.25 16" fill="#4285F4"/>
                      <path d="M8.25 16a7.698 7.698 0 0 1 .468-2.626L4.285 9.828a13.177 13.177 0 0 0 0 12.344l4.433-3.546A7.698 7.698 0 0 1 8.25 16Z" fill="#FFBA00"/>
                      <path d="M16 8.25a7.699 7.699 0 0 1 4.558 1.496l4.06-3.789A13.215 13.215 0 0 0 4.285 9.828l4.433 3.546A7.756 7.756 0 0 1 16 8.25Z" fill="#EA4435"/>
                      <path d="M29.25 15v1L27 19.5H16.5V14H28.25a1 1 0 0 1 1 1Z" fill="#4285F4"/>
                    </svg>
                    Google
                  </button>
                </div>
              </form>
    
              <p className="mt-6 text-center text-sm text-gray-500">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  to="/signin"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
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