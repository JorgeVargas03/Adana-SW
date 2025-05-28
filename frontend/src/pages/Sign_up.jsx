import React, { useState, useRef, useEffect } from 'react';
import icon from '../assets/images/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle } from "../services/loginWithGoogle";
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';


const SignUp = () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const [normalLoginState, setNormalLoginState] = useState("Active"); 
  const [googleLoginState, setGoogleLoginState] = useState("Active");

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
    if (googleLoginState === "Processing") return;
      setGoogleLoginState("Processing");
      setNormalLoginState("Disable");
    try {
      const user = await loginWithGoogle();
      localStorage.setItem("user", JSON.stringify(user)); // pasa el user pa la compra
      const gRole = user.role;
      console.log(gRole);
      toast.success(`¡Inicio de sesión exitoso! Bienvenido: ${user.name}`, {
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      await sleep(900);
      // Redirigir después de un inicio de sesión exitoso
      if (gRole == 'instructor') {
        navigate('/home2');
      } else if (gRole === 'administrador') {
        navigate('/myprofile');
      } else {
        navigate('/');
      }
      window.dispatchEvent(new Event('storage'));

    } catch (error) {
      if (error.code === 'USER_NOT_FOUND') {
        toast.info("Complete su registro para continuar");
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
        toast.error("Error al iniciar sesión con Google.");
      }
    } finally {
    setGoogleLoginState("Active");
    setNormalLoginState("Active");
  }
  };

  const handleNormalRegister = async () => {
    if (normalLoginState === "Processing") return;
    setNormalLoginState("Processing");
    setGoogleLoginState("Disable");
    try {
      if (
        !nombre ||
        !apellido ||
        !correo ||
        !contraseña ||
        !telefono ||
        selectedGender === 'Género'
      ) {
        toast.info("Por favor completa todos los campos.");
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
      toast.success("¡Registro exitoso!");
      navigate('/signin');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      toast.error("Error al registrar. Verifica los datos o intenta más tarde.");
    } finally {
    setNormalLoginState("Active");
    setGoogleLoginState("Active");
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
  disabled={normalLoginState === "Disable" || normalLoginState === "Processing"}
  className={`h-10 font-Outfit flex items-center justify-center w-full rounded-md px-3 py-1.5 text-md font-semibold text-[#FFFDEF] shadow-xs
    ${
      normalLoginState === "Processing"
        ? "bg-red-600/60 cursor-wait"
        : normalLoginState === "Disable"
        ? "bg-red-600/40 cursor-not-allowed"
        : "bg-red-600 hover:bg-red-600/90"
    }
  `}
>
  {normalLoginState === "Processing" ? (
    <div className="w-5 h-5 border-2 border-t-transparent border-[#FFFDEF] rounded-full animate-spin"></div>
  ) : (
    "Registrarse"
  )}
</button>

                     <button
  onClick={handleRegister}
  disabled={googleLoginState === "Disable" || googleLoginState === "Processing"}
  className={`flex w-full justify-center font-Outfit items-center gap-2 rounded-md px-3 py-1.5 text-md font-semibold text-[#FFFDEF] shadow-xs
    ${
      googleLoginState === "Processing"
        ? "bg-accent2/60 cursor-wait"
        : googleLoginState === "Disable"
        ? "bg-accent2/40 cursor-not-allowed"
        : "bg-accent2 hover:bg-accent2/90"
    }
  `}
>
  {googleLoginState === "Processing" ? (
    <>
      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    </>
  ) : (
    <>
      <svg width="30px" height="30px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47" />
                  <path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4" />
                  <path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00" />
                  <polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374" />
                  <path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435" />
                  <polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626" />
                  <path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4" />
                </svg>
                Google
    </>
  )}
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