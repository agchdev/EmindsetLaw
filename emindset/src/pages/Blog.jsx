import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faComment, faSearch, faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Componente para cada artículo del blog
const BlogPost = ({ title, excerpt, image, date, author, linkedinUrl, delay, isVisible }) => {
  return (
    <div 
      className={`bg-white rounded-md shadow-md overflow-hidden transition-all duration-1000 transform hover:shadow-xl group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-0 left-0 bg-[#00b1ed] text-white text-xs font-medium px-3 py-1 flex items-center">
          <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
          LinkedIn
        </div>
      </div>
      <div className="p-6 relative">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-[#00b1ed]/0 transition-all duration-500 group-hover:border-[#00b1ed]/20"></div>
        
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <span className="flex items-center mr-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {date}
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-1" />
            {author}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#00b1ed] transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{excerpt}</p>
        
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#00b1ed] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300"
        >
          Leer en LinkedIn
          <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 text-xs" />
        </a>
      </div>
    </div>
  );
};

// Componente para la barra lateral
const Sidebar = ({ isVisible }) => {
  return (
    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Buscador */}
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Buscar</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar artículos..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#00b1ed]/50 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00b1ed]">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      
      {/* Categorías */}
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Categorías</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-gray-600 hover:text-[#00b1ed] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#00b1ed] rounded-full mr-2"></span>
              Derecho Mercantil
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-[#00b1ed] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#00b1ed] rounded-full mr-2"></span>
              Real Estate
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-[#00b1ed] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#00b1ed] rounded-full mr-2"></span>
              Nuevas Tecnologías
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-[#00b1ed] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#00b1ed] rounded-full mr-2"></span>
              Actualidad Legal
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-[#00b1ed] transition-colors flex items-center">
              <span className="w-2 h-2 bg-[#00b1ed] rounded-full mr-2"></span>
              Eventos
            </a>
          </li>
        </ul>
      </div>
      
      {/* Posts recientes */}
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Posts recientes</h3>
        <div className="space-y-4">
          <a href="#" className="flex group">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden mr-3">
              <img src="https://via.placeholder.com/64" alt="Post reciente" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#00b1ed] transition-colors line-clamp-2">Novedades en la legislación de protección de datos</h4>
              <p className="text-xs text-gray-500 mt-1">Mayo 15, 2025</p>
            </div>
          </a>
          <a href="#" className="flex group">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden mr-3">
              <img src="https://via.placeholder.com/64" alt="Post reciente" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#00b1ed] transition-colors line-clamp-2">Claves para entender el mercado inmobiliario en 2025</h4>
              <p className="text-xs text-gray-500 mt-1">Mayo 10, 2025</p>
            </div>
          </a>
          <a href="#" className="flex group">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden mr-3">
              <img src="https://via.placeholder.com/64" alt="Post reciente" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#00b1ed] transition-colors line-clamp-2">Impacto de la IA en el sector legal</h4>
              <p className="text-xs text-gray-500 mt-1">Mayo 5, 2025</p>
            </div>
          </a>
        </div>
      </div>
      
      {/* LinkedIn CTA */}
      <div className="bg-gradient-to-r from-[#00b1ed] to-[#003673] rounded-md shadow-md p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"></div>
        <h3 className="text-lg font-bold mb-3 relative z-10">Síguenos en LinkedIn</h3>
        <p className="text-sm text-white/80 mb-4 relative z-10">Mantente al día con todas nuestras publicaciones y novedades del sector legal.</p>
        <a 
          href="https://www.linkedin.com/company/emindset-law-firm/?originalSubdomain=ad" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-white text-[#00b1ed] text-sm font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors relative z-10"
        >
          <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
          Visitar perfil
        </a>
      </div>
    </div>
  );
};

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Usar datos de ejemplo directamente para evitar problemas de conexión
  useEffect(() => {
    // Simulamos un tiempo de carga
    const timer = setTimeout(() => {
      // Datos de ejemplo
      const mockPosts = [
        {
          id: 1,
          title: "Las claves del éxito en operaciones inmobiliarias transfronterizas",
          excerpt: "Analizamos los aspectos legales más importantes a tener en cuenta en las operaciones inmobiliarias entre España y Andorra, con especial atención a la fiscalidad y normativa aplicable.",
          image: "https://via.placeholder.com/600x300",
          date: "Mayo 20, 2025",
          author: "Oriol Giró",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        },
        {
          id: 2,
          title: "Novedades legislativas en el ámbito de las criptomonedas",
          excerpt: "Repasamos las últimas actualizaciones normativas que afectan al sector de las criptomonedas y activos digitales, con foco en las implicaciones para inversores y empresas.",
          image: "https://via.placeholder.com/600x300",
          date: "Mayo 15, 2025",
          author: "María Rodríguez",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        },
        {
          id: 3,
          title: "La importancia de la due diligence en fusiones y adquisiciones",
          excerpt: "Explicamos por qué un proceso de due diligence exhaustivo es fundamental para el éxito de cualquier operación de fusión o adquisición empresarial.",
          image: "https://via.placeholder.com/600x300",
          date: "Mayo 10, 2025",
          author: "Carlos Martínez",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        },
        {
          id: 4,
          title: "Protección de datos en entornos empresariales: nuevos retos",
          excerpt: "Analizamos los desafíos actuales en materia de protección de datos para las empresas y ofrecemos recomendaciones prácticas para garantizar el cumplimiento normativo.",
          image: "https://via.placeholder.com/600x300",
          date: "Mayo 5, 2025",
          author: "Ana López",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        },
        {
          id: 5,
          title: "Claves para entender la nueva ley de startups",
          excerpt: "Desglosamos los aspectos más relevantes de la nueva legislación para empresas emergentes y su impacto en el ecosistema emprendedor.",
          image: "https://via.placeholder.com/600x300",
          date: "Abril 28, 2025",
          author: "Oriol Giró",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        },
        {
          id: 6,
          title: "Aspectos legales a considerar en la expansión internacional",
          excerpt: "Repasamos los principales retos jurídicos que enfrentan las empresas en sus procesos de internacionalización y cómo abordarlos de manera efectiva.",
          image: "https://via.placeholder.com/600x300",
          date: "Abril 20, 2025",
          author: "María Rodríguez",
          linkedinUrl: "https://www.linkedin.com/company/emindset-law-firm/"
        }
      ];
      
      setLinkedinPosts(mockPosts);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 bg-gray-50">
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-r from-[#00b1ed] to-[#003673] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-10"></div>
            <p className="text-xl text-white/90 leading-relaxed">
              Mantente al día con las últimas novedades del sector legal, 
              artículos de interés y actualizaciones de nuestro equipo.
            </p>
          </div>
        </div>
      </section>
      

      {/* Blog content section */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog posts */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-[#00b1ed] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Cargando publicaciones de LinkedIn...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {linkedinPosts.map((post, index) => (
                    <BlogPost 
                      key={post.id}
                      {...post}
                      delay={300 + (index * 150)}
                      isVisible={isVisible}
                    />
                  ))}
                  
                  {/* Paginación */}
                  <div className={`flex justify-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex space-x-2">
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-[#00b1ed] hover:text-white transition-colors">
                        1
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-[#00b1ed] hover:text-white transition-colors">
                        2
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-[#00b1ed] text-white">
                        3
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-[#00b1ed] hover:text-white transition-colors">
                        4
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-[#00b1ed] hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar isVisible={isVisible} />
            </div>
          </div>
        </div>
      </section>
      
      {/* LinkedIn CTA section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <FontAwesomeIcon icon={faLinkedin} className="text-4xl text-[#0077b5] mb-6" />
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
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
              Visitar nuestro perfil de LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
