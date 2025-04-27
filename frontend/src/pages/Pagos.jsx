//pagina de pagos para que lso clientes paguen

import React from "react";

const Pagos = () =>{

    return(
        <section className="w-full mx-auto py-16 font-outfit bg-[#FDF9EC]">
  {/* Fondo */}
  <div className="flex flex-col h-screen w-full bg-[#FDF9EC]">

    {/* Botón */}
    <div className="mt-6 w-[50x] px-7">
      <button className="w-[50px] h-10 flex justify-center items-center active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-2xl text-[#FFFDEF] text-lg font-bold bg-[#C3C37E] cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>

    {/* Título */}
    <h1 className="font-outfit font-bold text-[4rem] text-[#413324] ml-16 my-8">
      Pagos
    </h1>

    {/* Contenedor de los dos DIVS */}
    <div className="flex justify-start items-start gap-4 px-16">
      
       {/* DIV IZQUIERDO */}
      <div className=" font-outfit text-[#FDF9EC] flex-2 h-[500px] w-[700px] bg-[#C3C37E] p-5 rounded-2xl">
        <div className="flex flex-col p-3 gap-2">
          
          <div className="flex justify-center items-center">
              <h1 className="font-bold text-[2rem] ">
              Productos
              </h1>
          </div>

             {/* info del producto con su imagen, 3 columnas */}
          <div className="flex items-center justify-between p-5 w-full ">

              {/* Imagen */}
              <div className="w-1/4">
                {/* <img src="/ruta/de/tu/imagen.jpg" alt="Producto" className="object-cover w-full h-auto rounded-lg" /> */}
                Hola soy una imagen
              </div>

                {/* Info de la imagen */}
              <div className="w-2/4 px-4">
                  <h2 className="text-xl font-bold">Nombre de la clase</h2>
                  <p className="text-sm text-gray-700">Instructor.</p>
                  <p className="text-sm text-gray-700">Clase única o Paquete.</p>
                  <p className="text-sm text-gray-700">Fecha.</p>
                  <p className="text-sm text-gray-700">Hora.</p>
              </div>

                {/* Valor del producto */}
              <div className="w-1/4 text-right">
                  <h2 className="text-2xl font-bold text-[#7E7EC3]">$99.99</h2>
              </div>


          </div>


        </div>
      </div>

      {/* DIV DERECHO */}
      <div className=" font-outfit text-[#FDF9EC] flex-1 h-[500px] w-2/3 bg-[#7E7EC3] p-5 rounded-2xl">
        <div className="flex flex-col bg-[#7E7EC3] p-3 gap-2">
        
                <div className="flex justify-center items-center">
                  <h1 className="font-bold text-[2rem] ">
                  Productos
                  </h1>
                </div>

                <h1 className=" ">
                Resumen de su orden
                </h1>   

            <h1 className="]">
                Nombre de la clase
            </h1>

            <h1 className="">
                Instructor
            </h1>

              <div className=" flex justify-between font-bold">
                <h1 className=" ">
                      SUBTOTAL
                </h1>

                <h1 className="">
                      TOTAL MX
                </h1>
              </div>

                <div className="flex justify-center items-center">
                <button className="w-[100px] h-10 flex justify-center items-center active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 rounded-4xl text-[#FFFDEF] text-lg font-bold bg-[#C3C37E] cursor-pointer">
                PAGAR
                </button>
                </div>

        </div>

      </div>

    </div>
  </div>
</section>

    )


}

export default Pagos;