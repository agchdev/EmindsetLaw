import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBolt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import aboutImg from '../assets/img/espacio5.JPG';

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                        <span className="underline-animation">Emindset Law</span> {t('about.title').substring(12)}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {t('about.description')}
                    </p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">{t('about.practical.title')}</h4>
                                <p className="text-gray-600 text-sm">{t('about.practical.description')}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-primary/10 p-3 mr-4">
                                <FontAwesomeIcon icon={faBolt} className="text-primary text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">{t('about.speed.title')}</h4>
                                <p className="text-gray-600 text-sm">{t('about.speed.description')}</p>
                            </div>
                        </div>
                        
                    </div>
                    <a href="#contact" className="btn-hover inline-flex items-center bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg">
                        {t('about.cta')} <FontAwesomeIcon icon={faArrowRight} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
                <div className="lg:w-1/2 relative animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <div className="relative z-10 card-hover">
                        <img
                          src={aboutImg} 
                          alt={t('about.image_alt')} 
                          className="w-full h-auto shadow-xl"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 z-0"></div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 z-0"></div>
                    
                    <div className="absolute -bottom-5 -right-5 bg-white py-3 px-4 z-20 flex items-center transform rotate-6 group hover:rotate-0 transition-transform duration-500">
                        <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3">
                            <span className="font-bold text-lg">{t('about.experience.years')}</span>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">{t('about.experience.text')}</div>
                            <div className="font-bold text-gray-800">{t('about.experience.title')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default About;
