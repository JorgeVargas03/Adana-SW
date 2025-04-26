import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/images/icon.png';
import { loginWithGoogle } from "../services/loginWithGoogle";

const Signin = () => {

//iniciar sesión con google
const handleLogin = async () => {
  try {
    const user = await loginWithGoogle();
    console.log("Bienvenido:", user.name);
    // Redirigir o actualizar UI
  } catch (error) {
    alert("Error al iniciar sesión con Google.");
  }
};


  return (
  
    <div className=' flex justify-center items-center h-screen w-full bg-[#C3C37E]'>
  
        <div className='flex w-9/12 h-[600px] rounded-2xl bg-[#FDF9EC]'> 
           
           {/* LOGO + BARRA */}
          <div className='flex-1 relative flex items-center justify-center'>
            <img src={icon} className='w-3/4 max-w-[300px] h-auto' alt='icon' />
            <div className='hidden lg:flex h-full w-[15px] bg-gray-200 absolute right-0'></div>
          </div>
  
          {/* FORMULARIO: contenido centrado horizontal entre barra y borde */}
            <div className='flex-1 flex flex-col items-center justify-start h-full ml-[-7.5px]'>
            
            <div >
  
              <div className='mt-20"'>
              <h1 className="text-center font-[700] font-[Outfit] text-4xl pt-20">
                    Iniciar Sesión
                </h1>
              </div>
              
                          <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
                              <div className="w-full max-w-[1000px]">
                                <label className="block text-base sm:text-lg font-medium mb-2">Correo</label>
                                <input
                                  type="text"
                                  name="correo"
                                  placeholder="Ingresa tu correo"
                                  className="w-full h-11 sm:h-12 px-4 text-sm sm:text-base md:text-lg rounded-2xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                              </div>
                            </div>
  
                            <div className="w-full flex justify-center px-4 sm:px-6 md:px-8 mt-6">
                              <div className="w-full max-w-[1000px] ">
                                <label className="block text-base sm:text-lg font-medium mb-2">Contraseña</label>
                                <input
                                  type="password"
                                  name="contraseña"
                                  placeholder="Ingresa tu contraseña"
                                  className="w-full h-11 sm:h-12 px-4 text-sm sm:text-base md:text-lg rounded-2xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                              </div>
                          </div>
  
  
                        <div className='w-full flex justify-center'> <label className='ml-2 font-medium text-blue-700'> Olvidé mi contraseña </label> </div>
                      
                      <div 
                      
                      className='mt-8 flex flex-col items-center gap-y-4'>
                        <div> <button className='bg-accent2 items-center w-[200px] h-12 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all rounded-xl text-[#FFFDEF] text-lg font-bold cursor-pointer'> 
                          Acceder </button> </div>
                        
                        
                          <button 
                          onClick={handleLogin}
                          className='bg-accent2 flex items-center justify-center gap-2 w-[200px] h-12 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl text-[#FFFDEF] text-lg font-bold cursor-pointer'> 
                          <svg width="30px" height="30px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"/><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"/><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"/><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"/><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"/><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"/><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"/></svg>
                           Google
                           </button>
                        
                      </div>
  
                      <div className=' flex justify-center items-center gap-x-3'>
                        <p>¿No tienes una cuenta?</p> 
                        <span>
                          <Link 
                          className='ml-2 font-medium text-blue-700 hover:underline hover:text-blue-900 transition-all duration-200' 
                          to= '/signup'> 
                          Regístrate 
                          </Link>
                        </span>
                      </div>
                        
                      </div>
                
            </div>
            
            </div>
        </div>
  
  );
};

export default Signin;