import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faExternalLinkAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import SeoHelmet from '../seo/SeoHelmet';
import prem1 from "../assets/img/prem1.jpg";
import prem2 from "../assets/img/prem2.jpg";
import prem3 from "../assets/img/prem3.jpg";
import prem4 from "../assets/img/prem4.png";

const VideoModal = ({ videoUrl, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-dark z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg w-full max-w-4xl">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[#003673] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe 
            className="w-full h-full"
            src={videoUrl.replace('watch?v=', 'embed/')} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const PremioDetalle = ({ titulo, descripcion, imagen, enlaces, isVisible, delay }) => {
  const { t } = useTranslation();
  const [videoUrl, setVideoUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const videoLinks = enlaces.filter(enlace => enlace.url.includes('youtube.com'));
  const externalLinks = enlaces.filter(enlace => !enlace.url.includes('youtube.com'));
  
  const openVideoModal = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };
  
  return (
    <div 
      className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-md shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00b1ed]/60 to-[#00b1ed]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
              {videoLinks.length > 0 && (
                <button 
                  onClick={() => openVideoModal(videoLinks[0].url)}
                  className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-transform duration-500 hover:scale-110 shadow-md"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-[#00b1ed] ml-1" size="lg" />
                </button>
              )}
            </div>
            <img 
              src={imagen} 
              alt={titulo} 
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <div className="relative px-4 py-2">
            <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-8 -left-6 text-[#00b1ed]/10 text-5xl" />
            <FontAwesomeIcon icon={faQuoteRight} className="absolute -bottom-8 -right-6 text-[#00b1ed]/10 text-5xl" />
            
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{titulo}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{descripcion || "Reconocimiento otorgado por nuestra destacada labor y contribución al campo del derecho."}</p>
            
            {enlaces.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">{t('awards.relatedLinks')}</h4>
                <div className="space-y-3 flex flex-wrap">
                  {externalLinks.map((enlace, index) => (
                    <a 
                      key={index}
                      href={enlace.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#00b1ed] hover:text-[#003673] transition-colors text-sm mr-6 mb-2"
                    >
                      <span>{enlace.nombre || t('awards.readMore')}</span>
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 text-xs" />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {videoLinks.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">{t('awards.videos')}</h4>
                <div className="flex flex-wrap gap-3">
                  {videoLinks.map((video, index) => (
                    <button 
                      key={index}
                      onClick={() => openVideoModal(video.url)}
                      className="inline-flex items-center bg-[#00b1ed]/10 hover:bg-[#00b1ed]/20 text-[#00b1ed] px-4 py-2 rounded-full text-sm transition-colors shadow-sm hover:shadow-md"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      <span>{t('awards.watchVideo')} {videoLinks.length > 1 ? index + 1 : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <VideoModal 
        videoUrl={videoUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const Reconocimientos = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Array de premios usando las traducciones de i18n
  const premios = [
    {
      id: 1,
      titulo: t('awards.items.0.title'),
      descripcion: t('awards.items.0.description'),
      imagen: prem1,
      enlaces: [
        { 
          nombre: "El Suplemento", 
          url: "https://www.elsuplemento.es/premiado/emindset-law-premio-de-ley-2025-en-la-categoria-derecho-mercantil" 
        },
        { 
          nombre: t('awards.videoCeremony'), 
          url: "https://www.youtube.com/watch?v=oADo2ksYs4c" 
        },
        { 
          nombre: t('awards.interview'), 
          url: "https://www.youtube.com/watch?v=oOLCL6bikVw" 
        }
      ]
    },
    {
      id: 2,
      titulo: t('awards.items.1.title'),
      descripcion: t('awards.items.1.description'),
      imagen: prem2,
      enlaces: [
        { 
          nombre: "La Razón", 
          url: "https://www.larazon.es/cataluna/excelencia-empresarial-brilla-barcelona-entrega-premios-ceo-razon_20241024671aab7c2914190001e07a30.html" 
        },
        { 
          nombre: "Foment del Treball", 
          url: "https://www.foment.com/la-razon-reconeix-lexcel%C2%B7lencia-empresarial-de-16-ceos-a-la-primera-edicio-dels-premis-ceo-catalunya/" 
        },
        { 
          nombre: t('awards.videoCeremony'), 
          url: "https://www.youtube.com/watch?v=P0iS-NdTSB8" 
        }
      ]
    },
    {
      id: 3,
      titulo: t('awards.items.2.title'),
      descripcion: t('awards.items.2.description'),
      imagen: prem3,
      enlaces: [
        { 
          nombre: "Insights Success Magazine", 
          url: "https://insightssuccessmagazine.com/transforming-setbacks-into-success-oriol-giro-canturri-rises-to-the-forefront-in-insights-success-as-top-legal-strategist-to-watch-out-in-2025/" 
        }
      ]
    },
    {
      id: 4,
      titulo: t('awards.items.3.title'),
      descripcion: t('awards.items.3.description'),
      imagen: prem4,
      enlaces: [
        { 
          nombre: t('awards.certificate'), 
          url: "https://www.swisstransfer.com/d/1a7e5b0c-4800-42fb-876d-db0ff76d5e07" 
        }
      ]
    }
  ];

  return (
    <div className="pt-24 bg-dark">
      {/* SEO Metadata */}
      <SeoHelmet page="recognitions" />
      
      {/* Hero section */}
      <section className="relative py-24 bg-gradient-to-r from-[#00b1ed] to-[#003673] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 border border-white/20 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{t('awards.title')}</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-10"></div>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('awards.description')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Premios section */}
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="container mx-auto px-8 lg:px-12">
          {premios.map((premio, index) => (
            <PremioDetalle 
              key={premio.id}
              {...premio}
              isVisible={isVisible}
              delay={300 + (index * 200)}
            />
          ))}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#00b1ed]/10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#00b1ed]/10"></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              {t('contact.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="/contacto" 
                className="btn-hover inline-flex items-center justify-center bg-[#00b1ed] text-white font-medium px-7 py-3 rounded-full hover:bg-[#003673] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t('contact.button')}
              </a>
              <a 
                href="/servicios" 
                className="btn-hover inline-flex items-center justify-center bg-white text-[#00b1ed] font-medium px-7 py-3 rounded-full border border-[#00b1ed] hover:bg-[#00b1ed]/5 transition-all duration-300"
              >
                {t('navigation.services')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reconocimientos;
