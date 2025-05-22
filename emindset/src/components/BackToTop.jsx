import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando el usuario baja 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-secondary hover:bg-secondary-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Volver arriba"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
