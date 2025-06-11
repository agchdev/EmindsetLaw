import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Publicaciones simuladas de Instagram con imágenes de Unsplash relacionadas con derecho
const instagramPosts = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Servicios legales especializados para empresas tecnológicas. Ofrecemos asesoramiento integral adaptado a los nuevos retos digitales #LegalTech #Emindset #Derecho',
    likes: 45,
    date: '2025-05-20'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Asesoría legal especializada en blockchain y criptomonedas. Ayudamos a empresas a navegar el complejo marco regulatorio del sector #Blockchain #Crypto #DerechoDigital',
    likes: 38,
    date: '2025-05-15'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Ventajas fiscales para empresas innovadoras. Descubre cómo optimizar la tributación de tu startup tecnológica #Fiscal #Innovación #Startups',
    likes: 62,
    date: '2025-05-10'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1607703703674-df96af81dffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Protección de datos en la era digital. Implementamos estrategias para garantizar el cumplimiento del RGPD y otras normativas #RGPD #Privacidad #Compliance',
    likes: 55,
    date: '2025-05-05'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Nuestro equipo en la feria internacional de derecho tecnológico de Madrid. Compartiendo conocimiento y creando nuevas oportunidades #EmindsetTeam #LegalTech',
    likes: 73,
    date: '2025-05-01'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Tips legales para startups: Cómo proteger tu propiedad intelectual desde las primeras etapas #Emprendimiento #PropiedadIntelectual #Negocios',
    likes: 48,
    date: '2025-04-25'
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Charla online gratuita: "Aspectos legales del e-commerce". Inscripciones abiertas en nuestra web #Ecommerce #FormacionLegal',
    likes: 41,
    date: '2025-04-20'
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Nueva normativa sobre inteligencia artificial y su impacto en el ámbito empresarial #IA #Regulación #Empresas',
    likes: 60,
    date: '2025-04-15'
  },
  {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    caption: 'Ampliamos nuestro equipo con nuevos especialistas en derecho de las telecomunicaciones #EmindsetLaw #Empleo #Telecomunicaciones',
    likes: 52,
    date: '2025-04-10'
  }
];

const InstagramFeed = ({ className = '' }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular la carga de datos de Instagram
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mostrar solo 6 publicaciones para mantener el diseño compacto
      setPosts(instagramPosts.slice(0, 6));
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`instagram-feed-container ${className}`}>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-t-[#833AB4] border-r-[#FD1D1D] border-b-[#FCAF45] border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Grid de publicaciones de Instagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {posts.map(post => (
              <div key={post.id} className="instagram-post overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <a 
                  href="https://www.instagram.com/emindsetlaw/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative pb-[100%] bg-gray-100"> {/* Aspect ratio 1:1 */}
                    <img 
                      src={post.imageUrl} 
                      alt={`Instagram post by Emindset Law`} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center text-sm text-gray-700 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{post.caption}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4 mb-6 italic">Las publicaciones mostradas son representativas. Visita nuestro Instagram para ver todas las publicaciones.</p>
          
          {/* Enlace directo a Instagram */}
          <div className="text-center mt-6">
            <a 
              href="https://www.instagram.com/emindsetlaw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {t('blog.visitInstagram') || 'Visitar nuestro Instagram'}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default InstagramFeed;
