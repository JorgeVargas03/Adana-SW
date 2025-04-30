// src/components/BotonFlotante.jsx
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon,ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

export default function BotonFlotante() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent2 text-white rounded-full shadow-lg hover:bg-fontlink transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Carrito de compras"
      >
        {/* Ícono SVG aquí o HeroIcon */}
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
                        Cuerpo de tu orden
                    </div>
                  <div className="mt-4">
                    {/* Contenido del carrito aquí */}
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
