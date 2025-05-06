import React from 'react';
import { Disclosure } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FaqItem = ({ question, answer }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button
          className="flex justify-between w-full px-6 py-4 text-left bg-barcolor rounded-lg shadow-md hover:bg-[#7E7EC3] hover:text-white transition-colors duration-300"
        >
          <span className="font-medium">{question}</span>
          <ChevronDownIcon
            className={`w-6 h-6 text-[#7E7EC3] transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </Disclosure.Button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden bg-bgcolor/70 rounded-lg"
            >
              <div className="px-6 pt-4 pb-6 text-fontdef">{answer}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )}
  </Disclosure>
);

const Faq = () => {
  return (
    <section className="mx-auto px-6 py-16 font-Outfit bg-accent1/70 w-full pt-34">
      
    <div className="text-center">
    <h2 className="font-bold text-5xl text-center relative inline-block">
  <span className="relative inline-block before:absolute before:-inset-4 before:block before:-skew-y-2 before:translate-y-1 before:bg-bgcolor">
    <span className="relative text-fontdef">Preguntas Frecuentes</span>
  </span>
</h2>
    </div>
      



      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Sección Clases */}
        <div className="mb-6">
          <h3 className="font-semibold text-4xl text-accent2 mb-6 text-shadow-lg">Clases</h3>
          <div className="space-y-4">
            <FaqItem
              question="¿Es necesario tener experiencia previa en Pilates para tomar las clases?"
              answer="No, nuestras clases están diseñadas para adaptarse a todos los niveles, desde principiantes hasta avanzados. Nuestros instructores te guiarán según tu experiencia."
            />
            <FaqItem
              question="¿Cómo puedo reservar una clase?"
              answer="Puedes reservar tu clase a través de nuestro sistema en línea en nuestra página web. Simplemente selecciona la clase que te interesa, elige el horario y confirma tu reserva. También puedes contactarnos por teléfono o correo electrónico para asistencia en el proceso de reserva."
            />
            <FaqItem
              question="¿Qué pasa si no puedo asistir a una clase que ya reservé?"
              answer="Si no puedes asistir a una clase, y ya pagaste en nuestro sistema de agendación de citas, por el momento no podemos reagendar o hacer una devolución del pago."
            />
            <FaqItem
              question="¿Qué debo llevar a una clase de Pilates?"
              answer="Se recomienda usar ropa cómoda que te permita moverte libremente. No es necesario traer equipo adicional, ya que el estudio proporciona colchonetas y otros materiales. Sin embargo, puedes traer tu propia botella de agua para mantenerte hidratado."
            />
          </div>
        </div>

        {/* Sección Estudio y ambiente */}
        <div className="mb-6">
          <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">Estudio y ambiente</h3>
          <div className="space-y-4">
            <FaqItem
              question="¿Dónde está ubicado Adana?"
              answer="Nos encontramos en Calle Pilates 123, Barrio Norte, Buenos Aires. A 3 cuadras del subte línea D."
            />
            <FaqItem
              question="¿Cuáles son las diferencias entre Pilates en colchoneta y Pilates en máquina?"
              answer="El Pilates en colchoneta utiliza solo tu peso corporal y es ideal para trabajar el core y mejorar la flexibilidad. El Pilates en máquina (como el Reformer) usa equipo especializado que proporciona resistencia y permite un mayor rango de movimiento. Ambos enfoques son efectivos, pero las máquinas ofrecen una variación adicional que puede ser más desafiante."
            />
          </div>
        </div>

        {/* Sección Pagos */}
        <div className="mb-6">
          <h3 className="font-semibold text-4xl text-[#7E7EC3] mb-6">Pagos</h3>
          <div className="space-y-4">
            <FaqItem
              question="¿Cuáles son las opciones de pago?"
              answer="Solamente se pueden hacer pagos mediante PayPal."
            />
            <FaqItem
              question="¿Tienen paquetes o descuentos para clases múltiples?"
              answer="Sí, ofrecemos paquetes con descuentos para quienes deseen tomar varias clases a lo largo del mes. El descuento se refleja a partir de agendar 3 clases en nuestro sistema en el Carrito de Compras."
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Faq;
