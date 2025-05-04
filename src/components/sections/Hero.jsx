import { useEffect, useRef } from 'react';
import Button from '../common/Button';
import './hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  
  // Animation for decorative elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const decorElements = heroRef.current.querySelectorAll('.hero-decoration');
      
      decorElements.forEach((elem, index) => {
        const speed = index % 2 === 0 ? 20 : -20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        elem.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-decoration hero-circle-1"></div>
      <div className="hero-decoration hero-circle-2"></div>
      <div className="hero-decoration hero-dots"></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="greeting">Hello, I'm</span>
            <span className="name">Novelyn Rampola</span>
            <span className="role">Software Developer</span>
          </h1>
          
          <p className="hero-description">
            I create beautiful, responsive, and user-friendly web applications with a focus on clean code
            and innovative solutions based in Davao City.
          </p>
          
          <div className="hero-cta">
            <Button 
              variant="primary" 
              size="large" 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="large" 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image">
            <img src="/profile.jpg" alt="Novelyn Rampola - Profile" />
          </div>
          <div className="hero-skills">
            <div className="skill-badge">React</div>
            <div className="skill-badge">JavaScript</div>
            <div className="skill-badge">CSS</div>
            <div className="skill-badge">UI/UX</div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <a href="#about" aria-label="Scroll to About section">
          <div className="scroll-arrow"></div>
        </a>
      </div>
    </section>
  );
};

export default Hero;