import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cors from 'cors';

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
};

// Exportar la función con middleware CORS
export default allowCors(handler);
