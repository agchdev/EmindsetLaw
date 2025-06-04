import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Reconocimientos from './pages/Reconocimientos';
import Historia from './pages/Historia';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import Servicios from './pages/Servicios';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Blogs from './pages/Blogs';
import SeoHelmet from './seo/SeoHelmet';
import CookieConsent from './components/CookieConsent';
import Newsletter from './components/Newsletter';
import { initGA, pageView } from './utils/analytics';

// Componente para gestionar el SEO basado en la ruta actual
const SEOHandler = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Registrar vista de página en Google Analytics
  useEffect(() => {
    pageView(path);
  }, [path]);
  
  // Determinar la página actual basada en la ruta
  let currentPage = 'home';
  if (path === '/') currentPage = 'home';
  else if (path === '/historia') currentPage = 'about';
  else if (path === '/servicios') currentPage = 'services';
  else if (path === '/reconocimientos') currentPage = 'awards';
  else if (path === '/blog') currentPage = 'blog';
  else if (path === '/contacto') currentPage = 'contact';
  else if (path === '/politica-privacidad') currentPage = 'privacy';
  
  return <SeoHelmet page={currentPage} />;
};

// Componente principal con SEO integrado
function AppContent() {
  // Ya no necesitamos controlar la animación del logo desde aquí
  
  // Inicializar Google Analytics cuando se carga la aplicación
  useEffect(() => {
    initGA();
  }, []);
  
  return (
    <>
      <SEOHandler />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/reconocimientos" element={<Reconocimientos />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
        <CookieConsent /> {/* Componente de consentimiento de cookies */}
        <Newsletter /> {/* Componente de newsletter */}
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
