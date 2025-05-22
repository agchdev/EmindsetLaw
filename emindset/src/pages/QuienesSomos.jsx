import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faHandshake, faBuilding, faLaptopCode, faQuoteLeft, faQuoteRight, faUsers, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import teamMember1 from "../assets/img/hero.jpeg"; // Placeholder - reemplazar con imágenes reales

// Componente para la sección de servicios en grid
const ServiceCard = ({ icon, title, description, delay, isVisible }) => {
  return (
    <div 
      className={`bg-[#003673] rounded-md shadow-md overflow-hidden transition-all duration-1000 transform hover:shadow-lg group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-6 transform transition-transform duration-500 group-hover:scale-110">
            <FontAwesomeIcon icon={icon} size="lg" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/80 leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para la sección de cita
const Quote = ({ isVisible }) => {
  return (
    <section className="py-20 bg-[#003673] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-[#00b1ed]/30 mb-6" />
          <h2 className="text-3xl md:text-5xl font-light mb-8 leading-relaxed">
          «La diferencia es que no vemos, pensamos, ni trabajamos igual.»
          </h2>
          <FontAwesomeIcon icon={faQuoteRight} className="text-4xl text-[#00b1ed]/30 mt-6" />
        </div>
      </div>
    </section>
  );
};

// Componente para la tarjeta de miembro del equipo
const TeamMemberCard = ({ image, name, position, description, delay, isVisible }) => {
  return (
    <div 
      className={`bg-white rounded-md shadow-md overflow-hidden transition-all duration-1000 transform hover:shadow-xl group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003673]/90 via-[#003673]/50 to-transparent flex items-end transition-all duration-500 group-hover:from-[#00b1ed]/90 group-hover:via-[#00b1ed]/50">
          <div className="p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
            <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-white">{name}</h3>
            <p className="text-[#00b1ed] font-medium transition-all duration-300 group-hover:text-white">{position}</p>
          </div>
        </div>
        
        {/* Social icons that appear on hover */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
          <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
          </a>
        </div>
      </div>
      <div className="p-6 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#00b1ed]/0 transition-all duration-500 group-hover:border-[#00b1ed]/20"></div>
        
        <p className="text-gray-600 text-sm leading-relaxed transition-all duration-500 group-hover:text-gray-800">{description}</p>
        
        {/* Read more link that appears on hover */}
        <div className="mt-4 overflow-hidden h-0 opacity-0 transition-all duration-500 group-hover:h-6 group-hover:opacity-100">
          <a href="#" className="text-[#00b1ed] text-sm font-medium inline-flex items-center">
            Ver perfil completo
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const QuienesSomos = () => {
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  
  const servicesRef = useRef(null);
  const quoteRef = useRef(null);
  const teamRef = useRef(null);
  
  useEffect(() => {
    const observerServices = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
          observerServices.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );
    
    const observerQuote = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuoteVisible(true);
          observerQuote.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );
    
    const observerTeam = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeamVisible(true);
          observerTeam.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );
    
    if (servicesRef.current) observerServices.observe(servicesRef.current);
    if (quoteRef.current) observerQuote.observe(quoteRef.current);
    if (teamRef.current) observerTeam.observe(teamRef.current);
    
    return () => {
      observerServices.disconnect();
      observerQuote.disconnect();
      observerTeam.disconnect();
    };
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
  
  const teamMembers = [
    {
      id: 1,
      name: "Oriol Giró",
      position: "CEO & Fundador",
      description: "Abogado especializado en derecho mercantil con más de 15 años de experiencia asesorando a empresas nacionales e internacionales. Experto en fusiones y adquisiciones, reestructuraciones empresariales y contratación mercantil.",
      image: teamMember1
    },
    {
      id: 2,
      name: "María Rodríguez",
      position: "Directora Jurídica",
      description: "Especialista en derecho tecnológico y protección de datos con amplia experiencia en el asesoramiento a startups y empresas del sector digital. Máster en Derecho de las Nuevas Tecnologías.",
      image: teamMember1
    },
    {
      id: 3,
      name: "Carlos Martínez",
      position: "Socio - Real Estate",
      description: "Experto en derecho inmobiliario con más de 10 años de experiencia en operaciones de compraventa, arrendamiento y desarrollo de proyectos inmobiliarios tanto residenciales como comerciales.",
      image: teamMember1
    }
  ];

  return (
    <div className="pt-24 bg-white">
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-r from-[#00b1ed] to-[#003673] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Quiénes Somos</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-10"></div>
            <p className="text-xl text-white/90 leading-relaxed">
              Somos un despacho de abogados especializado en derecho mercantil, real estate y nuevas tecnologías, 
              comprometidos con ofrecer soluciones legales innovadoras y personalizadas para nuestros clientes.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">CUATRO ENFOQUES DE NUESTRA EXISTENCIA</h2>
            <div className="w-24 h-1 bg-[#00b1ed] mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                {...service}
                delay={300 + (index * 150)}
                isVisible={isServicesVisible}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote section */}
      <div ref={quoteRef}>
        <Quote isVisible={isQuoteVisible} />
      </div>
      
      {/* Team section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">EQUIPO EJECUTIVO</h2>
            <div className="w-24 h-1 bg-[#00b1ed] mx-auto mt-4 mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Nuestro equipo está formado por profesionales con amplia experiencia en diferentes áreas del derecho, 
              comprometidos con ofrecer un servicio de máxima calidad y adaptado a las necesidades de cada cliente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={member.id}
                {...member}
                delay={300 + (index * 150)}
                isVisible={isTeamVisible}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#00b1ed]/10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#00b1ed]/10"></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Quieres conocernos mejor?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Estamos a tu disposición para resolver cualquier duda o consulta que tengas sobre nuestros servicios.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#contact" 
                className="btn-hover inline-flex items-center justify-center bg-[#00b1ed] text-white font-medium px-7 py-3 rounded-full hover:bg-[#003673] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Contactar ahora
              </a>
              <a 
                href="/servicios" 
                className="btn-hover inline-flex items-center justify-center bg-white text-[#00b1ed] font-medium px-7 py-3 rounded-full border border-[#00b1ed] hover:bg-[#00b1ed]/5 transition-all duration-300"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
