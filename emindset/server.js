const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Variables de entorno para la API de LinkedIn
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;

// Ruta para iniciar el proceso de autenticaciu00f3n con LinkedIn
app.get('/api/linkedin/auth', (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=r_liteprofile%20r_emailaddress%20w_member_social%20r_organization_social`;
  res.redirect(authUrl);
});

// Ruta para intercambiar el cu00f3digo de autorizaciu00f3n por un token de acceso
app.post('/api/linkedin/token', async (req, res) => {
  try {
    const { code } = req.body;
    
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_REDIRECT_URI
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al obtener el token de acceso' });
  }
});

// Ruta para obtener los posts de la empresa en LinkedIn
app.get('/api/linkedin/company-posts', async (req, res) => {
  try {
    const { accessToken } = req.query;
    const companyId = req.query.companyId || 'emindset-law-firm';
    const limit = req.query.limit || 10;
    
    // Obtener el ID numu00e9rico de la empresa a partir de su vanity name
    const companyResponse = await axios.get(
      `https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=${companyId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    // Extraer el ID numu00e9rico de la empresa
    const companyNumericId = companyResponse.data.elements[0].id;
    
    // Obtener los posts de la empresa
    const postsResponse = await axios.get(
      `https://api.linkedin.com/v2/shares?q=owners&owners=${companyNumericId}&count=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    res.json(postsResponse.data);
  } catch (error) {
    console.error('Error al obtener los posts de LinkedIn:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al obtener los posts de LinkedIn' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutu00e1ndose en http://localhost:${PORT}`);
});
