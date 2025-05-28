import React, { useRef, useState, useEffect, useCallback } from 'react';
import './testimonials.css'; // We'll create this file next

const Testimonials = () => {
  const ref = useRef(null);
  const testimonialContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Marc Taló',
      position: 'CEO de Grup Bomosa',
      text: "Un servei excel·lent i molt professional. Estem molt contents amb la seva atenció i resultats."
    },
    {
      id: 2,
      name: 'Fernando Mas',
      position: 'CEO de MP Gestió',
      text: "Sens dubte un equip d'advocats molt professionals i atents, amb un molt alt nivell resolutiu i disposats en tot moment en ajudar-te i assessorar-te en qualsevol dubte legal, ja són anys els que compto amb la seva ajuda i sempre amb un grau de satisfacció d'alt nivell"
    },
    {
      id: 3,
      name: 'Rafael Rabat',
      position: 'CEO de Norz Patrimonia',
      text: "Portem temps treballant amb l'equip d'Emindset Law i n'avalo la qualitat i professionalitat"
    },
    {
      id: 4,
      name: 'Sergi Martin',
      position: 'CEO de Altment Capital',
      text: "Emindset combina confiança i rigorositat a parts iguals. Amb una alta professionalitat, el seu equip ofereix solucions legals precises i eficaces, sempre amb un tracte empàtic i proper que porten a una atenció personalitzada. I tot, amb un aire fresc en la manera de treballar, amb una visió moderna i proactiva del dret."
    }
  ];

  const nextTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPreviousIndex(currentIndex);
      setSlideDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, testimonials.length, currentIndex]);

  const prevTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPreviousIndex(currentIndex);
      setSlideDirection('left');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, testimonials.length, currentIndex]);
  
  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next
      nextTestimonial();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous
      prevTestimonial();
    }
  };
  
  // Handle wheel events for scrolling
  const handleWheel = useCallback((e) => {
    // Prevent default scrolling behavior
    e.preventDefault();
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30 && !isAnimating) {
        nextTestimonial();
      } else if (e.deltaX < -30 && !isAnimating) {
        prevTestimonial();
      }
    } else {
      if (e.deltaY > 30 && !isAnimating) {
        nextTestimonial();
      } else if (e.deltaY < -30 && !isAnimating) {
        prevTestimonial();
      }
    }
  }, [isAnimating, nextTestimonial, prevTestimonial]);
  
  // Add and remove event listeners
  useEffect(() => {
    const container = testimonialContainerRef.current;
    if (container) {
      // Use non-passive event listener to allow preventDefault
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  const goToTestimonial = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setPreviousIndex(currentIndex);
      // Determine slide direction based on index change
      setSlideDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-gray-700 mb-4">TESTIMONIOS</span>
          <h2 className="text-3xl md:text-4xl text-gray-700 font-bold mb-4">Algunas palabras de <span className="text-primary">clientes satisfechos</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Descubre lo que nuestros clientes dicen sobre nuestra dedicación y excelencia en el servicio legal.</p>
        </div>

        <div className="max-w-3xl mx-auto pb-16 flex items-center relative " ref={testimonialContainerRef}>
          {/* Side buttons */}
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 -ml-22 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary z-10"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div 
            className="testimonial-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Current testimonial */}
            <div 
              className={`testimonial-card bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-primary ${
                isAnimating 
                  ? `slide-in-${slideDirection === 'right' ? 'right' : 'left'}`
                  : ''
              }`}
            >
              <div className="testimonial-content">
                <p className="testimonial-text text-gray-900 italic text-lg">"{testimonial.text}"</p>
                <div className="testimonial-author flex items-center">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-xl">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-900">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Previous testimonial (for animation) */}
            {isAnimating && (
              <div 
                className={`testimonial-card bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-primary slide-out-${slideDirection === 'right' ? 'left' : 'right'}`}
              >
                <div className="testimonial-content">
                  <p className="testimonial-text text-gray-900 italic text-lg">"{testimonials[previousIndex].text}"</p>
                  <div className="testimonial-author flex items-center">
                    <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold text-xl">{testimonials[previousIndex].name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonials[previousIndex].name}</h4>
                      <p className="text-sm text-gray-900">{testimonials[previousIndex].position}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={nextTestimonial} 
            className="absolute right-0 -mr-22 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary z-10"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 w-2 rounded-full focus:outline-none transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
