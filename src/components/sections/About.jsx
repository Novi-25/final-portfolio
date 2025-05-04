import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import './about.css';

const About = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const aboutRef = useRef(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');
  
  // Animate on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      
      const rect = aboutRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      
      if (isVisible) {
        setAnimateIn(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Skills data
  const skills = {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'TypeScript', 'Sass/SCSS', 'Tailwind CSS', 'Responsive Design'],
    backend: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'RESTful APIs', 'PHP', 'MySQL', 'GraphQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Adobe XD', 'Webpack', 'Vercel', 'Netlify', 'CI/CD']
  };
  
  return (
    <section id="about" className={`section about-section ${animateIn ? 'animate-in' : ''}`} ref={aboutRef}>
      <div className="wave-decoration about-wave-top"></div>
      
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my skills"
        />
        
        <div className="about-content">
          <div className="about-image-container fade-in-right">
            <div className="about-image">
              <img src="/profile.jpg" alt="Profile" />
            </div>
            
            <div className="about-image-decoration circle-1"></div>
            <div className="about-image-decoration circle-2"></div>
            <div className="about-image-decoration dots"></div>
            
            {/* Additional decorative elements */}
            <div className="about-image-badge">
              <span className="experience-years">3+</span>
              <span className="experience-text">Years<br/>Experience</span>
            </div>
          </div>
          
          <div className="about-text fade-in-left">
            <h3>Hi there! I'm <span className="highlight">Novelyn Rampola</span></h3>
            
            <p>
              I'm a passionate software developer from Davao City, specializing in creating beautiful, 
              responsive websites and web applications. With expertise in both frontend and backend 
              technologies, I enjoy bringing creative ideas to life through clean and efficient code.
            </p>
            
            <p>
              My journey in web development began 4 years ago, and I've been continuously expanding 
              my skills ever since. I believe in writing maintainable code that provides exceptional 
              user experiences across all devices.
            </p>
            
            <div className="about-highlight-box">
              <div className="highlight-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="highlight-content">
                <h4>My Approach</h4>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, and enjoying outdoor activities to maintain a healthy work-life balance.
                </p>
              </div>
            </div>
            
            <div className="about-buttons">
              <Button 
                variant="primary" 
                href="/resume.pdf" 
                target="_blank"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                }
              >
                Download Resume
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        
        <div className="skills-container fade-in-up">
          <h3 className="skills-title">My Skills</h3>
          
          <div className="skills-nav">
            {Object.keys(skills).map((category) => (
              <button
                key={category}
                className={`skill-category-tab ${activeSkillCategory === category ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory(category)}
              >
                <span className="tab-icon">
                  {category === 'frontend' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  )}
                  {category === 'backend' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6.01" y2="6"></line>
                      <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                  )}
                  {category === 'tools' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  )}
                </span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="skills-content">
            {Object.keys(skills).map((category) => (
              <div 
                key={category} 
                className={`skill-category ${activeSkillCategory === category ? 'active' : ''}`}
              >
                <div className="skill-list">
                  {skills[category].map((skill, index) => (
                    <div 
                      key={index} 
                      className="skill-item"
                      style={{ 
                        transitionDelay: `${index * 0.05}s`,
                        opacity: activeSkillCategory === category ? 1 : 0,
                        transform: activeSkillCategory === category ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="wave-decoration about-wave-bottom"></div>
    </section>
  );
};

export default About;