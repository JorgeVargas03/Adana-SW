import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Faq = () => {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16 font-outfit">
      {/* Título principal */}
      <h2 className="font-bold text-5xl text-[#413324] text-center mb-12">
        Preguntas frecuentes
      </h2>

      {/* Sección de Clases */}
      <div className="mb-12">
        <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">
          Clases
        </h3>

        <div className="space-y-4">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <span className="font-medium">¿Es necesario tener experiencia previa en Pilates para tomar las clases?</span>
                  <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pt-4 pb-6 text-gray-700">
                  No, nuestras clases están diseñadas para adaptarse a todos los niveles, desde principiantes hasta avanzados. Nuestros instructores te guiarán según tu experiencia.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Repetir para las demás preguntas */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <span className="font-medium">¿Cuántas personas hay en cada clase?</span>
                  <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pt-4 pb-6 text-gray-700">
                  Las clases grupales tienen un máximo de 8 personas para garantizar atención personalizada. Las sesiones privadas son individuales.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

      {/* Sección de Estudio y ambiente */}
      <div className="mb-12">
        <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">
          Estudio y ambiente
        </h3>

        <div className="space-y-4">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <span className="font-medium">¿Dónde está ubicado Adana?</span>
                  <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pt-4 pb-6 text-gray-700">
                  Nos encontramos en Calle Pilates 123, Barrio Norte, Buenos Aires. A 3 cuadras del subte línea D.
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

        <div className="space-y-4">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <span className="font-medium">¿Cuáles son las opciones de pago?</span>
                  <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-[#7E7EC3] transition-transform`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pt-4 pb-6 text-gray-700">
                  Aceptamos efectivo, transferencia bancaria y todas las tarjetas de crédito/débito. También Mercado Pago.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Repetir estructura para las demás preguntas */}
        </div>
      </div>
    </section>
  );
};

export default Faq;