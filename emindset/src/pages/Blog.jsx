import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SeoHelmet from '../seo/SeoHelmet';

const Blog = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  
  // Simular la carga de datos de blog específicos basados en el slug
  useEffect(() => {
    // En un caso real, aquí se haría una llamada API para obtener los datos del blog
    // basados en el slug, pero para este ejemplo usaremos datos de muestra
    setIsLoading(true);
    
    // Simulamos una carga asíncrona
    setTimeout(() => {
      // Datos de ejemplo - en implementación real, estos vendrían de una API
      const postData = {
        title: `Artículo de blog: ${slug}`,
        date: "2025-05-20",
        author: "Emindset Law",
        content: `Este es el contenido del artículo ${slug}. En una implementación real, este contenido vendría de una base de datos o API.`,
        image: "https://via.placeholder.com/1200x600"
      };
      
      setBlogData(postData);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-t-[#00b1ed] border-r-[#00b1ed] border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800">Artículo no encontrado</h1>
            <p className="mt-4 text-gray-600">Lo sentimos, el artículo que estás buscando no está disponible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      {/* SEO Metadata */}
      <SeoHelmet 
        page="blog_post" 
        customTitle={blogData.title} 
        customDescription={blogData.content.substring(0, 160)} 
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00b1ed] to-[#0077b5] py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{blogData.title}</h1>
          <div className="text-white/90 flex items-center justify-center space-x-4">
            <span>{blogData.author}</span>
            <span>•</span>
            <span>{new Date(blogData.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {blogData.image && (
            <img 
              src={blogData.image} 
              alt={blogData.title}
              className="w-full h-auto rounded-lg shadow-md mb-8"
            />
          )}
          
          <div className="prose prose-lg max-w-none">
            <p>{blogData.content}</p>
          </div>
          
          {/* Tags o categorías (opcional) */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Legal</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Emindset</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Derecho</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
