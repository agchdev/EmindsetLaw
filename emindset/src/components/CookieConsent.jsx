import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { initGA, setAnalyticsConsent } from '../utils/analytics';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Siempre necesarias
    analytics: false,
  });
  
  useEffect(() => {
    // Verificar si el usuario ya estableció preferencias
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Si ya hay consentimiento, actualizar el estado
      setCookiePreferences({
        essential: true,
        analytics: consent === 'all' || consent === 'analytics',
      });
      
      // Inicializar Google Analytics si corresponde
      if (consent === 'all' || consent === 'analytics') {
        initGA();
      }
    }
  }, []);
  
  // Aceptar todas las cookies
  const acceptAll = () => {
    Cookies.set('cookie-consent', 'all', { expires: 365 });
    setCookiePreferences({ essential: true, analytics: true });
    setAnalyticsConsent(true);
    setShowBanner(false);
    setShowSettings(false);
  };
  
  // Aceptar solo las esenciales
  const acceptEssential = () => {
    Cookies.set('cookie-consent', 'essential', { expires: 365 });
    setCookiePreferences({ essential: true, analytics: false });
    setAnalyticsConsent(false);
    setShowBanner(false);
    setShowSettings(false);
  };
  
  // Guardar preferencias personalizadas
  const savePreferences = () => {
    if (cookiePreferences.analytics) {
      Cookies.set('cookie-consent', 'analytics', { expires: 365 });
      setAnalyticsConsent(true);
    } else {
      Cookies.set('cookie-consent', 'essential', { expires: 365 });
      setAnalyticsConsent(false);
    }
    setShowBanner(false);
    setShowSettings(false);
  };
  
  // Manejar cambios en las preferencias
  const handlePreferenceChange = (e) => {
    setCookiePreferences({
      ...cookiePreferences,
      [e.target.name]: e.target.checked
    });
  };
  
  // Abrir modal de configuración
  const openSettings = () => {
    setShowSettings(true);
  };
  
  if (!showBanner && !showSettings) return null;
  
  return (
    <>
      {/* Overlay para modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('cookies.preferences')}</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                {t('cookies.description')}
              </p>
              
              {/* Cookies esenciales */}
              <div className="py-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{t('cookies.essential.title')}</h4>
                    <p className="text-sm text-gray-500">{t('cookies.essential.description')}</p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="essential" 
                      id="essential"
                      className="opacity-0 absolute" 
                      checked={true}
                      disabled={true}
                    />
                    <label 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-not-allowed`}
                      htmlFor="essential"
                    >
                      <span className={`block h-6 w-6 rounded-full bg-blue-500 transform translate-x-4`}></span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Cookies analíticas */}
              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{t('cookies.analytics.title')}</h4>
                    <p className="text-sm text-gray-500">{t('cookies.analytics.description')}</p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="analytics" 
                      id="analytics"
                      className="opacity-0 absolute" 
                      checked={cookiePreferences.analytics}
                      onChange={handlePreferenceChange}
                    />
                    <label 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}
                      htmlFor="analytics"
                    >
                      <span className={`block h-6 w-6 rounded-full bg-white shadow transform ${cookiePreferences.analytics ? 'translate-x-4' : 'translate-x-0'} transition-transform duration-200`}></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('cookies.analytics.details')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                {t('cookies.cancel')}
              </button>
              <button 
                onClick={savePreferences}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                {t('cookies.save')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Banner principal */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{t('cookies.title')}</h3>
                <p className="text-sm">
                  {t('cookies.message')}{' '}
                  <a href="/politica-cookies" className="underline hover:text-blue-300">
                    {t('cookies.policy')}
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={acceptEssential}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm"
                >
                  {t('cookies.essential_only')}
                </button>
                <button 
                  onClick={openSettings}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm"
                >
                  {t('cookies.settings')}
                </button>
                <button 
                  onClick={acceptAll}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                >
                  {t('cookies.accept_all')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
