import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ServicesGrid from '../components/ServicesGrid';
import Stats from '../components/Stats';
import Mision from '../components/Mision';
import Premios from '../components/Premios';
import CTA from '../components/CTA';
import News from '../components/News';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Mision />
      <Stats />
      <Testimonials />
      <CTA />
      <Premios />
      {/* <News /> */}
      <Contact />
    </div>
  );
};

export default Home;
