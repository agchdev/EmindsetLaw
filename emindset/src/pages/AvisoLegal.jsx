import React from 'react';
import { useTranslation } from 'react-i18next';

const AvisoLegal = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('legal.title')}</h1>
        
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

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.section11_title')}</h2>
            <p className="mb-4">{t('legal.section11_p1')}</p>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-12">
            <p>{t('legal.copyright')}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AvisoLegal;