import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Header = ({ onLogoAnimationComplete }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState('auto');
  const [menuWasRecentlyClosed, setMenuWasRecentlyClosed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'es'); // es, fr, ca, en
  const [logoAnimationPhase] = useState(2); // Establecemos directamente a la posición final (2)
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  
  const navLinks = [
    { name: t('navigation.commitment'), url: '/historia' },
    { name: t('navigation.services'), url: '/servicios' },
    { name: t('navigation.recognitions'), url: '/reconocimientos' },
    { name: t('navigation.blog'), url: '/blog' },
  ];

  // Initial load without animation
  useEffect(() => {
    setIsLoaded(true);
    // Notificar que la animación está completa inmediatamente
    if (onLogoAnimationComplete) {
      onLogoAnimationComplete();
    }
  }, [onLogoAnimationComplete]);

  // Handle scroll effect for the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Efecto para sincronizar el estado del menú con la altura del header
  useEffect(() => {
    console.log('Estado del menú cambió a:', isMenuOpen ? 'abierto' : 'cerrado');
    
    if (isMenuOpen) {
      // Cuando se abre el menú, establecer altura al 100% inmediatamente
      setHeaderHeight('100%');
      setMenuWasRecentlyClosed(false);
    } else {
      // Cuando se cierra el menú, marcar que fue cerrado recientemente
      setMenuWasRecentlyClosed(true);
      
      // Temporizador para cambiar la altura a auto
      const heightTimer = setTimeout(() => {
        setHeaderHeight('auto');
        console.log('Altura del header cambiada a auto');
      }, 500); // 500ms es la duración de la transición del menú
      
      // Temporizador para quitar el estado de recientemente cerrado
      const backgroundTimer = setTimeout(() => {
        setMenuWasRecentlyClosed(false);
        console.log('Estado de menú recientemente cerrado eliminado');
      }, 1500); // 1.5 segundos para mantener el fondo transparente
      
      return () => {
        clearTimeout(heightTimer);
        clearTimeout(backgroundTimer);
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    console.log('Toggle menu:', newMenuState ? 'abriendo' : 'cerrando');
  };
  
  // Función para cambiar el idioma, envuelta en useCallback para evitar recrear la función en cada renderizado
  const changeLanguage = useCallback((lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(`Idioma cambiado a: ${lang}`);
    
    // Almacenar la preferencia de idioma en localStorage
    localStorage.setItem('userLanguage', lang);
  }, [i18n, setCurrentLanguage]);
  
  // Detectar el idioma al cargar el componente
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage]);

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-500 ${isMenuOpen || menuWasRecentlyClosed ? 'bg-transparent py-5 md:py-8' : isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5 md:py-8'} ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
      style={{ height: headerHeight }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo con animaciu00f3n */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <div className="relative">
                <img 
                  ref={logoRef}
                  src={logo} 
                  alt={t('common.logo_alt')} 
                  className={`transition-all duration-1000 ${isScrolled ? 'filter-none' : 'filter brightness-0 invert'}`}
                  style={{
                    height: logoAnimationPhase === 0 ? '40vh' : '32px',
                    position: logoAnimationPhase === 0 ? 'fixed' : 'relative',
                    top: logoAnimationPhase === 0 ? '50%' : 'auto',
                    left: logoAnimationPhase === 0 ? '50%' : 'auto',
                    transform: logoAnimationPhase === 0 ? 'translate(-50%, -50%)' : 'none',
                    zIndex: 50,
                    maxWidth: '90%',
                    transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    interpolateSize: 'allow-keywords'
                  }}
                />
                {logoAnimationPhase > 0 && (
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1579a2] transform scale-x-0 origin-left transition-transform duration-500 ${isScrolled ? 'group-hover:scale-x-100' : 'group-hover:scale-x-0'}`}></div>
                )}
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className={`group relative px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 overflow-hidden ${isScrolled ? 'text-gray-700 hover:text-[#1579a2]' : 'text-white/90 hover:text-white'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover effect - different for scrolled vs transparent */}
                {isScrolled ? (
                  // Underline effect for scrolled state
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1579a2]/70 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                ) : (
                  // Highlight effect for transparent state
                  <span className="absolute inset-0 bg-white/10 rounded-sm transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 -z-10"></span>
                )}
              </a>
            ))}
            
            {/* Language Selector Dropdown */}
            <div className="relative group ml-4">
              <button 
                className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-700 hover:text-[#1579a2]' : 'text-white/90 hover:text-white'} transition-colors duration-300`} 
                aria-label={t('navigation.select_language')}
              >
                <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transform transition-transform duration-300 group-hover:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`absolute right-0 mt-2 w-32 ${isScrolled ? 'bg-white/95' : 'bg-gray-800/80'} backdrop-blur-md rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                <button 
                  onClick={() => changeLanguage('es')} 
                  className={`w-full text-left px-4 py-2 ${currentLanguage === 'es' ? 'bg-[#1579a2]/10 text-[#1579a2] font-medium' : isScrolled ? 'text-gray-700' : 'text-white'} hover:bg-gray-100 hover:text-gray-700`} 
                  aria-pressed={currentLanguage === 'es'}
                >
                  {t('languages.es')}
                </button>
                <button 
                  onClick={() => changeLanguage('fr')} 
                  className={`w-full text-left px-4 py-2 ${currentLanguage === 'fr' ? 'bg-[#1579a2]/10 text-[#1579a2] font-medium' : isScrolled ? 'text-gray-700' : 'text-white'} hover:bg-gray-100 hover:text-gray-700`} 
                  aria-pressed={currentLanguage === 'fr'}
                >
                  {t('languages.fr')}
                </button>
                <button 
                  onClick={() => changeLanguage('ca')} 
                  className={`w-full text-left px-4 py-2 ${currentLanguage === 'ca' ? 'bg-[#1579a2]/10 text-[#1579a2] font-medium' : isScrolled ? 'text-gray-700' : 'text-white'} hover:bg-gray-100 hover:text-gray-700`} 
                  aria-pressed={currentLanguage === 'ca'}
                >
                  {t('languages.ca')}
                </button>
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={`w-full text-left px-4 py-2 ${currentLanguage === 'en' ? 'bg-[#1579a2]/10 text-[#1579a2] font-medium' : isScrolled ? 'text-gray-700' : 'text-white'} hover:bg-gray-100 hover:text-gray-700`} 
                  aria-pressed={currentLanguage === 'en'}
                >
                  {t('languages.en')}
                </button>
              </div>
            </div>

            {/* Contact Button */}
            <a 
              href="/contacto"
              className={`ml-4 px-5 py-2 text-sm transition-all duration-300 border ${isScrolled ? 'border-[#1579a2] text-[#1579a2] hover:bg-[#1579a2] hover:text-white' : 'border-white/70 text-white hover:bg-white/10'}`}
            >
              {t('contact_section.now')}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className={`focus:outline-none transition-colors duration-300 ${isScrolled ? 'text-[#1579a2]' : 'text-white'}`}
              aria-label={t('navigation.toggle_menu')}
            >
              <span className="sr-only">{t('navigation.menu')}</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'} top-3`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>
      
      <div 
        className={`md:hidden fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('navigation.menu_navigation')}
      >
        <div className="pt-16 pb-8 px-6 h-full overflow-y-auto flex flex-col">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#1579a2] transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label={t('navigation.close_menu')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img src={logo} alt={t('common.logo_alt')} className="h-8" />
          </div>
          
          <div className="flex flex-col space-y-6 flex-grow">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className="transform transition-all duration-300 text-gray-800 hover:text-[#1579a2] text-lg font-light flex items-center justify-between border-b border-gray-100 pb-4"
                style={{ 
                  transitionDelay: isMenuOpen ? `${150 + index * 75}ms` : '0ms',
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)' 
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1579a2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
            
            {/* Mobile contact button */}
            <div 
              className="mt-8 pt-4" 
              style={{ 
                transitionDelay: isMenuOpen ? '500ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)' 
              }}
            >
              <a 
                href="/contacto"
                className="block w-full py-3 text-center bg-[#1579a2] text-white transition-all duration-300 hover:bg-[#1579a2]/90 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact_section.now')}
              </a>
            </div>
            
            {/* Social media icons for mobile */}
            <div 
              className="flex space-x-6 justify-center items-center pt-4 mb-4"
              style={{ 
                transitionDelay: isMenuOpen ? '600ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              <a href="https://es.linkedin.com/company/emindset-law-firm" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1579a2] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/emindsetlaw/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1579a2] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 10.936V7.857a2 2 0 00-2-2 2 2 0 00-2-2 2 2 0 00-2-2v2.136V6.003a2 2 0 00-2-2 2 2 0 00-2-2 2 2 0 00-2-2v2.945a2 2 0 00-.5.055V4.309a2 2 0 00-.5-.055 2 2 0 00-2 2 2 2 0 00-2 2 2 2 0 00-2 2v2.945M15 11.542V7.857a2 2 0 00-2-2 2 2 0 00-2-2 2 2 0 00-2-2v2.136V6.003a2 2 0 00-2-2 2 2 0 00-2-2 2 2 0 00-2-2v2.945a2 2 0 00-.5.055V11.542z" />
                </svg>
              </a>
            </div>
            
            {/* Language Selector for Mobile */}
            <div 
              className="mt-6 pt-6 border-t border-gray-100" 
              style={{ 
                transitionDelay: isMenuOpen ? '650ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)' 
              }}
            >
              <p className="text-sm text-gray-500 mb-3">{t('contact_section.language')}</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    changeLanguage('es');
                    setIsMenuOpen(false);
                  }} 
                  className={`px-3 py-2 text-sm rounded-md ${currentLanguage === 'es' ? 'bg-[#1579a2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={currentLanguage === 'es'}
                >
                  {t('languages.es')}
                </button>
                <button 
                  onClick={() => {
                    changeLanguage('fr');
                    setIsMenuOpen(false);
                  }} 
                  className={`px-3 py-2 text-sm rounded-md ${currentLanguage === 'fr' ? 'bg-[#1579a2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={currentLanguage === 'fr'}
                >
                  {t('languages.fr')}
                </button>
                <button 
                  onClick={() => {
                    changeLanguage('ca');
                    setIsMenuOpen(false);
                  }} 
                  className={`px-3 py-2 text-sm rounded-md ${currentLanguage === 'ca' ? 'bg-[#1579a2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={currentLanguage === 'ca'}
                >
                  {t('languages.ca')}
                </button>
                <button 
                  onClick={() => {
                    changeLanguage('en');
                    setIsMenuOpen(false);
                  }} 
                  className={`px-3 py-2 text-sm rounded-md ${currentLanguage === 'en' ? 'bg-[#1579a2] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-pressed={currentLanguage === 'en'}
                >
                  {t('languages.en')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer info */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">{t('contact_section.help')}</p>
            <a href="tel:+376678882" className="text-[#1579a2] font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +376 678 882
            </a>
          </div>
        </div>
        
        {/* Close button for mobile menu */}
        <button 
          className="absolute top-6 right-6 text-gray-500 hover:text-[#1579a2] transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;