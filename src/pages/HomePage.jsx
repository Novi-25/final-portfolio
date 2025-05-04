import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import BlogList from '../components/sections/BlogList';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <BlogList previewMode={true} />
      <Contact />
    </>
  );
};

export default HomePage;