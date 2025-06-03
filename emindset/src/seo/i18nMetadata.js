import { useTranslation } from 'react-i18next';

/**
 * Hook personalizado para obtener metadatos SEO traducidos según el idioma actual
 * @param {string} page - La página actual para la que se necesitan los metadatos
 * @returns {Object} Objeto con título y descripción traducidos
 */
export const useI18nMetadata = (page) => {
  const { t, i18n } = useTranslation();
  
  // Obtener los metadatos traducidos
  const getPageMetadata = () => {
    if (!page) return null;
    
    try {
      return {
        title: t(`metadata.pages.${page}.title`),
        description: t(`metadata.pages.${page}.description`),
      };
    } catch (error) {
      console.error(`Error al cargar metadatos para la página ${page}:`, error);
      return null;
    }
  };
  
  // Obtener los metadatos del sitio traducidos
  const getSiteMetadata = () => {
    try {
      return {
        title: t('metadata.site.title'),
        description: t('metadata.site.description'),
        keywords: t('metadata.site.keywords', { returnObjects: true }).join(', '),
        language: i18n.language,
        locale: i18n.language === 'es' ? 'es_ES' : 
                i18n.language === 'en' ? 'en_US' : 
                i18n.language === 'fr' ? 'fr_FR' : 
                i18n.language === 'ca' ? 'ca_ES' : 'es_ES',
      };
    } catch (error) {
      console.error('Error al cargar metadatos del sitio:', error);
      return null;
    }
  };
  
  return {
    pageMetadata: getPageMetadata(),
    siteMetadata: getSiteMetadata(),
  };
};
