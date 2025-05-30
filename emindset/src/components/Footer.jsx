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
                +376 678 882
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                info@emindsetlaw.com
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Av. Prat de la Creu 59-65, AD500 Andorra
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
                <Link to="/historia" className="hover:text-secondary transition-colors">
                  Historia
                </Link>
              </li>
              <li>
                <Link to="/reconocimientos" className="hover:text-secondary transition-colors">
                  Reconocimientos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-secondary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nuestras Oficinas</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Andorra</p>
                <p className="text-sm">Av. Prat de la Creu 59-65, AD500</p>
                <p className="text-sm">+376 678 882</p>
              </div>
              <div>
                <p className="font-medium">Barcelona</p>
                <p className="text-sm">Rambla Cataluña 88, 08008</p>
                <p className="text-sm">+34 932 123 456</p>
              </div>
              <div>
                <p className="font-medium">Toulouse</p>
                <p className="text-sm">63 rue du Colombier, 31670 Labege</p>
                <p className="text-sm">+33 534 123 456</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://es.linkedin.com/company/emindset-law-firm" target="_blank" rel="noopener noreferrer" className="hover:text-[#64d2e5] transition-colors">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://www.instagram.com/emindsetlaw/" target="_blank" rel="noopener noreferrer" className="hover:text-[#64d2e5] transition-colors">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
          <p className="mb-2">&copy; {new Date().getFullYear()} EmindsetLaw. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/politica-privacidad" className="text-sm hover:text-[#64d2e5] transition-colors">
              Política de Privacidad
            </Link>
            <span className="text-sm">|</span>
            <Link to="/aviso-legal" className="text-sm hover:text-[#64d2e5] transition-colors">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
