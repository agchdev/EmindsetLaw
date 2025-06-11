import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AvisoLegal = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Scroll al inicio de la página cuando el componente se monta
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-16 pt-24">
      {/* Banda azul que llega hasta arriba pero se queda detrás del header */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-900 to-blue-700 z-0"></div>
      
      {/* Contenedor principal con padding-top para posicionar debajo del header */}
      <div className="relative">
        {/* Header con título destacado y claramente visible */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">{t('legal.title')}</h1>
          </div>
        </div>
      
        {/* Contenido principal */}
        <div className="bg-white z-10 relative pt-15">  
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto text-gray-700">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section1_title')}</h2>
                <p className="mb-4">{t('legal.section1_p1')}</p>
                <p className="mb-4">{t('legal.section1_p2')}</p>
                <p className="mb-4">{t('legal.section1_p3')}</p>
                <p className="mb-4">{t('legal.section1_p4')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section2_title')}</h2>
                <p className="mb-4">{t('legal.section2_p1')}</p>
                <p className="mb-4">{t('legal.section2_p2')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section3_title')}</h2>
                <p className="mb-4">{t('legal.section3_p1')}</p>
                <p className="mb-4">{t('legal.section3_p2')}</p>
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">{t('legal.section3_li1')}</li>
                  <li className="mb-2">{t('legal.section3_li2')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section4_title')}</h2>
                <p className="mb-4">{t('legal.section4_p1')}</p>
                <p className="mb-4">{t('legal.section4_p2')}</p>
                <p className="mb-4">{t('legal.section4_p3')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section5_title')}</h2>
                <p className="mb-4">{t('legal.section5_p1')}</p>
                <p className="mb-4">{t('legal.section5_p2')}</p>
                <p className="mb-4">{t('legal.section5_p3')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section6_title')}</h2>
                <p className="mb-4">{t('legal.section6_p1')}</p>
                <p className="mb-4">{t('legal.section6_p2')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section7_title')}</h2>
                <p className="mb-4">{t('legal.section7_p1')}</p>
                <p className="mb-4">{t('legal.section7_p2')}</p>
                <p className="mb-4">{t('legal.section7_p3')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section8_title')}</h2>
                <p className="mb-4">{t('legal.section8_p1')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section9_title')}</h2>
                <p className="mb-4">{t('legal.section9_p1')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section10_title')}</h2>
                <p className="mb-4">{t('legal.section10_p1')}</p>
              </section>

              <footer className="text-center text-sm text-gray-500 mt-12">
                <p>{t('footer.copyright')} © {new Date().getFullYear()} EmindsetLaw</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvisoLegal;