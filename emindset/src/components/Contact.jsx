import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica del formulario
    if (!formData.name || !formData.email || !formData.message || !formData.service || !formData.privacy) {
      setFormStatus({
        submitted: true,
        success: false,
        message: t('contact_section.form.error_required_fields')
      });
      return;
    }
    
    try {
      // Enviar datos a la API
      setFormStatus({
        submitted: true,
        success: true,
        message: t('contact_section.form.sending')
      });
      
      // Determinar la URL de la API basada en el entorno (desarrollo o producción)
      // En producción, la API estará en la misma URL base que la aplicación
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isDev 
        ? 'http://localhost:3001/api/contact' 
        : '/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Mensaje enviado exitosamente
        setFormStatus({
          submitted: true,
          success: true,
          message: t('contact_section.form.success') || 'Mensaje enviado correctamente'
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
      } else {
        // Error al enviar el mensaje
        setFormStatus({
          submitted: true,
          success: false,
          message: data.error || t('contact_section.form.error_sending')
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: t('contact_section.form.error_connection')
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 animate-fade-in">
            <span className="inline-block text-sm font-semibold text-primary mb-4">{t('contact_section.title').toUpperCase()}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t('contact_section.subtitle')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('contact_section.description')}</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t('contact_section.address.title')}</h4>
                  <p className="text-gray-600">{t('contact_section.address.line1')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faPhone} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t('contact_section.phone.title')}</h4>
                  <p className="text-gray-600">{t('contact_section.phone.number')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t('contact_section.email.title')}</h4>
                  <p className="text-gray-600">{t('contact_section.email.address')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                  <FontAwesomeIcon icon={faClock} className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{t('contact_section.hours.title')}</h4>
                  <p className="text-gray-600">{t('contact_section.hours.schedule')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact_section.form.title')}</h3>
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
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.name')} *</label>
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
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.email')} *</label>
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
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.phone')}</label>
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
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.service')} *</label>
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-focus w-full px-4 py-3 bg-white appearance-none"
                      required
                    >
                      <option value="">{t('contact_section.form.select')}</option>
                      <option value="mercantil">{t('services.corporate.title')}</option>
                      <option value="real-estate">{t('services.realestate.title')}</option>
                      <option value="tech">{t('services.tech.title')}</option>
                      <option value="other">{t('contact_section.form.other')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.message')} *</label>
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
                  <label htmlFor="privacy" className="text-gray-600 text-sm">{t('contact_section.form.privacy')}</label>
                </div>
                
                <button type="submit" className="btn-hover w-full bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                  {t('contact_section.form.submit')} <FontAwesomeIcon icon={faPaperPlane} className="ml-3" />
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
