import React from "react";
import { useState } from "react";
import icon from '../assets/images/mymelokuromi.jpg';

const MyProfile = () =>{
const [nombre, setNombre] = useState("nombreRandom");
const [apellido, setApellido] = useState("apellidoRandom");
const [password, setPassword] = useState("contraseñaRandom");

return(
    <section>
       <div className=' flex justify-center items-center h-screen w-full bg-[#C3C37E]'>
            <div className='flex w-9/12 h-[500px] rounded-2xl bg-[#FDF9EC] overflow-hidden'>
{/*este es el div que engloba el resto de divs que componen la página*/}

                            {/*foto*/}            
                            <div className="w-1/3  flex  justify-center transform translate-y-32">
                            <img src={icon} className='w-3/4 max-w-[200px] h-[200px]' alt='icon' />
                            </div>
                
                <div className='flex-1 flex flex-col items-center justify-start pt-28 h-full ml-[-7.5px]'>
{/*div para la separacion*/}
                    <div className='transform translate-y-10'>
                        
                        {/*el margintop*/}
                        <div className='mt=20 pl-4'>
                            <div className=''>
                                <h1 className="text-right font-[700] font-[Outfit] text-4xl pt-40">
                                        Mi Perfil | tipo perfi variables
                                </h1>
                            </div>
                        </div>                      

{/*resto de datos*/}
                              
                            <div className="w-full flex flex-col md:flex-row px-4 sm:px-6 md:px-8 gap-3">
                                    <div className="w-full md:w-1/2 transform translate-y-5 ">
                                        <label className="block text-base font-semibold sm:text-lg mb-2">Nombre</label>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 gap-1.5 transform translate-y-5">
                                        <input
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        </div>
                                </div>

                                <div className="w-full flex flex-col md:flex-row px-4 sm:px-6 md:px-8 gap-3">
                                    <div className="w-full md:w-1/2 transform translate-y-10 ">
                                        <label className="block text-base font-semibold sm:text-lg mb-2">Apellido</label>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 gap-1.5 transform translate-y-10">
                                        <input
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        </div>
                                </div>

                                <div className="w-full flex flex-col md:flex-row px-4 sm:px-6 md:px-8 gap-3">
                                    <div className="w-full md:w-1/2 transform translate-y-15 ">
                                        <label className="block text-base font-semibold sm:text-lg mb-2">Correo</label>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 gap-1.5 transform translate-y-15">
                                        <input
                                            value="CORREO RANDOM"
                                            className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        </div>
                                </div>

                                <div className="w-full flex flex-col md:flex-row px-4 sm:px-6 md:px-8 gap-3">
                                    <div className="w-full md:w-1/2 transform translate-y-20 ">
                                        <label className="block text-base font-semibold sm:text-lg mb-2">Contraseña</label>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 gap-1.5 transform translate-y-20">
                                        <input
                                        type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-[250px] h-7 sm:h-9 px-4 text-sm sm:text-base md:text-lg rounded-xl bg-[#F0F1D2] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        </div>
                                </div>

                                <div className='mt-8 flex flex-row justify-center items-center gap-x-4 translate-y-25'>
                                    <button className='w-[300px] h-18 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-xl text-[#FFFDEF] text-lg font-bold bg-blue-600 cursor-pointer'>
                                        Guardar contraseña
                                    </button>
                                </div>
                    </div>
                </div>
            </div>
       </div>
    </section>
)

}

export default MyProfile;