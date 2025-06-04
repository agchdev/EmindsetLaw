import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configuración CORS para permitir peticiones desde el servidor de desarrollo
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'https://emindset.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));
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

// Configurar el transportador de Nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Ruta para manejar el formulario de contacto
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || !message) {
      return res.status(400).json({ error: 'Por favor complete todos los campos requeridos' });
    }

    // Enviar correo con los datos del formulario de contacto
    await transporter.sendMail({
      from: `"EmindsetLaw" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Servicio:</strong> ${service}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3182ce;">${message}</p>
        </div>
      `
    });

    // Enviar confirmación al usuario
    await transporter.sendMail({
      from: `"EmindsetLaw" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Hemos recibido tu mensaje - EmindsetLaw',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://emindset.vercel.app/logo.png" alt="EmindsetLaw Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50;">Gracias por contactar con nosotros</h2>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
          <p>Mientras tanto, puedes visitar nuestra web para obtener más información sobre nuestros servicios.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
            <p>&copy; ${new Date().getFullYear()} EmindsetLaw. Todos los derechos reservados.</p>
          </div>
        </div>
      `
    });

    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el mensaje de contacto:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

// Ruta para manejar las suscripciones al newsletter
app.post('/api/newsletter-subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    // Enviar correo de confirmación al usuario
    await transporter.sendMail({
      from: `"EmindsetLaw" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Confirmación de suscripción al boletín informativo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://emindset.vercel.app/logo.png" alt="EmindsetLaw Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50;">¡Gracias por suscribirte!</h2>
          <p>Has sido registrado correctamente en nuestro boletín informativo. Pronto recibirás noticias, artículos y actualizaciones legales.</p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo electrónico.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #777;">© ${new Date().getFullYear()} EmindsetLaw. Todos los derechos reservados.</p>
          </div>
        </div>
      `
    });
    
    // Enviar notificación al administrador
    await transporter.sendMail({
      from: `"EmindsetLaw Newsletter" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: 'Nueva suscripción al newsletter',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>Nueva suscripción al newsletter</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    
    res.status(200).json({ success: true, message: 'Suscripción exitosa' });
  } catch (error) {
    console.error('Error en la suscripción al newsletter:', error);
    res.status(500).json({ error: 'Error al procesar la suscripción' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
