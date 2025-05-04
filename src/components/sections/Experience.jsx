import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import experiencesData from '../../data/experiences';
import './experience.css';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  
  // Toggle expanded state
  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeading
          title="My Experience"
          subtitle="Where I've worked and what I've done"
        />
        
        <div className="experience-timeline">
          <div className="timeline-line"></div>
          
          {experiencesData.map((experience, index) => (
            <div 
              key={experience.id}
              className={`timeline-item ${expandedId === experience.id ? 'expanded' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="timeline-dot"></div>
              
              <div className="timeline-content">
                <div className="timeline-header" onClick={() => toggleExpand(experience.id)}>
                  <div className="timeline-date">{experience.period}</div>
                  <h3 className="timeline-position">{experience.position}</h3>
                  <h4 className="timeline-company">{experience.company}</h4>
                  <div className="timeline-location">{experience.location}</div>
                  
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
                  <p className="timeline-description">
                    {experience.description}
                  </p>
                  
                  <div className="timeline-responsibilities">
                    <h5>Key Responsibilities:</h5>
                    <ul>
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="timeline-tech">
                    <h5>Technologies:</h5>
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
        </div>
      </div>
      
      <div className="experience-decoration dot-pattern"></div>
    </section>
  );
};

export default Experience;