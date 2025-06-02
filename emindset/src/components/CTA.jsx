import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  return (
    <section id="budget" className="py-20 bg-[#003673] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-secondary"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <span className="inline-block text-sm font-semibold text-primary-light mb-4">{t('cta_section.title').toUpperCase()}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta_section.subtitle')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta_section.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#contact" className="btn-hover inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('cta_section.button')} <FontAwesomeIcon icon={faArrowRight} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="tel:+34912345678" className="btn-hover inline-flex items-center justify-center bg-transparent text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-3" /> {t('cta_section.call')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
