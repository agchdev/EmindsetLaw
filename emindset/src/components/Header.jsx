import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const headerRef = useRef(null);
  
  const navLinks = [
    { name: 'Quienes somos', url: '/quienes-somos' },
    { name: 'Soluciones', url: '#' },
    { name: 'Historia', url: '#' },
    { name: 'Reconocimientos', url: '/reconocimientos' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contactar', url: '#contact' },
  ];

  // Initial load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle scroll effect for the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5 md:py-8'} ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 transform transition-transform duration-500 hover:scale-105">
            <a href="#" className="block">
              <div className="relative overflow-hidden">
                <img 
                  src={logo} 
                  alt="Emindset Law Logo" 
                  className={`h-10 md:h-12 transition-all duration-500 ${isScrolled ? 'filter-none' : 'filter brightness-0 invert'}`} 
                />
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1579a2] transform scale-x-0 origin-left transition-transform duration-500 ${isScrolled ? 'group-hover:scale-x-100' : 'group-hover:scale-x-0'}`}></div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className={`group relative px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 overflow-hidden ${isScrolled ? 'text-gray-700 hover:text-[#1579a2]' : 'text-white/90 hover:text-white'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover effect - different for scrolled vs transparent */}
                {isScrolled ? (
                  // Underline effect for scrolled state
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1579a2]/70 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                ) : (
                  // Highlight effect for transparent state
                  <span className="absolute inset-0 bg-white/10 rounded-sm transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 -z-10"></span>
                )}
              </a>
            ))}
            
            {/* Contact Button */}
            <a 
              href="#"
              className={`ml-4 px-5 py-2 text-sm transition-all duration-300 border ${isScrolled ? 'border-[#1579a2] text-[#1579a2] hover:bg-[#1579a2] hover:text-white' : 'border-white/70 text-white hover:bg-white/10'}`}
            >
              Contactar
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className={`focus:outline-none transition-colors duration-300 ${isScrolled ? 'text-[#1579a2]' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'} top-3`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ${isScrolled ? 'bg-[#1579a2]' : 'bg-white'} ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      
      <div 
        className={`md:hidden fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-20 px-6 h-full overflow-y-auto">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className="transform transition-all duration-300 text-gray-800 hover:text-[#1579a2] text-lg font-light flex items-center justify-between border-b border-gray-100 pb-4"
                style={{ 
                  transitionDelay: isMenuOpen ? `${150 + index * 75}ms` : '0ms',
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)' 
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1579a2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
            
            {/* Mobile contact button */}
            <div 
              className="mt-8 pt-4" 
              style={{ 
                transitionDelay: isMenuOpen ? '500ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)' 
              }}
            >
              <a 
                href="#"
                className="block w-full py-3 text-center bg-[#1579a2] text-white transition-all duration-300 hover:bg-[#1579a2]/90"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactar ahora
              </a>
            </div>
            
            {/* Social media icons for mobile */}
            <div 
              className="flex space-x-6 justify-center items-center pt-6 mt-auto"
              style={{ 
                transitionDelay: isMenuOpen ? '600ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              <a href="#" className="text-gray-400 hover:text-[#1579a2] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1579a2] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1579a2] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Close button for mobile menu */}
        <button 
          className="absolute top-6 right-6 text-gray-500 hover:text-[#1579a2] transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header