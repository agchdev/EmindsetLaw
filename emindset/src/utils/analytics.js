import ReactGA from 'react-ga4';
import Cookies from 'js-cookie';

// Tu ID de medición de GA4
const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplaza con tu ID real

// Inicializar Google Analytics
export const initGA = () => {
  // Solo inicializamos GA si el usuario ha dado su consentimiento
  if (hasAnalyticsConsent()) {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('Google Analytics inicializado');
    return true;
  }
  console.log('Google Analytics no inicializado (sin consentimiento)');
  return false;
};

// Verificar si el usuario ha aceptado cookies analíticas
export const hasAnalyticsConsent = () => {
  const cookieConsent = Cookies.get('cookie-consent');
  return cookieConsent === 'all' || cookieConsent === 'analytics';
};

// Establecer consentimiento para cookies analíticas
export const setAnalyticsConsent = (consent) => {
  if (consent) {
    // Si el usuario ya había aceptado todas las cookies, mantenemos ese valor
    const currentConsent = Cookies.get('cookie-consent');
    if (currentConsent !== 'all') {
      Cookies.set('cookie-consent', 'analytics', { expires: 365 });
    }
    
    // Inicializamos GA ahora que tenemos consentimiento
    initGA();
    return true;
  } else {
    // Si el usuario rechaza analytics pero había aceptado todas, actualizamos
    const currentConsent = Cookies.get('cookie-consent');
    if (currentConsent === 'all') {
      Cookies.set('cookie-consent', 'essential', { expires: 365 });
    }
    
    // Eliminamos cookies de GA
    removeGACookies();
    return false;
  }
};

// Eliminar cookies de Google Analytics
export const removeGACookies = () => {
  // Limpiar cookies de GA
  const cookieNames = Object.keys(Cookies.get());
  cookieNames.forEach(name => {
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      Cookies.remove(name, { path: '/' });
      Cookies.remove(name, { path: '/', domain: '.emindsetlaw.com' });
    }
  });
};

// Registrar visita de página
export const pageView = (path) => {
  if (hasAnalyticsConsent()) {
    ReactGA.send({ hitType: "pageview", page: path });
    console.log(`Pageview registrada: ${path}`);
  }
};

// Registrar evento personalizado
export const trackEvent = (category, action, label = null, value = null) => {
  if (hasAnalyticsConsent()) {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log(`Evento registrado: ${category} - ${action} ${label ? '- ' + label : ''}`);
  }
};
