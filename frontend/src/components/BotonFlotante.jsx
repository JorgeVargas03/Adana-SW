
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon,ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import axios from 'axios';


//Botón flotante para el carrito
//Lee el fakin carrito a la verga
export default function BotonFlotante() {
  const [open, setOpen] = useState(false);
  const { eventosUnidos, quitarEvento } = useCarrito();
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("usuario"))?.id;

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent2 text-white rounded-full shadow-lg hover:bg-fontlink transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Carrito de compras"
      >
      
        <ShoppingCartIcon className="size-7 text-white"/>
      </button>

      {/* Panel con transición */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-800"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 flex justify-end">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease duration-800"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >

                {/*Dialog del carrito, donde se ven las clases*/}
                <Dialog.Panel className="w-screen max-w-md bg-white p-6 shadow-xl">
                  <div className="font-Outfit flex justify-between items-center border-b pb-4">
                    <Dialog.Title className="text-3xl font-semibold text-fontdef">
                      Mi Carrito
                    </Dialog.Title>
                    <button onClick={() => setOpen(false)}>
                      <XMarkIcon className="w-6 h-6 text" />
                    </button>
                  </div>
                  <div className="p-6">
                        {eventosUnidos.length === 0 ? (
                          <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
                        ) : (
                          <ul className="flex flex-col gap-4"> {/*Busca el evento en el array, donde se colocó en Monthview y lo lee*/}
                            {eventosUnidos.map((evento, index) => (
                              <li key={index} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-fontlink">{evento.title}</h3>
                                <p className="text-sm text-gray-600">Instructor: {evento.instructorName}</p>
                                <p className="text-sm text-gray-600">Fecha: {evento.formattedDate}</p>
                                <p className="text-sm text-gray-600">{evento.description}</p>
                                <button
                                  className="mt-2 text-red-500 text-sm hover:underline cursor-pointer"
                                  onClick={() => quitarEvento(evento.id)}
                                  //onClick={() => quitarEvento(evento.classId)}

                                >
                                  Quitar
                                </button>
                                  
                                  {/*Botón para comprar, también hace el post para mandar las cosas al back*, se limpia sola la fakin shit tambien*/}
                                  {eventosUnidos.length > 0 && (
                                          <button
                                          onClick={async () => {
                                            const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
                                            const userId = usuarioGuardado?.id;


                                            if (!userId) {
                                              console.error("No se encontró el usuarioId en localStorage");
                                              return;
                                            }

                                            const selectedClasses = eventosUnidos.map((evento) => ({
                                              classId: evento.id,
                                              instructorId: evento.instructorId,
                                            }));

                                            const payload = {
                                              usuarioId: userId,
                                              selectedClasses: selectedClasses,
                                            };

                                            try {
                                              await axios.post(
                                                `http://localhost:3001/reserve/onlyOne/${userId}`,
                                                payload
                                              );
                                              console.log("Reserva enviada correctamente");

                                              // Limpiar carrito si la reserva fue exitosa
                                              eventosUnidos.forEach((evento) => quitarEvento(evento.id));
                                            } catch (error) {
                                              console.error("Error al enviar la reserva:", error);
                                            }
                                          }}
                                          className="bg-[#C3C37E] hover:bg-[#5e46a5] text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer absolute bottom-4 justify-center"
                                        >
                                          Confirmar compra
                                        </button>

                                        )}

                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                  <div className="mt-4">                       
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
