import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Reconocimientos from './pages/Reconocimientos';
import QuienesSomos from './pages/QuienesSomos';
import Blog from './pages/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Blogs from './pages/Blogs';
import SEO from './seo/SEO';

// Componente para gestionar el SEO basado en la ruta actual
const SEOHandler = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determinar la pu00e1gina actual basada en la ruta
  let currentPage = 'home';
  if (path === '/') currentPage = 'home';
  else if (path === '/quienes-somos') currentPage = 'about';
  else if (path === '/reconocimientos') currentPage = 'services';
  else if (path === '/blog') currentPage = 'blog';
  
  return <SEO page={currentPage} />;
};

// Componente principal con SEO integrado
function AppContent() {
  return (
    <>
      <SEOHandler />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reconocimientos" element={<Reconocimientos />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/blog" element={<Blogs />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
