import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Historia = () => {
  // Refs for timeline animation
  const timelineSectionRef = useRef(null);
  const timelineProgressRef = useRef(null);
  
  // Effect for timeline animation
  useEffect(() => {
    const timelineSection = timelineSectionRef.current;
    const timelineProgress = timelineProgressRef.current;
    
    if (!timelineSection || !timelineProgress) return;
    
    const updateTimeline = () => {
      const sectionRect = timelineSection.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const sectionHeight = timelineSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section
      let scrollProgress = 0;
      
      if (sectionTop <= 0 && sectionBottom >= 0) {
        // Section is partially scrolled out of view at the top
        scrollProgress = 100 * (1 - sectionBottom / sectionHeight);
      } else if (sectionTop <= windowHeight && sectionTop > 0) {
        // Section is partially visible at the bottom of the viewport
        scrollProgress = 100 * (1 - sectionTop / windowHeight);
      } else if (sectionTop <= 0 && sectionBottom <= 0) {
        // Section is completely scrolled out of view
        scrollProgress = 100;
      }
      
      // Update the timeline progress
      timelineProgress.style.height = `${Math.min(100, scrollProgress)}%`;
    };
    
    window.addEventListener('scroll', updateTimeline);
    updateTimeline(); // Initial call
    
    return () => window.removeEventListener('scroll', updateTimeline);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="pt-24 bg-dark">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-r from-[#00b1ed] to-[#003673] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Nuestra Historia</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-10"></div>
            <p className="text-xl text-white/90 leading-relaxed">
              Conoce los orígenes y la evolución de Emindset Law, una firma con un enfoque humano y cercano.
            </p>
          </div>
        </div>
      </section>
      
      {/* Historia content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto prose prose-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={itemVariants}
            >
              Érase una vez Emindset Law
            </motion.h2>
            
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl leading-relaxed">
                Una firma de abogados que nació en 2016, gracias a un equipo con una visión común:
              </p>
              <p className="text-xl leading-relaxed font-medium text-[#00b1ed] my-6">
                que el derecho podía ser más que normas, plazos y lenguaje inaccesible.
              </p>
              <p className="text-xl leading-relaxed">
                Podía ser una herramienta útil, cercana y profundamente humana.
              </p>
              <p className="text-xl leading-relaxed">
                Una forma real de acompañar y transformar vidas.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl leading-relaxed">
                Desde el inicio supimos que queríamos hacer las cosas de otra manera.
              </p>
              <p className="text-xl leading-relaxed">
                No desde la frialdad del traje y el despacho, sino desde la escucha y el compromiso con las personas.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl leading-relaxed">
                Y, para qué negarlo, llegar con un nuevo mindset no fue fácil.
              </p>
              <p className="text-xl leading-relaxed">
                Romper con lo establecido siempre impone respeto.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl leading-relaxed">
                Pero con el tiempo, fue esa mirada humana y auténtica
              </p>
              <p className="text-xl leading-relaxed">
                la que nos permitió marcar la diferencia y convertirnos en un referente del sector legal.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl leading-relaxed font-medium text-[#00b1ed]">
                Siempre fieles a lo que nos mueve:
              </p>
              <p className="text-xl leading-relaxed">
                ayudar y estar presente cuando más se nos necesita.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <div className="w-20 h-1 bg-[#00b1ed] mx-auto mb-8"></div>
              <p className="text-gray-600 italic">
                "Transformando el derecho en una experiencia humana y cercana desde 2016."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline section */}
      <section className="py-20 bg-gray-50" ref={timelineSectionRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[#00b1ed] mb-4">NUESTRO CAMINO</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Hitos importantes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un vistazo a los momentos clave que han definido nuestra trayectoria.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line background (gray) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00b1ed]/20"></div>
            
            {/* Timeline line foreground (blue) that grows as user scrolls */}
            <div 
              ref={timelineProgressRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#00b1ed] origin-top"
              style={{ height: '0%', top: 0 }}
            ></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {/* 2016 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2016"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2016</h3>
                    <p className="text-gray-600">Fundación de Emindset Law con un pequeño equipo de 5 abogados comprometidos con una visión diferente del derecho.</p>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    {/* Empty space for alignment */}
                  </div>
                </div>
              </motion.div>
              
              {/* 2018 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2018"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    {/* Empty space for alignment */}
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2018</h3>
                    <p className="text-gray-600">Apertura de nuestra primera oficina en Barcelona y ampliación del equipo a 15 profesionales.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* 2020 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2020"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2020</h3>
                    <p className="text-gray-600">Expansión internacional con la apertura de nuestra oficina en Andorra, especializándonos en fiscalidad internacional.</p>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    {/* Empty space for alignment */}
                  </div>
                </div>
              </motion.div>
              
              {/* 2022 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2022"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    {/* Empty space for alignment */}
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2022</h3>
                    <p className="text-gray-600">Creación de nuestra división de Nuevas Tecnologías, enfocada en startups y empresas tecnológicas.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* 2024 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2024"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2024</h3>
                    <p className="text-gray-600">Apertura de nuestra oficina en Toulouse y reconocimiento como uno de los despachos más innovadores de Europa.</p>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    {/* Empty space for alignment */}
                  </div>
                </div>
              </motion.div>
              
              {/* 2025 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                data-year="2025"
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#00b1ed] z-10 timeline-dot"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    {/* Empty space for alignment */}
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2025</h3>
                    <p className="text-gray-600">Actualmente, seguimos creciendo y transformando el sector legal con nuestro enfoque humano y cercano.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Historia;
