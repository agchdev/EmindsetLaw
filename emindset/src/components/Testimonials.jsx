import React, { useRef } from 'react';

const Testimonials = () => {
  const ref = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Marc Taló',
      position: 'CEO de Grup Bomosa',
      text: "Un servei excel·lent i molt professional. Estem molt contents amb la seva atenció i resultats."
    },
    {
      id: 2,
      name: 'Fernando Mas',
      position: 'CEO de MP Gestió',
      text: "Sens dubte un equip d'advocats molt professionals i atents, amb un molt alt nivell resolutiu i disposats en tot moment en ajudar-te i assessorar-te en qualsevol dubte legal, ja són anys els que compto amb la seva ajuda i sempre amb un grau de satisfacció d'alt nivell"
    },
    {
      id: 3,
      name: 'Rafael Rabat',
      position: 'CEO de Norz Patrimonia',
      text: "Portem temps treballant amb l'equip d'Emindset Law i n'avalo la qualitat i professionalitat"
    },
    {
      id: 4,
      name: 'Sergi Martin',
      position: 'CEO de Altment Capital',
      text: "Emindset combina confiança i rigorositat a parts iguals. Amb una alta professionalitat, el seu equip ofereix solucions legals precises i eficaces, sempre amb un tracte empàtic i proper que porten a una atenció personalitzada. I tot, amb un aire fresc en la manera de treballar, amb una visió moderna i proactiva del dret."
    }
  ];

  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-gray-700 mb-4">TESTIMONIOS</span>
          <h2 className="text-3xl md:text-4xl text-gray-700 font-bold mb-4">Algunas palabras de <span className="text-primary">clientes satisfechos</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Descubre lo que nuestros clientes dicen sobre nuestra dedicación y excelencia en el servicio legal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg shadow-lg border-l-4 border-primary flex flex-col h-full justify-between"
            >
              <p className="text-gray-900 italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold text-lg">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-900">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
