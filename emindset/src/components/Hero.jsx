import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlayCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import heroVideo from '../assets/video.mp4';
import logoEmindset from '../assets/img/logoEmindset.png';
const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Capa base de oscurecimiento */}
        <div className="absolute inset-0 bg-black opacity-10 z-1"></div>
        {/* Capa adicional para mejorar visibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-2"></div>
        {/* <img src={heroImage} 
             alt="Oficina moderna" 
              /> */}
      </div>
      <div className="relative pt-20 pb-32 md:pt-28 md:pb-40 text-gray-800 z-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl animate-fade-in" role="region" aria-label="Sección Hero - Bienvenida">
            <h1 className="sr-only">Bienvenidos a Emindset</h1>
            
            <h1 className="mb-8 leading-tight text-white">
              <div className="flex justify-start items-center">
                <img 
                  src={logoEmindset} 
                  alt="Emindset Law Logo" 
                  className="w-auto h-20 md:h-28 lg:h-32 animate-fade-in"
                />
              </div>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-lg">
              Referentes en derecho mercantil, real estate y nuevas tecnologías.<br />
              <span className="inline-block mt-2 text-base text-white/80">Soluciones ágiles, innovadoras y a tu medida.</span>
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#budget" className="btn-hover inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-4 hover:bg-primary-dark transition-all duration-300 group">
                PIDE PRESUPUESTO <FontAwesomeIcon icon={faArrowRight} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#about" className="btn-hover inline-flex items-center justify-center text-primary font-semibold px-6 py-3.5 hover:bg-[#003673]/10 transition-all duration-300 group">
                <FontAwesomeIcon icon={faPlayCircle} className="mr-3" /> CONÓCENOS
              </a>
            </div>
          </div>
        </div>
        {/* Decorative SVG wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
          <svg className="w-[102%] -ml-[1%] h-24 md:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" fillOpacity="1" d="M0,80 C360,120 1080,40 1440,80 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>
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