import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Reconocimientos from './pages/Reconocimientos';
import Historia from './pages/Historia';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Blogs from './pages/Blogs';
import SeoHelmet from './seo/SeoHelmet';

// Componente para gestionar el SEO basado en la ruta actual
const SEOHandler = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determinar la pu00e1gina actual basada en la ruta
  let currentPage = 'home';
  if (path === '/') currentPage = 'home';
  else if (path === '/historia') currentPage = 'about';
  else if (path === '/reconocimientos') currentPage = 'services';
  else if (path === '/blog') currentPage = 'blog';
  else if (path === '/contacto') currentPage = 'contact';
  else if (path === '/politica-privacidad') currentPage = 'privacy';
  
  return <SeoHelmet page={currentPage} />;
};

// Componente principal con SEO integrado
function AppContent() {
  const [isLogoAnimationComplete, setIsLogoAnimationComplete] = useState(false);

  const handleLogoAnimationComplete = useCallback(() => {
    setIsLogoAnimationComplete(true);
  }, []);
  return (
    <>
      <SEOHandler />
      <div className="flex flex-col min-h-screen">
        <Header onLogoAnimationComplete={handleLogoAnimationComplete} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isLogoAnimationComplete={isLogoAnimationComplete} />} />
            <Route path="/reconocimientos" element={<Reconocimientos />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
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
