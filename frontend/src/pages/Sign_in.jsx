import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import icon from '../assets/images/icon.png';
import { loginWithGoogle } from "../services/loginWithGoogle";
import { login } from '../services/authService';

const Signin = () => {
  const navigate = useNavigate();

  // Verificar si el usuario ya está autenticado al cargar el componente
  /*
  useEffect(() => {
    // Si el token existe en localStorage, redirigir a la home
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      navigate('/');  // Redirige a la página principal si el token existe
    }
  }, [navigate]);  // Asegúrate de incluir `navigate` como dependencia
*/

  // Iniciar sesión con Google
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      localStorage.setItem("usuario", JSON.stringify(user)); // pasa el user pa la compra
      const gRole = user.role;
      window.dispatchEvent(new Event('storage'));
      console.log("Bienvenido:", user.name);
      // Redirigir después de un inicio de sesión exitoso
      if(gRole == 'instructor'){
      navigate('/instructorhome');
      }else /*if(gRole === 'administrador'){
        navigate('/admonhome');
      }else*/{
        navigate('/');
      }
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
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Manejar login normal
  const handleNormalLogin = async () => {
    try {
      if (!correo || !contraseña) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const userData = {
        email: correo,
        password: contraseña,
      };

      const sesion = await login(userData);
      const nRole = sesion.role;
      alert("¡Inicio de sesión exitoso!, Bienvenido:", sesion.name);
      // Guarda el token en localStorage
      // Notifica a otros componentes (opcional si ya lo usas)
      window.dispatchEvent(new Event('storage'));

      // Redirigir después de un inicio de sesión exitoso
      if(nRole == 'instructor'){
        navigate('/instructorhome');
        }else /*if(nRole === 'administrador'){
          navigate('/admonhome');
        }else*/{
          navigate('/');
        }
    } catch (error) {
      console.error("Error al iniciar sesión usuario:", error);
      alert("Error al iniciar sesión. Verifica los datos o intenta más tarde.");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-full bg-accent1/70 mt-10 font-Outfit'>
      <div className='flex w-9/12 h-[550px] rounded-2xl bg-[#FDF9EC]'>
        {/* LOGO + BARRA */}
        <div className='flex-1 relative flex items-center justify-center'>
          <img src={icon} className='w-3/4 max-w-[300px] h-auto' alt='icon' />
          <div className='hidden lg:flex h-full w-[15px] bg-gray-200 absolute right-0'></div>
        </div>

        {/* FORMULARIO */}
        <div className='flex-1 flex flex-col items-center justify-start h-full ml-[-7.5px]'>
          <div className="w-full max-w-[400px]">
            <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-fontdef mt-16">
              Iniciar Sesión
            </h1>

            <form className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-fontdef">
                  <span className="...">Correo</span>
                </label>
                <div className="mt-2">
                  <input type="email"
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingrese un correo" className="peer block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  <p className="text-red-700 hidden peer-invalid:block">Por favor, proporciona un correo válido.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-fontdef">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-fontlink hover:text-linkselect">
                      Olvidé mi contraseña
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    onChange={(e) => setContraseña(e.target.value)}
                    name="contraseña"
                    placeholder="Ingresa tu contraseña"
                    className="block w-full rounded-md bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleNormalLogin}
                  className="h-10 font-Outfit items-center flex w-full justify-center rounded-md bg-accent2 px-3 py-1.5 text-md font-semibold text-[#FFFDEF] shadow-xs hover:bg-accent2/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Acceder
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-col items-center gap-y-4">
              <button
                onClick={handleLogin}
                className="flex w-full justify-center font-Outfit items-center gap-2 rounded-md bg-accent2 px-3 py-1.5 text-md font-semibold text-[#FFFDEF] shadow-xs hover:bg-accent2/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
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
              </button>
            </div>

            <div className='mt-6 text-center text-sm text-gray-500'>
              <p>¿No tienes una cuenta?{' '}
                <Link
                  to='/signup'
                  className='font-semibold text-fontlink hover:text-linkselect'
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;