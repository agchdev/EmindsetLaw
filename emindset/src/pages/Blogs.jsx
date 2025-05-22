import React, { useEffect, useRef, useState } from 'react';

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Store the current value of the ref
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Use the stored ref value in the cleanup
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page title is handled by the router */}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#00b1ed] to-[#0077b5] py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Blog</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Mantente al día con las últimas noticias y publicaciones de nuestro equipo
          </p>
        </div>
      </div>

      {/* LinkedIn Feed Section */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-bold text-center mb-12">Nuestras Publicaciones en LinkedIn</h2>
            
            {/* Elfsight LinkedIn Feed Widget */}
            <div className="elfsight-app-b4f07965-9c6a-470c-af2b-58cfc6c1611a" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* LinkedIn CTA section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Conéctate con nosotros en LinkedIn</h2>
            <p className="text-gray-600 mb-8">
              Síguenos en LinkedIn para estar al día de todas nuestras publicaciones, eventos y novedades del sector legal.
            </p>
            <a 
              href="https://www.linkedin.com/company/emindset-law-firm/?originalSubdomain=ad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#0077b5] text-white font-medium px-6 py-3 rounded-full hover:bg-[#00669c] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Visitar nuestro perfil de LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
