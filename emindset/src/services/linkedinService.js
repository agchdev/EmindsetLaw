import axios from 'axios';

// Configuración de la API de LinkedIn
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
const LINKEDIN_COMPANY_ID = 'emindset-law-firm';

// Token de acceso (en producción, esto vendría de un proceso de autenticación OAuth)
let accessToken = null;

/**
 * Inicializa el servicio de LinkedIn con un token de acceso
 * @param {string} token - Token de acceso a la API de LinkedIn
 */
export const initLinkedInService = (token) => {
  accessToken = token;
};

/**
 * Obtiene los posts mu00e1s recientes de la empresa en LinkedIn
 * @param {number} limit - Nu00famero mu00e1ximo de posts a obtener
 * @returns {Promise<Array>} - Array de posts
 */
export const getCompanyPosts = async (limit = 10) => {
  try {
    // Verificar si tenemos un token de acceso
    if (!accessToken) {
      console.error('No hay token de acceso disponible para la API de LinkedIn');
      return [];
    }
    
    // Obtener el ID numu00e9rico de la empresa a partir de su vanity name
    const companyResponse = await axios.get(
      `${LINKEDIN_API_URL}/organizations?q=vanityName&vanityName=${LINKEDIN_COMPANY_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    // Extraer el ID numu00e9rico de la empresa
    const companyId = companyResponse.data.elements[0].id;
    
    // Obtener los posts de la empresa
    const postsResponse = await axios.get(
      `${LINKEDIN_API_URL}/shares?q=owners&owners=${companyId}&count=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    // Procesar y formatear los posts
    const posts = postsResponse.data.elements.map(post => {
      // Extraer la informaciu00f3n relevante del post
      const { id, created: { time }, text, owner } = post;
      
      // Formatear la fecha
      const date = new Date(time);
      const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Extraer la imagen si existe
      let image = 'https://via.placeholder.com/600x300';
      if (post.content && post.content.contentEntities && post.content.contentEntities.length > 0) {
        const media = post.content.contentEntities[0];
        if (media.thumbnails && media.thumbnails.length > 0) {
          image = media.thumbnails[0].url;
        }
      }
      
      // Crear un objeto con la informaciu00f3n del post
      return {
        id,
        title: text.length > 60 ? `${text.substring(0, 60)}...` : text,
        excerpt: text.length > 150 ? `${text.substring(0, 150)}...` : text,
        image,
        date: formattedDate,
        author: owner.name,
        linkedinUrl: `https://www.linkedin.com/feed/update/${id}`
      };
    });
    
    return posts;
  } catch (error) {
    console.error('Error al obtener los posts de LinkedIn:', error);
    
    // En caso de error, devolver un array vacu00edo
    return [];
  }
};

/**
 * Obtiene informaciu00f3n bu00e1sica de la empresa en LinkedIn
 * @returns {Promise<Object>} - Informaciu00f3n de la empresa
 */
export const getCompanyInfo = async () => {
  try {
    // Verificar si tenemos un token de acceso
    if (!accessToken) {
      console.error('No hay token de acceso disponible para la API de LinkedIn');
      return null;
    }
    
    // Obtener informaciu00f3n de la empresa
    const response = await axios.get(
      `${LINKEDIN_API_URL}/organizations?q=vanityName&vanityName=${LINKEDIN_COMPANY_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    // Extraer la informaciu00f3n relevante
    const company = response.data.elements[0];
    
    return {
      id: company.id,
      name: company.name,
      description: company.description,
      logoUrl: company.logoUrl,
      websiteUrl: company.websiteUrl,
      industry: company.industry,
      location: company.locations && company.locations.length > 0 ? company.locations[0].address.city : ''
    };
  } catch (error) {
    console.error('Error al obtener informaciu00f3n de la empresa en LinkedIn:', error);
    return null;
  }
};
