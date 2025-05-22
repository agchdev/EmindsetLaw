import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faHandshake, faBuilding, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const ServiceCard = ({ icon, title, description, delay, isVisible }) => {
  return (
    <div 
      className={`bg-white rounded-md shadow-md overflow-hidden transition-all duration-1000 transform hover:shadow-lg group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-8 relative">
        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#00b1ed]/10 -z-10"></div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00b1ed]/10 text-[#00b1ed] mb-6 transform transition-transform duration-500 group-hover:scale-110">
            <FontAwesomeIcon icon={icon} size="lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ServicesGrid = () => {
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
  
  const services = [
    {
      id: 1,
      icon: faBalanceScale,
      title: "Aportar ante Riesgos",
      description: "Identificamos y evaluamos los riesgos legales que pueden afectar a tu negocio, ofreciendo soluciones preventivas y estratégicas para minimizar su impacto."
    },
    {
      id: 2,
      icon: faHandshake,
      title: "Optimizar acuerdos",
      description: "Diseñamos y revisamos contratos y acuerdos comerciales para garantizar que tus intereses estén protegidos y que las relaciones comerciales sean sólidas y beneficiosas."
    },
    {
      id: 3,
      icon: faBuilding,
      title: "Avalar trámites",
      description: "Gestionamos todos los procedimientos administrativos y burocráticos necesarios para que tu empresa opere con total conformidad legal, evitando sanciones y problemas futuros."
    },
    {
      id: 4,
      icon: faLaptopCode,
      title: "Crear con ventaja",
      description: "Asesoramos en la protección de la propiedad intelectual e industrial, ayudándote a proteger tus creaciones y a aprovechar al máximo su potencial en el mercado."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">CUATRO ENFOQUES DE NUESTRA EXISTENCIA</h2>
          <div className="w-24 h-1 bg-[#00b1ed] mx-auto mt-4 mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              {...service}
              delay={300 + (index * 150)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
