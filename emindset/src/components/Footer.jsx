import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#003673] to-[#006eae] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Emindset<span className="text-[#64d2e5]">Law</span></h3>
            <p className="mb-4">Ofrecemos servicios legales de alta calidad para empresas y particulares.</p>
            <div className="space-y-2">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                +34 912 345 678
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                info@emindsetlaw.com
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Calle Gran Vía 123, Madrid
              </p>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-secondary transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-secondary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/#news" className="hover:text-secondary transition-colors">
                  Noticias
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-secondary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
            <div className="mt-4">
              <p>Horario de atención:</p>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} EmindsetLaw. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
