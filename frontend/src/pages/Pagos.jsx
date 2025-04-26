//pagina de pagos para que lso clientes paguen

import React from "react";

const Pagos = () =>{

    return(
        <section>
             {/*Fondo */}
            <div className="h-screen w-full bg-[#F0F1D2]" >
            <div className="mt-8 w-[100px] flex flex-row gap-x-4 translate-y-25 ">
                <button className='w-[70px] h-18 flex justify-center items-center active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-4xl text-[#FFFDEF] text-lg font-bold bg-blue-600 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
    
                </button>
            </div>
            <h1 className="font-outfit font-normal text-[4rem] text-[#413324] indent-60">
                Pagos
            </h1>
                <div className=' flex justify-center items-center '>

                    <div>
                       
                    </div>
                </div>
            </div>
        </section>
    )


}

export default Pagos;