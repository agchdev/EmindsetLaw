import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import prem1 from "../assets/img/prem1.jpg";
import prem2 from "../assets/img/prem2.jpg";
import prem3 from "../assets/img/prem3.jpg";
import prem4 from "../assets/img/prem4.png";

const PremioCard = ({ title, year, description, image, delay, isVisible, readMoreText }) => (
  <div 
    className={`bg-white rounded-sm overflow-hidden transition-all duration-700 shadow-sm hover:shadow-md group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="relative overflow-hidden">
      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
      
      {/* Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      
      {/* Year badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className="relative">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-500">
            <span className="text-white font-light text-sm">{year}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="p-5 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Content */}
      <h3 className="text-base font-medium text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 text-xs font-light leading-relaxed">{description}</p>
      
      {/* Read more link */}
      <div className="mt-4 overflow-hidden">
        <a 
          href="#" 
          className="inline-flex items-center text-primary text-xs group-hover:translate-x-2 transition-transform duration-300"
        >
          <span className="mr-1">{readMoreText}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
);

const Premios = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Usar las traducciones para los premios
  const premiosData = t('awards.items', { returnObjects: true });
  
  // Mapear imágenes a cada premio
  const premiosImages = [prem1, prem2, prem3, prem4];
  
  // Combinar datos traducidos con imágenes
  const premios = premiosData.map((premio, index) => ({
    id: index + 1,
    ...premio,
    image: premiosImages[index]
  }));

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-sm font-semibold text-primary mb-2">{t('awards.title').toUpperCase()}</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('awards.subtitle')}</h2>
          <div className="w-10 h-1 bg-primary mx-auto mt-2 mb-3"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm">
            {t('awards.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {premios.map((premio, index) => (
            <PremioCard 
              key={premio.id} 
              {...premio} 
              delay={200 + (index * 100)}
              isVisible={isVisible}
              readMoreText={t('awards.readMore')}
            />
          ))}
        </div>
        
        <div className={`mt-10 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="/reconocimientos" 
            className="inline-flex items-center text-primary text-sm hover:text-primary-dark transition-colors duration-300"
          >
            <span className="relative z-10">{t('awards.viewAll')}</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Premios
