import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const News = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Datos de ejemplo para noticias
  const newsArticles = [
    {
      id: 1,
      title: 'Nueva ley de protección de datos',
      excerpt: 'Se ha aprobado una nueva ley que modifica el tratamiento de datos personales en empresas...',
      date: '20 de mayo de 2025',
      content: `
        <p class="text-gray-700 mb-4">La nueva ley de protección de datos, aprobada recientemente, establece importantes cambios en el tratamiento de datos personales en empresas. Los principales puntos a destacar son:</p>
        <ul class="list-disc list-inside text-gray-700 mt-4">
            <li class="mb-2">Mayor control del usuario sobre sus datos, incluyendo derecho a olvido digital y portabilidad</li>
            <li class="mb-2">Requisitos más estrictos para el consentimiento, incluyendo registros de consentimientos y auditorías periódicas</li>
            <li class="mb-2">Sanciones más severas para incumplimientos, que pueden llegar hasta el 4% del volumen de negocio anual</li>
            <li class="mb-2">Implementación de nuevas medidas de seguridad, incluyendo evaluaciones de impacto y registros de actividades de tratamiento</li>
        </ul>
        
        <blockquote class="bg-gray-50">
            <p class="text-gray-700 italic mb-2">"La nueva ley establece un estándar más elevado en la protección de datos, requiriendo una revisión completa de los protocolos de seguridad y consentimiento."</p>
            <footer class="text-sm text-gray-600">- Dr. Ana García, Especialista en Protección de Datos</footer>
        </blockquote>

        <p class="mt-6 text-gray-700">Esta ley entrará en vigor el próximo 1 de junio y afectará a todas las empresas que manejen datos personales. Los cambios más significativos incluyen:</p>
        
        <div class="mt-4 space-y-4">
            <div class="bg-primary/5 p-4 ">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">Para empresas</h4>
                <ul class="list-disc list-inside text-gray-700">
                    <li>Revisión de políticas de privacidad</li>
                    <li>Implementación de registros de consentimientos</li>
                    <li>Formación obligatoria para empleados</li>
                    <li>Contratos actualizados con proveedores</li>
                </ul>
            </div>
            
            <div class="bg-primary/5 p-4 ">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">Para usuarios</h4>
                <ul class="list-disc list-inside text-gray-700">
                    <li>Más control sobre sus datos personales</li>
                    <li>Facilidad para retirar consentimientos</li>
                    <li>Transparencia en el uso de datos</li>
                    <li>Proceso simplificado para reclamaciones</li>
                </ul>
            </div>
        </div>
      `
    },
    {
      id: 2,
      title: 'Cambios en la normativa mercantil',
      excerpt: 'Nuevas disposiciones que afectan a la constitución y operación de sociedades mercantiles...',
      date: '15 de mayo de 2025',
      content: `
        <p class="text-gray-700 mb-4">El Congreso ha aprobado recientemente una serie de modificaciones a la Ley de Sociedades de Capital que afectarán significativamente a la constitución y operación de empresas en España.</p>
        
        <p class="text-gray-700 mb-4">Entre los cambios más relevantes destacan:</p>
        
        <ul class="list-disc list-inside text-gray-700 mt-4">
            <li class="mb-2">Simplificación del proceso de constitución de sociedades limitadas</li>
            <li class="mb-2">Reducción del capital mínimo requerido para ciertos tipos de sociedades</li>
            <li class="mb-2">Nuevos requisitos de transparencia y gobierno corporativo</li>
            <li class="mb-2">Modificaciones en el régimen de responsabilidad de administradores</li>
        </ul>
        
        <p class="text-gray-700 mt-4">Estas modificaciones entrarán en vigor a partir del próximo trimestre y buscan fomentar el emprendimiento y mejorar la competitividad de las empresas españolas.</p>
      `
    },
    {
      id: 3,
      title: 'Sentencia sobre derechos digitales',
      excerpt: 'El Tribunal Supremo establece nuevos criterios sobre privacidad en entornos laborales...',
      date: '10 de mayo de 2025',
      content: `
        <p class="text-gray-700 mb-4">El Tribunal Supremo ha dictado una sentencia histórica que establece nuevos criterios sobre la privacidad de los trabajadores en entornos digitales y el alcance del control empresarial.</p>
        
        <p class="text-gray-700 mb-4">La sentencia aborda varios aspectos clave:</p>
        
        <ul class="list-disc list-inside text-gray-700 mt-4">
            <li class="mb-2">Límites al monitoreo del correo electrónico corporativo</li>
            <li class="mb-2">Uso de dispositivos personales en el entorno laboral</li>
            <li class="mb-2">Derecho a la desconexión digital fuera del horario laboral</li>
            <li class="mb-2">Requisitos para la implementación de sistemas de vigilancia</li>
        </ul>
        
        <blockquote class="bg-gray-50 p-4 my-6">
            <p class="text-gray-700 italic">"Esta sentencia marca un antes y un después en la protección de la privacidad de los trabajadores en la era digital."</p>
            <footer class="text-sm text-gray-600 mt-2">- Revista Jurídica Digital</footer>
        </blockquote>
        
        <p class="text-gray-700 mt-4">Las empresas deberán adaptar sus políticas internas y protocolos para cumplir con estos nuevos criterios jurisprudenciales.</p>
      `
    }
  ];
  
  // Función para abrir el modal con el artículo seleccionado
  const openModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; // Evita el scroll en el fondo
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'auto'; // Restaura el scroll
  };

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4">ÚLTIMAS NOTICIAS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Novedades Legales</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mantente informado sobre las últimas novedades y actualizaciones legales.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <article key={article.id} className="news-item bg-white p-6 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => openModal(article)}>
              <div className="news-date text-sm text-gray-500 mb-4">{article.date}</div>
              <h3 className="news-title text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
              <p className="news-content text-gray-600 mb-4">{article.excerpt}</p>
              <button className="text-primary font-medium hover:text-primary-dark transition-colors duration-300 inline-flex items-center">
                Leer más
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Modal para mostrar el artículo completo */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-2">{selectedArticle.date}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedArticle.title}</h2>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Cerrar"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a href="#contact" className="inline-flex items-center justify-center bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300">
                  Contactar con un especialista
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
