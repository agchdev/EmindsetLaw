import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlayCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import heroVideo from '../assets/video.mp4';
import logo from '../assets/img/logoEmindset.png';
import { motion } from 'framer-motion';

const Hero = ({ isLogoAnimationComplete }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const canAnimate = isLogoAnimationComplete && isHomePage;

  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2, // Optional delay after parent becomes visible
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        // Ajusta la velocidad del parallax cambiando el divisor (mayor número = efecto más sutil)
        const parallaxValue = scrollPosition / 2;
        
        // Aplicar transformación para el efecto parallax
        videoRef.current.style.transform = `translateY(${parallaxValue}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden h-screen">
      <div className="absolute inset-0">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          muted 
          loop 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ 
            minHeight: '100vh', 
            minWidth: '100%',
            willChange: 'transform',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Capa base de oscurecimiento */}
        <div className="absolute inset-0 bg-black opacity-10 z-1"></div>
        {/* Capa adicional para mejorar visibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-2"></div>
      </div>
      
      {/* El logo ahora se maneja en el Header */}
      
      {/* Contenido principal */}
      <motion.div 
        className="relative flex flex-col justify-center h-screen text-gray-800 z-20"
        variants={heroContentVariants}
        initial="hidden"
        animate={canAnimate ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl" role="region" aria-label="Sección Hero - Bienvenida">
            <h1 className="sr-only">{t('hero.title')}</h1>
            
            {/* Espacio reservado para compensar el logo posicionado absolutamente */}
            <div className="h-12"></div>
            <h1 className="mb-8 leading-tight text-white">
              <div className="flex justify-start items-center">
                <motion.img 
                  src={logo} 
                  alt="Emindset Law Logo" 
                  className="w-auto h-20 md:h-28 lg:h-32"
                  variants={itemVariants}
                />
              </div>
            </h1>
            <motion.p className="text-lg md:text-xl mb-10 text-white/90 max-w-lg" variants={itemVariants}>
              {t('hero.subtitle')}<br />
              <span className="inline-block mt-2 text-base text-white/80">{t('hero.description')}</span>
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={itemVariants}>
              <a href="#budget" className="btn-hover inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-4 hover:bg-primary-dark transition-all duration-300 group">
                {t('hero.cta.budget')} <FontAwesomeIcon icon={faArrowRight} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#about" className="btn-hover inline-flex items-center justify-center text-primary font-semibold px-6 py-3.5 hover:bg-[#003673]/10 transition-all duration-300 group">
                <FontAwesomeIcon icon={faPlayCircle} className="mr-3" /> {t('hero.cta.about')}
              </a>
            </motion.div>
          </div>
        </div>
        {/* Decorative SVG wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
          <svg className="w-[102%] -ml-[1%] h-24 md:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" fillOpacity="1" d="M0,80 C360,120 1080,40 1440,80 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <a href="#about" className="text-primary hover:text-primary-dark transition-colors duration-300">
          <FontAwesomeIcon icon={faChevronDown} className="text-xl" />
        </a>
      </div>
    </section>
  );
};

export default Hero;