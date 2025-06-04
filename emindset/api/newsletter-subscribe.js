import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Middleware para habilitar CORS
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);
};

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

// Función principal que maneja la solicitud
const handler = async (req, res) => {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

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
};

// Exportar la función con middleware CORS
export default allowCors(handler);
