import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import './hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle text typing animation
  const [typedText, setTypedText] = useState('');
  const fullText = "Software Developer";
  const typingSpeed = 120; // ms per character
  
  // Animation for decorative elements and text typing
  useEffect(() => {
    // Set component as visible for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Text typing animation
    let charIndex = 0;
    const typeText = () => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeText, typingSpeed);
      }
    };
    
    setTimeout(typeText, 1000); // Start typing after initial animation
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const x = (clientX / width) - 0.5;
      const y = (clientY / height) - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate parallax transform for decorative elements
  const getParallaxTransform = (strength) => {
    const x = mousePosition.x * strength;
    const y = mousePosition.y * strength;
    return `translate(${x}px, ${y}px)`;
  };
  
  return (
    <section id="home" className={`hero ${isVisible ? 'visible' : ''}`} ref={heroRef}>
      <div 
        className="hero-decoration hero-circle-1"
        style={{ transform: getParallaxTransform(-30) }}
      ></div>
      <div 
        className="hero-decoration hero-circle-2"
        style={{ transform: getParallaxTransform(20) }}
      ></div>
      <div 
        className="hero-decoration hero-dots"
        style={{ transform: getParallaxTransform(40) }}
      ></div>
      <div
        className="hero-decoration hero-line"
        style={{ transform: getParallaxTransform(-15) }}
      ></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">Available for freelance projects</span>
          
          <h1 className="hero-title">
            <span className="greeting fade-in">Hello, I'm</span>
            <span className="name slide-in">Novelyn Rampola</span>
            <span className="role">
              <span className="role-text">{typedText}</span>
              <span className="cursor">|</span>
            </span>
          </h1>
          
          <p className="hero-description fade-in-up">
            I create beautiful, responsive, and user-friendly web applications with a focus on clean code
            and innovative solutions based in Davao City.
          </p>
          
          <div className="hero-cta fade-in-up">
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
          
          <div className="hero-stats fade-in">
            <div className="stat">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container fade-in-right">
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img src="/profile1.jpg" alt="Novelyn Rampola - Profile" />
            </div>
            
            <div 
              className="hero-image-shape shape-1"
              style={{ transform: getParallaxTransform(15) }}
            ></div>
            <div 
              className="hero-image-shape shape-2"
              style={{ transform: getParallaxTransform(-10) }}
            ></div>
          </div>
          
          <div className="hero-skills">
            <div className="skill-badge">React</div>
            <div className="skill-badge">JavaScript</div>
            <div className="skill-badge">TypeScript</div>
            <div className="skill-badge">UI/UX</div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <a href="#about" aria-label="Scroll to About section">
          <div className="scroll-arrow"></div>
        </a>
      </div>
      
      <div className="hero-scroll-text">Scroll Down</div>
    </section>
  );
};

export default Hero;