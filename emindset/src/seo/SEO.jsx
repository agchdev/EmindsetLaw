import React from 'react';
import { Helmet } from 'react-helmet';
import { siteMetadata, pageMetadata } from './metadata';

/**
 * Componente SEO para gestionar metadatos y etiquetas SEO en toda la web
 * @param {Object} props - Propiedades del componente
 * @param {string} props.page - Página actual (home, about, services, etc.)
 * @param {string} props.title - Título personalizado (opcional)
 * @param {string} props.description - Descripción personalizada (opcional)
 * @param {string} props.image - Imagen OG personalizada (opcional)
 * @param {string} props.url - URL canónica personalizada (opcional)
 */
const SEO = ({ page = 'home', title, description, image, url }) => {
  // Obtener metadatos de la página actual o usar los valores por defecto
  const pageData = pageMetadata[page] || pageMetadata.home;
  
  // Usar valores personalizados si se proporcionan, o los valores predeterminados
  const metaTitle = title || pageData.title;
  // Siempre añadir EmindsetLaw al título de la página
  const formattedTitle = `${metaTitle} | EmindsetLaw`;
  const metaDescription = description || pageData.description;
  const metaImage = image || pageData.ogImage;
  const canonicalUrl = url || pageData.canonicalUrl;
  
  // Construir URL completa para la imagen OG
  const ogImageUrl = `${siteMetadata.siteUrl}${metaImage}`;
  // Construir URL canónica completa
  const fullCanonicalUrl = `${siteMetadata.siteUrl}${canonicalUrl}`;
  
  return (
    <Helmet>
      {/* Etiquetas básicas */}
      <html lang={siteMetadata.language} />
      <title>{formattedTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Etiquetas de favicon y tema */} 
      <meta name="theme-color" content={siteMetadata.themeColor} />
      
      {/* Etiquetas Open Graph para compartir en redes sociales */}
      <meta property="og:type" content={siteMetadata.type} />
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:locale" content={siteMetadata.locale} />
      
      {/* Etiquetas Twitter Card */}
      <meta name="twitter:card" content={siteMetadata.twitterCardType} />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Etiquetas de palabras clave */}
      <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
      
      {/* Etiquetas para robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Schema.org JSON-LD para SEO estructurado */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          name: siteMetadata.organization.name,
          url: siteMetadata.organization.url,
          logo: `${siteMetadata.siteUrl}${siteMetadata.organization.logo}`,
          description: metaDescription,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteMetadata.organization.streetAddress,
            addressLocality: siteMetadata.organization.addressLocality,
            postalCode: siteMetadata.organization.postalCode,
            addressCountry: siteMetadata.organization.addressCountry
          },
          telephone: siteMetadata.organization.telephone,
          email: siteMetadata.organization.email,
          sameAs: [
            'https://www.linkedin.com/company/emindsetlaw',
            'https://twitter.com/emindsetlaw',
            'https://www.instagram.com/emindsetlaw'
          ],
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
            ],
            opens: '09:00',
            closes: '19:00'
          },
          priceRange: '$$',
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 40.4168,
              longitude: -3.7038
            },
            geoRadius: '50000'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Servicios Legales',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Derecho Mercantil y Societario',
                  description: 'Asesoramiento integral en constitución de empresas, pactos de socios, fusiones y adquisiciones, y reestructuraciones corporativas.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Real Estate',
                  description: 'Asesoramiento legal en compraventa de inmuebles, arrendamientos, promociones inmobiliarias, due diligence y contratos de construcción.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Nuevas Tecnologías',
                  description: 'Asesoramiento legal en propiedad intelectual, e-commerce, contratos tecnológicos, startups y financiación de proyectos innovadores.'
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
