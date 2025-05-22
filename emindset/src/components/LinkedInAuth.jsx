import React, { useEffect, useState } from 'react';
import { initLinkedInService } from '../services/linkedinService';

const LinkedInAuth = ({ onAuthComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Función para manejar el proceso de autenticación
    const handleAuth = async () => {
      try {
        setIsLoading(true);
        
        // Verificar si estamos en la URL de callback
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
          // Intercambiar el código por un token de acceso
          const response = await fetch('/api/linkedin/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          
          if (!response.ok) {
            throw new Error('Error al obtener el token de acceso');
          }
          
          const data = await response.json();
          const { access_token } = data;
          
          // Guardar el token en localStorage
          localStorage.setItem('linkedin_token', access_token);
          
          // Inicializar el servicio de LinkedIn
          initLinkedInService(access_token);
          
          // Notificar que la autenticación se ha completado
          onAuthComplete(true);
        } else {
          // Verificar si ya tenemos un token guardado
          const savedToken = localStorage.getItem('linkedin_token');
          
          if (savedToken) {
            // Inicializar el servicio con el token guardado
            initLinkedInService(savedToken);
            onAuthComplete(true);
          } else {
            // No hay token, necesitamos iniciar el proceso de autenticación
            onAuthComplete(false);
          }
        }
      } catch (err) {
        console.error('Error en la autenticación de LinkedIn:', err);
        setError(err.message);
        onAuthComplete(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    handleAuth();
  }, [onAuthComplete]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-[#00b1ed] border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Autenticando con LinkedIn...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <p className="mt-2">
          <button 
            onClick={() => window.location.href = '/api/linkedin/auth'}
            className="bg-[#00b1ed] text-white px-4 py-2 rounded hover:bg-[#0077b5] transition-colors"
          >
            Reintentar autenticación
          </button>
        </p>
      </div>
    );
  }
  
  return null; // No renderizar nada si no hay errores ni está cargando
};

export default LinkedInAuth;
