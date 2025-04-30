import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Faq = () => {
  return (
    <section className="mx-auto px-6 py-16 font-Outfit bg-accent1/70 w-full pt-34">
      {/* Título principal */}
      <h2 className="font-bold text-5xl text-[#413324] text-center">
        Preguntas frecuentes
      </h2>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Sección de Clases */}
        <div className="mb-6">
          <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">
            Clases
          </h3>

          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Es necesario tener experiencia previa en Pilates para tomar las clases?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    No, nuestras clases están diseñadas para adaptarse a todos los niveles, desde principiantes hasta avanzados. Nuestros instructores te guiarán según tu experiencia.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>

        <div className="mb-6">
          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Cómo puedo reservar una clase?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    Puedes reservar tu clase a través de nuestro sistema en línea en nuestra página web. Simplemente selecciona la clase que te interesa, elige el horario y confirma tu reserva. También puedes contactarnos por teléfono o correo electrónico para asistencia en el proceso de reserva.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>

        </div>

        <div className="mb-6">

          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Qué pasa si no puedo asistir a una clase que ya reservé?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    Si no puedes asistir a una clase, y ya pagaste en nuestro sistema de agendación de citas, por el momento no podemos reagendar o hacer una devolución del pago.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Repetir para las demás preguntas */}
          </div>

        </div>

        <div className="mb-6">

          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Qué debo llevar a una clase de Pilates?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    Se recomienda usar ropa cómoda que te permita moverte libremente. No es necesario traer equipo adicional, ya que el estudio proporciona colchonetas y otros materiales. Sin embargo, puedes traer tu propia botella de agua para mantenerte hidratado.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Repetir para las demás preguntas */}
          </div>

        </div>

        {/* Sección de Estudio y ambiente */}
        <div className="mb-6">
          <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">
            Estudio y ambiente
          </h3>

          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Dónde está ubicado Adana?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    Nos encontramos en Calle Pilates 123, Barrio Norte, Buenos Aires. A 3 cuadras del subte línea D.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Repetir estructura para las demás preguntas */}
          </div> 

        </div>

        <div className="mb-6">

          <div className="space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">¿Cuáles son las diferencias entre Pilates en colchoneta y Pilates en máquina?</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    El Pilates en colchoneta utiliza solo tu peso corporal y es ideal para trabajar el core y mejorar la flexibilidad. El Pilates en máquina (como el Reformer) usa equipo especializado que proporciona resistencia y permite un mayor rango de movimiento. Ambos enfoques son efectivos, pero las máquinas ofrecen una variación adicional que puede ser más desafiante.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Repetir estructura para las demás preguntas */}
          </div> 

        </div>

        {/* Sección de Pagos */}
        <div>
          <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">
            Pagos
          </h3>

          <div className="mb-6">
            <div className="space-y-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                    >
                      <span className="font-medium">¿Cuáles son las opciones de pago?</span>
                      <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                      ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      Solamente se pueden hacer pagos mediante PayPal.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Repetir estructura para las demás preguntas */}
            </div>
          </div>

          <div className="mb-6">
            <div className="space-y-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
                    >
                      <span className="font-medium">¿Tienen paquetes o descuentos para clases múltiples?</span>
                      <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      className={`px-6 pt-4 pb-6 text-gray-700 overflow-hidden transition-all duration-500 ease-in-out
                      ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      Sí, ofrecemos paquetes con descuentos para quienes deseen tomar varias clases a lo largo del mes. El descuento se refleja a partir de agendar 3 clases en nuestro sistema en el Carrito de Compras
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Repetir estructura para las demás preguntas */}
            </div>
          </div>

        </div>

        

      </div>
    </section>
  );
};

export default Faq;
