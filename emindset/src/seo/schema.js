/**
 * Esquemas JSON-LD para SEO estructurado
 * Este archivo contiene los esquemas de datos estructurados para mejorar la visibilidad en los motores de bu00fasqueda
 */

export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Emindset Law',
  url: 'https://www.emindsetlaw.com',
  logo: 'https://www.emindsetlaw.com/logo.png',
  description: 'Bufete de abogados especializado en derecho mercantil, real estate, nuevas tecnologu00edas y fiscalidad. Soluciones legales u00e1giles e innovadoras para empresas modernas.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Legal 123',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES'
  },
  telephone: '+34 912 345 678',
  email: 'contact@emindsetlaw.com',
  sameAs: [
    'https://www.linkedin.com/company/emindsetlaw',
    'https://twitter.com/emindsetlaw',
    'https://www.instagram.com/emindsetlaw'
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ],
    opens: '09:00',
    closes: '19:00'
  },
  priceRange: '$$',
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038
    },
    geoRadius: '50000'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Legales',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Derecho Mercantil y Societario',
          description: 'Asesoramiento integral en constituciu00f3n de empresas, pactos de socios, fusiones y adquisiciones, y reestructuraciones corporativas.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate',
          description: 'Asesoramiento legal en compraventa de inmuebles, arrendamientos, promociones inmobiliarias, due diligence y contratos de construcciu00f3n.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Nuevas Tecnologu00edas',
          description: 'Asesoramiento legal en propiedad intelectual, e-commerce, contratos tecnolu00f3gicos, startups y financiaciu00f3n de proyectos innovadores.'
        }
      }
    ]
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Emindset Law',
  image: 'https://www.emindsetlaw.com/logo.png',
  '@id': 'https://www.emindsetlaw.com',
  url: 'https://www.emindsetlaw.com',
  telephone: '+34 912 345 678',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Legal 123',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4168,
    longitude: -3.7038
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/emindsetlaw',
    'https://twitter.com/emindsetlaw',
    'https://www.instagram.com/emindsetlaw'
  ]
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Emindset Law',
  image: 'https://www.emindsetlaw.com/logo.png',
  '@id': 'https://www.emindsetlaw.com',
  url: 'https://www.emindsetlaw.com',
  telephone: '+34 912 345 678',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Legal 123',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4168,
    longitude: -3.7038
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/emindsetlaw',
    'https://twitter.com/emindsetlaw',
    'https://www.instagram.com/emindsetlaw'
  ]
};
