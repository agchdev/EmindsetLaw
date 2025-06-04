const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  const { nombre, empresa, email, mensaje } = req.body;
  
  if (!nombre || !empresa || !email) {
    return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos obligatorios.' });
  }
  
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de contacto de ${nombre} - EmindsetLaw`,
      html: `
        <h2>Nuevo mensaje de contacto desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
        <hr>
        <p>Este mensaje fue enviado desde el formulario de contacto de EmindsetLaw.</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Hemos recibido tu mensaje - EmindsetLaw',
      html: `
        <h2>Gracias por contactar con EmindsetLaw</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
        <p>Mientras tanto, si tienes alguna consulta urgente, puedes contactarnos directamente al teléfono +376 678 882.</p>
        <hr>
        <p>EmindsetLaw - Soluciones legales con un enfoque humano</p>
      `
    };
    
    await transporter.sendMail(confirmationMailOptions);
    
    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.' });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter-subscribe', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Por favor, proporcione una dirección de correo electrónico.' });
  }

  try {
    // Email options for confirmation to user
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Gracias por suscribirte a nuestra newsletter - EmindsetLaw',
      html: `
        <h2>¡Gracias por suscribirte a la newsletter de EmindsetLaw!</h2>
        <p>Hola,</p>
        <p>Te has suscrito correctamente a nuestra newsletter. A partir de ahora, recibirás las últimas noticias y actualizaciones legales directamente en tu bandeja de entrada.</p>
        <p>Si en algún momento deseas darte de baja, simplemente responde a este correo con el asunto "Baja".</p>
        <hr>
        <p>EmindsetLaw - Soluciones legales con un enfoque humano</p>
      `
    };
    
    // Send confirmation email to the user
    await transporter.sendMail(mailOptions);
    
    // Notification to admin about new subscription
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Nueva suscripción a la newsletter - EmindsetLaw',
      html: `
        <h2>Nueva suscripción a la newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        <hr>
        <p>Suscripción recibida desde el formulario de newsletter de EmindsetLaw.</p>
      `
    };
    
    await transporter.sendMail(adminMailOptions);
    
    res.status(200).json({ success: true, message: 'Te has suscrito correctamente a nuestra newsletter.' });
  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
    res.status(500).json({ success: false, message: 'Error al procesar la suscripción. Por favor, inténtelo de nuevo más tarde.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
