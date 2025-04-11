import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  return (
    <section style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      fontFamily: 'Outfit, sans-serif'
    }}>
      {/* Título principal */}
      <Typography variant="h2" style={{
        fontWeight: 700,
        fontSize: '3rem',
        color: '#413324',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        Preguntas frecuentes
      </Typography>

      {/* Sección de Clases */}
      <Box sx={{ marginBottom: '3rem' }}>
        <Typography variant="h3" style={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#7E7EC3',
          marginBottom: '1.5rem'
        }}>
          Clases
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Es necesario tener experiencia previa en Pilates para tomar las clases?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, nuestras clases están diseñadas para adaptarse a todos los niveles, desde principiantes hasta avanzados. Nuestros instructores te guiarán según tu experiencia.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Cuántas personas hay en cada clase?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Las clases grupales tienen un máximo de 8 personas para garantizar atención personalizada. Las sesiones privadas son individuales.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Cómo puedo saber qué clase es la adecuada para mí?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Te recomendamos agendar una evaluación inicial gratuita donde analizaremos tus objetivos y te sugeriremos el programa ideal.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Sección de Estudio y ambiente */}
      <Box sx={{ marginBottom: '3rem' }}>
        <Typography variant="h3" style={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#7E7EC3',
          marginBottom: '1.5rem'
        }}>
          Estudio y ambiente
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Dónde está ubicado Adana?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nos encontramos en Calle Pilates 123, Barrio Norte, Buenos Aires. A 3 cuadras del subte línea D.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Adana tiene un ambiente adecuado para relajarse y desconectar?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Absolutamente. Hemos diseñado el estudio con iluminación natural, materiales cálidos y espacios silenciosos para crear una experiencia de bienestar integral.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Puedo hacer una visita al estudio antes de tomar mi primera clase?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sí, ofrecemos visitas guiadas sin costo. Puedes agendar tu visita llamando al 11 1234-5678 o por WhatsApp.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Sección de Pagos */}
      <Box>
        <Typography variant="h3" style={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#7E7EC3',
          marginBottom: '1.5rem'
        }}>
          Pagos
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Cuáles son las opciones de pago?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Aceptamos efectivo, transferencia bancaria y todas las tarjetas de crédito/débito. También Mercado Pago.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Tienen membresías mensuales o paquetes de clases?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sí, ofrecemos membresías mensuales ilimitadas y paquetes de 5, 10 o 20 clases con descuento. Consulta nuestros planes actuales.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 500 }}>¿Puedo pagar por una sola clase sin comprometerme a un paquete?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Claro que sí. Ofrecemos clases sueltas para que pruebes la experiencia antes de comprometerte con un paquete.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </section>
  );
};

export default Faq;