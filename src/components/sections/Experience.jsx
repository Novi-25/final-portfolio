import { useState, useRef, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import experiencesData from '../../data/experiences';
import './experience.css';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      
      if (isVisible) {
        setAnimateIn(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle expanded state
  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  
  // Animate timeline progressively as user scrolls
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const handleTimelineScroll = () => {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      timelineItems.forEach((item) => {
        const itemPosition = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Add a class to animate when the item is in view
        if (itemPosition.top < windowHeight * 0.8) {
          item.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', handleTimelineScroll);
    // Run once to check initial visibility
    setTimeout(handleTimelineScroll, 300);
    
    return () => window.removeEventListener('scroll', handleTimelineScroll);
  }, []);
  
  return (
    <section 
      id="experience" 
      className={`section experience-section ${animateIn ? 'animate-in' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <SectionHeading
          title="My Experience"
          subtitle="Where I've worked and what I've done"
        />
        
        <div className="experience-timeline" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {experiencesData.map((experience, index) => (
            <div 
              key={experience.id}
              className={`timeline-item ${expandedId === experience.id ? 'expanded' : ''}`}
              data-index={index}
            >
              <div className="timeline-dot"></div>
              
              <div className="timeline-content">
                <div className="timeline-header" onClick={() => toggleExpand(experience.id)}>
                  <div className="timeline-date">{experience.period}</div>
                  <h3 className="timeline-position">{experience.position}</h3>
                  <h4 className="timeline-company">{experience.company}</h4>
                  <div className="timeline-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {experience.location}
                  </div>
                  
                  <button 
                    className="timeline-toggle"
                    aria-expanded={expandedId === experience.id}
                    aria-label={expandedId === experience.id ? "Collapse details" : "Expand details"}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="chevron-icon"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                <div className="timeline-details">
                  <div className="timeline-description-wrapper">
                    <p className="timeline-description">
                      {experience.description}
                    </p>
                  </div>
                  
                  <div className="timeline-responsibilities">
                    <h5>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Key Responsibilities:
                    </h5>
                    <ul>
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <h5>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      Technologies:
                    </h5>
                    <div className="tech-list">
                      {experience.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="timeline-end">
            <div className="timeline-end-dot"></div>
            <div className="timeline-end-text">Present</div>
          </div>
        </div>
        

      </div>
      
      <div className="experience-decoration dot-pattern"></div>
      <div className="experience-decoration circle-pattern"></div>
    </section>
  );
};

export default Experience;