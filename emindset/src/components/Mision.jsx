import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Mision = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const misionStatements = [
    {
      id: 1,
      text: 'Cuando te juegas algo importante, no estás tranquilo. Sabes que un paso en falso puede salir caro.'
    },
    {
      id: 2,
      text: 'En Emindset Law te entendemos. Sabemos lo que se siente. Por eso llegamos con soluciones antes de que aparezca el problema. Porque el peor conflicto es el que se podría haber evitado.'
    },
    {
      id: 3,
      text: 'Y más vale un buen acuerdo que mil batallas. Porque tú no estás para perder ninguna.'
    },
    {
      id: 4,
      text: 'No apagamos fuegos, los evitamos. Prevenir, ayudar y proteger: ese es nuestro verdadero oficio. Te cuidamos como si tu negocio fuera nuestro. Porque esto no va de leyes. Va de ti. Y de proteger lo que tanto te ha costado construir.'
    }
  ];

  // Handle intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '-50px 0px',
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Handle slide selection
  const handleSelection = (selectedIndex) => {
    if (selectedIndex !== index && !isAnimating) {
      setIsAnimating(true);
      setIndex(selectedIndex);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setIndex((prevIndex) => (prevIndex + 1) % misionStatements.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isAnimating, misionStatements.length]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 px-6 bg-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/10"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/10"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className={`mb-10 text-center transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="inline-block text-sm font-semibold text-primary mb-2">NUESTRA FILOSOFÍA</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Misión y Valores</h2>
          <div className="w-10 h-1 bg-primary mx-auto mt-2 mb-3"></div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">Nuestro compromiso es resolver tus retos legales con un enfoque moderno y eficiente.</p>
        </div>
        
        <div className="relative min-h-[160px] md:min-h-[140px] flex items-center justify-center mb-8">
          {/* Quote marks decoration */}
          <div className="absolute -top-6 -left-2 md:-left-4 text-6xl text-primary/10 font-serif">"</div>
          <div className="absolute -bottom-10 -right-2 md:-right-4 text-6xl text-primary/10 font-serif">"</div>
          
          <div 
            className={`max-w-3xl mx-auto text-center px-4 ${isVisible ? 'transform-none opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-300`}
          >
            <p 
              className={`text-lg md:text-xl font-light text-gray-700 leading-relaxed transition-all duration-700 ${isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}
              key={index} // Add key to force re-render and animation
            >
              {misionStatements[index].text}
            </p>
          </div>
        </div>
        
        <div className={`flex justify-center items-center gap-4 mt-4 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {misionStatements.map((statement, i) => (
            <button
              key={statement.id}
              className={`transition-all duration-500 rounded-full focus:outline-none ${i === index 
                ? 'bg-primary w-8 h-2' 
                : 'bg-gray-200 hover:bg-gray-300 w-3 h-3'}`}
              onClick={() => handleSelection(i)}
              aria-label={`Ver misión ${i + 1}`}
            />
          ))}
        </div>

        <div className={`mt-10 text-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href="#contact" 
            className="btn-hover inline-flex items-center justify-center bg-primary text-white font-medium px-5 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-md text-sm"
          >
            CONOCE NUESTROS VALORES <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mision;
