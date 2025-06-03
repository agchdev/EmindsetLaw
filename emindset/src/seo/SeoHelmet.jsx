import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18nMetadata } from './i18nMetadata';

/**
 * Componente que gestiona los metadatos SEO de las pu00e1ginas con soporte multilingu00fce
 * @param {Object} props - Propiedades del componente
 * @param {string} props.page - Identificador de la pu00e1gina actual (home, about, services, etc.)
 * @param {string} props.canonicalPath - Ruta canu00f3nica de la pu00e1gina (opcional)
 * @param {string} props.ogImage - Ruta de la imagen para Open Graph (opcional)
 * @returns {JSX.Element} Componente Helmet con metadatos SEO
 */
const SeoHelmet = ({ page, canonicalPath = null, ogImage = null }) => {
  // Obtener metadatos traducidos
  const { pageMetadata, siteMetadata } = useI18nMetadata(page);
  
  if (!pageMetadata || !siteMetadata) {
    console.error('No se pudieron cargar los metadatos para:', page);
    return null;
  }
  
  // URL base del sitio
  const siteUrl = 'https://www.emindsetlaw.com';
  
  // Construir URL canónica
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : `${siteUrl}${
    page === 'home' ? '/' : `/${page}`
  }`;
  
  // Imagen para Open Graph
  const ogImageUrl = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-${page}.jpg`;

  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{pageMetadata.title}</title>
      <meta name="description" content={pageMetadata.description} />
      <meta name="keywords" content={siteMetadata.keywords} />
      
      {/* Configuración de idioma */}
      <html lang={siteMetadata.language} />
      
      {/* Enlaces canónicos */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageMetadata.title} />
      <meta property="og:description" content={pageMetadata.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={siteMetadata.locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageMetadata.title} />
      <meta name="twitter:description" content={pageMetadata.description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};

export default SeoHelmet;
