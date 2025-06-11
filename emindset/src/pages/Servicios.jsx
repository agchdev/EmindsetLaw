import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBalanceScale, 
  faMicrochip, 
  faLightbulb, 
  faShield, 
  faChartLine, 
  faGlobe,
  faAngleRight 
} from '@fortawesome/free-solid-svg-icons';
import SeoHelmet from '../seo/SeoHelmet';

const Servicios = () => {
  const { t } = useTranslation();

  // Array de servicios para mapear y renderizar dinámicamente
  const servicios = [
    {
      id: 'corporate',
      icon: faBalanceScale,
      title: 'services.corporate.title',
      description: 'services.corporate.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 0
    },
    {
      id: 'nuevasTecnologias',
      icon: faLightbulb,
      title: 'services.nuevasTecnologias.title',
      description: 'services.nuevasTecnologias.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 100
    },
    {
      id: 'startupsInnovacion',
      icon: faMicrochip,
      title: 'services.startupsInnovacion.title',
      description: 'services.startupsInnovacion.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 200
    },
    {
      id: 'fiscal',
      icon: faGlobe,
      title: 'services.fiscal.title',
      description: 'services.fiscal.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 300
    },
    {
      id: 'proteccionDatos',
      icon: faShield,
      title: 'services.proteccionDatos.title',
      description: 'services.proteccionDatos.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 400
    },
    {
      id: 'fiscalidad',
      icon: faChartLine,
      title: 'services.fiscalidad.title',
      description: 'services.fiscalidad.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 500
    },
    {
      id: 'realestate',
      icon: faGlobe,
      title: 'services.realestate.title',
      description: 'services.realestate.description',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      delay: 600
    }
  ];

  return (
    <>
      <SeoHelmet page="services" />
      
      {/* Hero section */}
      <div className="bg-gradient-to-b from-[#00478B] to-[#003673] text-white py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.title')}</h1>
            <p className="text-lg opacity-90">{t('services.subtitle')}</p>
          </div>
        </div>
      </div>
      
      {/* Services section */}
      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div 
              key={servicio.id}
              id={`service-${servicio.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${servicio.delay}ms` }}
            >
              <div className="p-6">
                <div className={`w-14 h-14 ${servicio.color} rounded-xl flex items-center justify-center mb-6`}>
                  <FontAwesomeIcon icon={servicio.icon} className={`text-2xl ${servicio.textColor}`} />
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{t(servicio.title)}</h2>
                
                <div className="prose prose-lg">
                  <p className="text-gray-700">{t(servicio.description)}</p>
                </div>
                
                {/* Lista de servicios específicos relacionados */}
                <div className="mt-8">
                  <h3 className="font-semibold mb-4 text-lg">{t(`services.${servicio.id}.features.title`) || t('services.features')}</h3>
                  
                  <ul className="space-y-3">
                    {/* Intento acceder a los subservicios si existen, utilizando fallback con array vacío */}
                    {Array.from({ length: 6 }).map((_, index) => {
                      // Dinámicamente chequear si existe la key para este servicio y feature
                      const featureKey = `services.${servicio.id}.features.f${index+1}`;
                      const hasFeature = t(featureKey) !== featureKey; // Si no existe, i18next devuelve la key
                      
                      if (!hasFeature) return null;
                      
                      return (
                        <li key={`${servicio.id}-f${index+1}`} className="flex items-start">
                          <FontAwesomeIcon icon={faAngleRight} className="text-primary mt-1.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{t(featureKey)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* CTA section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a 
                    href="/contacto" 
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 w-full"
                  >
                    {t('services.contactCta')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">{t('services.faq.title')}</h2>
            
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, index) => {
                const questionKey = `services.faq.q${index+1}`;
                const answerKey = `services.faq.a${index+1}`;
                
                const hasQuestion = t(questionKey) !== questionKey;
                if (!hasQuestion) return null;
                
                return (
                  <div key={`faq-${index+1}`} className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">{t(questionKey)}</h3>
                    <p className="text-gray-700">{t(answerKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact/CTA section */}
      <div className="bg-primary py-16 px-6 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('services.contactSection.title')}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">{t('services.contactSection.description')}</p>
          
          <a 
            href="/contacto" 
            className="inline-flex items-center justify-center bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-md transition-colors duration-300"
          >
            {t('services.contactSection.button')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Servicios;
