import { useState } from 'react';
import './card.css';

const Card = ({
  image,
  title,
  description,
  tags = [],
  repoLink,
  liveLink,
  variant = 'default',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`card card-${variant} ${className} ${isHovered ? 'card-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img 
          src={image || '/images/projects/placeholder.jpg'} 
          alt={title} 
          className="card-image" 
        />
        
        <div className="card-overlay">
          <div className="card-links">
            {liveLink && (
              <a 
                href={liveLink} 
                className="card-link card-link-live" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
            
            {repoLink && (
              <a 
                href={repoLink} 
                className="card-link card-link-repo" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        
        <div className="card-description">{description}</div>
        
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;