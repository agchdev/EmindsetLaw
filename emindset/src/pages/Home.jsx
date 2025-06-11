import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ServicesGrid from '../components/ServicesGrid';
import Stats from '../components/Stats';
import Mision from '../components/Mision';
import Premios from '../components/Premios';
import CTA from '../components/CTA';
import News from '../components/News';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import SeoHelmet from '../seo/SeoHelmet';
import logo from '../assets/logo.png';

const Home = () => {
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = useState(false);
  const [splashFading, setSplashFading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  
  useEffect(() => {
    // Verificar si es la primera visita
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // Mostrar la pantalla de splash y ocultar contenido principal
      setShowSplash(true);
      setShowContent(false);
      
      // Guardar en localStorage que ya ha visitado la página
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // Iniciar desvanecimiento después de 2 segundos
      setTimeout(() => {
        setSplashFading(true);
        
        // Después de 500ms (duración de la animación), ocultar splash y mostrar contenido
        setTimeout(() => {
          setShowSplash(false);
          setShowContent(true);
        }, 500);
      }, 2000);
    }
  }, []);
  
  return (
    <div>
      {/* SEO Metadata */}
      <SeoHelmet page="home" />
      
      {/* Splash Screen */}
      {showSplash && (
        <div className={`splash-screen ${splashFading ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <img 
              src={logo} 
              alt={t('common.logo_alt')} 
              className="splash-logo"
            />
            <p className="splash-text">{t('common.welcome')}</p>
          </div>
        </div>
      )}
      
      {/* Contenido principal de la página - solo se muestra cuando showContent es true */}
      {showContent && (
        <>
          <Hero />
          <About />
          <Services />
          <Mision />
          {/* <Stats /> */}
          <Testimonials />
          <CTA />
          <Premios />
          {/* <News /> */}
          <Contact />
        </>
      )}
    </div>
  );
};

export default Home;
