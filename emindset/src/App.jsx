import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reconocimientos from './pages/Reconocimientos';
import QuienesSomos from './pages/QuienesSomos';
import Blog from './pages/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
