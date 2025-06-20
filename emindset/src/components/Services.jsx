import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faMicrochip, faChevronLeft, faChevronRight, faLightbulb, faShield, faChartLine, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block text-sm font-semibold text-primary mb-4">{t('services.title').toUpperCase()}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('services.subtitle')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('services.corporate.description')}</p>
        </div>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-300"
              aria-label="Scroll left"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-primary" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 gap-3 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Service 1 - Mercantil & Societario */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faBalanceScale} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.corporate.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.corporate.shortDescription') || t('services.corporate.description')}</p>
              <a href="/servicios" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Service 2 - Nuevas Tecnologías */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faLightbulb} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.nuevasTecnologias.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.nuevasTecnologias.shortDescription') || t('services.nuevasTecnologias.description')}</p>
              <a href="/servicios" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Service 3 - Startups e Innovación */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faMicrochip} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.startupsInnovacion.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.startupsInnovacion.shortDescription') || t('services.startupsInnovacion.description')}</p>
              <a href="/servicios/startups-innovacion" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Service 6 - Residencia Fiscal e Inversión */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faGlobe} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.fiscal.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.fiscal.shortDescription') || t('services.fiscal.description')}</p>
              <a href="/servicios" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Service 4 - Protección de Datos */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faShield} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.proteccionDatos.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.proteccionDatos.shortDescription') || t('services.proteccionDatos.description')}</p>
              <a href="/servicios" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Service 5 - Fiscalidad */}
            <div className="bg-white p-5 hover:shadow-md transition-all duration-300 card-hover group animate-fade-in min-w-[200px] md:min-w-[220px] flex-shrink-0" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <FontAwesomeIcon icon={faChartLine} className="service-icon text-2xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('services.fiscalidad.title')}</h3>
              <p className="text-gray-600 w-[300px] text-sm mb-4 line-clamp-2">{t('services.fiscalidad.shortDescription') || t('services.fiscalidad.description')}</p>
              <a href="/servicios" className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                {t('common.readMore')} <FontAwesomeIcon icon={faChevronRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            
          </div>

          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-300"
              aria-label="Scroll right"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-primary" />
            </button>
          )}
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Services;
