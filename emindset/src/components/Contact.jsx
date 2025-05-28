import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de envío de formulario
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Su mensaje ha sido enviado correctamente. Nos pondremos en contacto con usted lo antes posible.'
    });
    
    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        privacy: false
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 animate-fade-in">
            <span className="inline-block text-sm font-semibold text-primary mb-4">CONTACTO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Hablemos sobre tu caso</h2>
            <p className="text-lg text-gray-600 mb-8">Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Andorra</h4>
                  <p className="text-gray-600">Av. Prat de la Creu 59-65, AD500</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faPhone} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Teléfono</h4>
                  <p className="text-gray-600">+376 678 882</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">info@emindsetlaw.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faClock} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Horario</h4>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 19:00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="https://es.linkedin.com/company/emindset-law-firm" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="https://www.instagram.com/emindsetlaw/" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {formStatus.submitted ? (
              <div className={`bg-gray-50 p-8 shadow-sm ${formStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                  {formStatus.message}
                </div>
              </div>
            ) : (
              <form className="bg-gray-50 p-8 shadow-sm" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-focus w-full px-4 py-3 bg-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-focus w-full px-4 py-3 bg-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-focus w-full px-4 py-3 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Servicio de interés *</label>
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-focus w-full px-4 py-3 bg-white appearance-none"
                      required
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="mercantil">Derecho Mercantil</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="tech">Nuevas Tecnologías</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4" 
                    className="input-focus w-full px-4 py-3 bg-white"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary mr-3"
                    required
                  />
                  <label htmlFor="privacy" className="text-gray-600 text-sm">Acepto la política de privacidad y el tratamiento de mis datos</label>
                </div>
                
                <button type="submit" className="btn-hover w-full bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                  ENVIAR MENSAJE <FontAwesomeIcon icon={faPaperPlane} className="ml-3" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
