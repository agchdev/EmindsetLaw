import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlayCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../assets/img/hero.jpeg';

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black"></div>
        <img src={heroImage} 
             alt="Oficina moderna" 
             className="w-full h-full object-cover bg-red-500 opacity-[0.5]" />
      </div>
      <div className="relative pt-20 pb-32 md:pt-28 md:pb-40 text-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl animate-fade-in" role="region" aria-label="Sección Hero - Bienvenida">
            <h1 className="sr-only">Bienvenidos a Emindset</h1>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
              <span className="text-gradient">EMINDSET</span><br />
              <span className="underline-animation">LAW</span>
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
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-10 h-10 rounded-full bg-primary/5 floating shadow-sm" style={{animationDelay: '0.2s'}}></div>
      <div className="absolute top-1/3 right-20 w-14 h-14 rounded-full bg-primary/10 floating shadow-md" style={{animationDelay: '0.4s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 rounded-full bg-primary/15 floating" style={{animationDelay: '0.6s'}}></div>
      <div className="absolute bottom-32 right-1/3 w-6 h-6 rounded-full bg-primary/20 floating" style={{animationDelay: '0.8s'}}></div>
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