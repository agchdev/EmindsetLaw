import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Newsletter = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Para facilitar las pruebas, mostrar el modal inmediatamente
  // En producción, cambiar a 15000 (15 segundos)
  const POPUP_DELAY = 2000; // 2 segundos para pruebas

  // Mostrar el modal después de unos segundos en la página
  // o si el usuario ha hecho scroll del 70% de la página
  useEffect(() => {
    // Para forzar que aparezca durante desarrollo/pruebas (eliminar en producción)
    const forceShow = new URLSearchParams(window.location.search).get('showNewsletter');
    if (forceShow === 'true') {
      setShowModal(true);
      return;
    }

    // Verificar si el usuario ya ha cerrado el modal anteriormente
    const hasClosedNewsletter = localStorage.getItem('hasClosedNewsletter');
    const hasSubscribedNewsletter = localStorage.getItem('hasSubscribedNewsletter');
    
    if (hasClosedNewsletter || hasSubscribedNewsletter) {
      return; // No mostrar si ya lo cerró o se suscribió
    }

    // Temporizador para mostrar después de X segundos
    const timer = setTimeout(() => {
      setShowModal(true);
    }, POPUP_DELAY);
    
    // Función para detectar scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage > 0.5) { // Reducido a 50% para pruebas
        setShowModal(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar event listeners y timers
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('newsletter.error_email'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Enviar solicitud al servidor Node.js con Nodemailer
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        // Mostrar mensaje de éxito
        setIsSubmitted(true);
        setError('');
        
        // Guardar que se ha suscrito para no volver a mostrar
        localStorage.setItem('hasSubscribedNewsletter', 'true');
        
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        throw new Error('Error al enviar el correo');
      }
    } catch (error) {
      setError(t('newsletter.error_submit'));
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setShowModal(false);
    // Guardar que ha cerrado el modal para no volver a mostrarlo en esta sesión
    localStorage.setItem('hasClosedNewsletter', 'true');
  };
  
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0  bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg p-6 max-w-md w-full animate__animated animate__fadeInUp relative">
        
        
        <div className="flex justify-between items-center mb-1 mt-1">
        <div>
          <img src={logo} alt="Emindset Law Logo" className="h-16 m-auto w-auto" />
        </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('common.close')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-primary">{t('newsletter.title')}</h2>
        
        {!isSubmitted ? (
          <>
            <p className="text-gray-600 mb-4">{t('newsletter.description')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('newsletter.email_label')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.email_placeholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                      {t('common.sending')}
                    </>
                  ) : (
                    <>
                      {t('newsletter.subscribe')} <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              {t('newsletter.privacy_notice')} <a href="/politica-privacidad" className="text-primary hover:underline">{t('footer.privacy')}</a>
            </p>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">{t('newsletter.success_title')}</h3>
            <p className="text-gray-600">{t('newsletter.success_message')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
