import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Wellness = () => {
  return (
    <Box sx={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '4rem 2rem',
      fontFamily: 'Outfit, sans-serif'
    }}>
      {/* Artículo 1 - Bienestar mental */}
      <Box sx={{
        backgroundColor: '#FFFDEF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Título principal */}
        <Typography variant="h1" sx={{
          fontWeight: 700,
          fontSize: '2.5rem',
          color: '#413324',
          marginBottom: '1rem'
        }}>
          Bienestar mental
        </Typography>
        
        {/* Subtítulo */}
        <Typography variant="h2" sx={{
          fontWeight: 400,
          fontSize: '1.5rem',
          color: '#7E7EC3',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          El poder de la mente en tu práctica de pilates
        </Typography>
        
        {/* Autor y fecha */}
        <Typography sx={{
          color: '#888',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          Por la Dra. Rocío Rojas | 09 de abril del 2025
        </Typography>
        
        {/* Párrafo introductorio */}
        <Typography paragraph sx={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#413324',
          marginBottom: '2rem'
        }}>
          El bienestar mental es esencial para tener una vida equilibrada, y juega un papel clave en tu práctica de Pilates. Una mente tranquila y enfocada puede transformar tu experiencia en clase, mejorando tu rendimiento físico y emocional. Aquí te contamos cómo:
        </Typography>
        
        {/* Sección Beneficios */}
        <Typography variant="h3" sx={{
          fontWeight: 600,
          fontSize: '1.8rem',
          color: '#413324',
          margin: '2rem 0 1.5rem 0'
        }}>
          Beneficios del bienestar mental en pilates
        </Typography>
        
        {/* Lista de beneficios */}
        <Box component="ol" sx={{ 
          paddingLeft: '1.5rem',
          '& li': {
            marginBottom: '1.5rem'
          }
        }}>
          <li>
            <Typography sx={{
              fontWeight: 600,
              color: '#7E7EC3',
              fontSize: '1.2rem',
              marginBottom: '0.5rem'
            }}>
              Mejora tu concentración:
            </Typography>
            <Typography sx={{
              lineHeight: '1.7',
              color: '#413324'
            }}>
              Pilates requiere estar presente en cada movimiento. Cuando tu mente está en calma, puedes concentrarte mejor y lograr una práctica más efectiva.
            </Typography>
          </li>
          
          <li>
            <Typography sx={{
              fontWeight: 600,
              color: '#7E7EC3',
              fontSize: '1.2rem',
              marginBottom: '0.5rem'
            }}>
              Reduce el estrés:
            </Typography>
            <Typography sx={{
              lineHeight: '1.7',
              color: '#413324'
            }}>
              La respiración profunda y el enfoque en el presente ayudan a disminuir el estrés y la ansiedad, dejándote sentir más relajado al final de cada clase.
            </Typography>
          </li>
          
          <li>
            <Typography sx={{
              fontWeight: 600,
              color: '#7E7EC3',
              fontSize: '1.2rem',
              marginBottom: '0.5rem'
            }}>
              Aumenta tu energía:
            </Typography>
            <Typography sx={{
              lineHeight: '1.7',
              color: '#413324'
            }}>
              Al cuidar tu bienestar mental, también te sientes más energético y con mejor disposición para afrontar tu día.
            </Typography>
          </li>
        </Box>
      </Box>

      {/* Divider entre artículos */}
      <Divider sx={{ margin: '3rem 0', borderColor: '#EEE' }} />

      {/* Artículo 2 - Puedes duplicar y modificar este bloque para más artículos */}
      <Box sx={{
        backgroundColor: '#FFFDEF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Estructura igual que el primer artículo */}
        <Typography variant="h1" sx={{
          fontWeight: 700,
          fontSize: '2.5rem',
          color: '#413324',
          marginBottom: '1rem'
        }}>
          Conexión mente-cuerpo
        </Typography>
        
        <Typography sx={{
          color: '#888',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          Por el Dr. Carlos Méndez | 15 de abril del 2025
        </Typography>
        
        <Typography paragraph sx={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#413324'
        }}>
          La conexión entre mente y cuerpo es fundamental en Pilates. Te explicamos cómo fortalecer esta relación para una práctica más consciente y efectiva.
        </Typography>
      </Box>
    </Box>
  );
};

export default Wellness;