import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Contacto = () => {
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
  
  const oficinas = [
    {
      ciudad: 'Andorra',
      direccion: 'Av. Prat de la Creu 59-65, edf. Prat de la Creu, Escala A, Planta 4- 1A, AD500',
      telefono: '+376 728882 o +376 678882 (whatsapp)',
      email: 'andorra@emindsetlaw.com'
    },
    {
      ciudad: 'Barcelona',
      direccion: 'Rambla Cataluña 88, 1ª planta, 08008 Barcelona',
      telefono: '+376 728882 o +376 678882 (whatsapp)',
      email: 'barcelona@emindsetlaw.com'
    },
    {
      ciudad: 'Toulouse',
      direccion: '63 rue du Colombier, 31670 Labege, Francia',
      telefono: '+376 728882 o +376 678882 (whatsapp)',
      email: 'toulouse@emindsetlaw.com'
    }
  ];

  return (
    <div className="pt-24 bg-dark">
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-r from-[#00b1ed] to-[#003673] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contact_section.title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('contact_section.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Oficinas section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[#00b1ed] mb-4">{t('contact_section.offices.subtitle')}</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('contact_section.offices.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('contact_section.offices.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oficinas.map((oficina, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{oficina.ciudad}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#00b1ed] mt-1 mr-3" />
                    <p className="text-gray-600">
                      {oficina.direccion}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-[#00b1ed] mr-3" />
                    <p className="text-gray-600">
                      {oficina.telefono}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Formulario section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[#00b1ed] to-[#003673] p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">{t('contact_section.form.title')}</h3>
                <p className="mb-8 text-white/80">
                  {t('contact_section.form.description')}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">{t('contact_section.form.address')}</p>
                      <p className="font-medium">Av. Prat de la Creu, 59-65, AD500 Andorra la Vella</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faPhone} className="mt-1 mr-3 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">{t('contact_section.form.phone')}</p>
                      <p className="font-medium">+376 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faEnvelope} className="mt-1 mr-3 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Email</p>
                      <p className="font-medium">contact@emindsetlaw.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-12">
                {formStatus.submitted && formStatus.success && formStatus.message !== t('contact_section.form.sending') ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FontAwesomeIcon icon={faCheck} className="text-2xl" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">
                      {t('contact_section.form.success_title')}
                    </h4>
                    <p className="text-gray-600">
                      {formStatus.message}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.name')} *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b1ed]"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.email')} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b1ed]"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.phone')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b1ed]"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="service" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.service')} *</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b1ed]"
                        required
                      >
                        <option value="">{t('contact_section.form.select')}</option>
                        <option value="mercantil">{t('services.corporate.title')}</option>
                        <option value="real-estate">{t('services.realestate.title')}</option>
                        <option value="tech">{t('services.tech.title')}</option>
                        <option value="other">{t('contact_section.form.other')}</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">{t('contact_section.form.message')} *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#00b1ed]"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="privacy"
                          checked={formData.privacy}
                          onChange={handleChange}
                          className="mr-2 h-5 w-5 text-[#00b1ed]"
                          required
                        />
                        <span className="text-gray-700">{t('contact_section.form.privacy')} <a href="/politica-privacidad" className="text-[#00b1ed] hover:underline">*</a>.</span>
                      </label>
                    </div>
                    
                    {formStatus.message && (
                      <div className={`mb-6 p-4 ${formStatus.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} rounded-md`}>
                        {formStatus.message}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full bg-[#00b1ed] text-white py-3 px-6 rounded-md hover:bg-[#0091c3] transition-colors duration-300 font-medium flex items-center justify-center"
                      disabled={formStatus.submitted && formStatus.message === t('contact_section.form.sending')}
                    >
                      {formStatus.submitted && formStatus.message === t('contact_section.form.sending') ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact_section.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact_section.form.submit')} <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mapa section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('contact_section.map.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('contact_section.map.description')}
            </p>
          </div>
          
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.6553397568584!2d1.5282894!3d42.5073238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a5f9e9bfbf3b9f%3A0x4e5d0c7c93e9c3b0!2sAv.%20Prat%20de%20la%20Creu%2C%2059%2C%20AD500%20Andorra%20la%20Vella%2C%20Andorra!5e0!3m2!1sen!2ses!4v1653395698541!5m2!1sen!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de EmindsetLaw"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
