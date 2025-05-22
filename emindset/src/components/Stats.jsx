import { useState, useEffect, useRef } from 'react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    experience: 0,
    clients: 0,
    experts: 0,
    hours: 0
  });
  
  const sectionRef = useRef(null);
  
  const finalCounts = {
    experience: 15,
    clients: 200,
    experts: 12,
    hours: 24
  };
  
  // Función para verificar si el elemento está visible en la pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Se activa cuando al menos el 10% del elemento es visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // Función para animar los contadores
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // Duración de la animación en milisegundos
    const interval = 16; // Intervalo de actualización (aproximadamente 60 FPS)
    const steps = duration / interval;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      
      setCounts({
        experience: Math.floor(progress * finalCounts.experience),
        clients: Math.floor(progress * finalCounts.clients),
        experts: Math.floor(progress * finalCounts.experts),
        hours: Math.floor(progress * finalCounts.hours)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(finalCounts);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-tr from-[#006eae] to-[#00b1ed] text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl md:text-5xl font-bold mb-2">{counts.experience}</div>
            <div className="text-sm uppercase tracking-wider">Años de experiencia</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl md:text-5xl font-bold mb-2">{counts.clients}</div>
            <div className="text-sm uppercase tracking-wider">Clientes satisfechos</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl md:text-5xl font-bold mb-2">{counts.experts}</div>
            <div className="text-sm uppercase tracking-wider">Expertos legales</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl md:text-5xl font-bold mb-2">{counts.hours}</div>
            <div className="text-sm uppercase tracking-wider">Horas respuesta</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
