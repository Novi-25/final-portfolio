import { useState, useRef, useEffect } from 'react';
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
  isHovered = false,
}) => {
  const [hover, setHover] = useState(isHovered);
  const cardRef = useRef(null);

  // Sync hover state with isHovered prop
  useEffect(() => {
    setHover(isHovered);
  }, [isHovered]);
  
  // Track mouse position for 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      setCardDimensions({ width, height });
    }
  }, []);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const { left, top } = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the card
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate percentage
    const percentX = x / cardDimensions.width;
    const percentY = y / cardDimensions.height;
    
    setMousePosition({ x: percentX, y: percentY });
  };
  
  const resetMousePosition = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };
  
  // Calculate 3D transform based on mouse position
  const getTransform = () => {
    if (!hover) return '';
    
    const rotateX = (mousePosition.y - 0.5) * -10; // Inverted for natural feel
    const rotateY = (mousePosition.x - 0.5) * 10;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  // Calculate highlight position
  const getHighlightStyles = () => {
    const x = mousePosition.x * 100;
    const y = mousePosition.y * 100;
    
    return {
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 50%)`,
      opacity: hover ? 0.15 : 0
    };
  };
  
  return (
    <div 
      ref={cardRef}
      className={`card card-${variant} ${className} ${hover ? 'card-hovered' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        resetMousePosition();
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: getTransform(),
        transition: 'transform 0.1s ease'
      }}
    >
      <div className="card-image-container">
        <img 
          src={image || '/images/projects/placeholder.jpg'} 
          alt={title} 
          className="card-image" 
          loading="lazy"
        />
        
        <div className={`card-overlay ${hover ? 'visible' : ''}`}>
          <div className="card-links">
            {liveLink && (
              <a 
                href={liveLink} 
                className="card-link card-link-live" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </a>
            )}
            
            {repoLink && (
              <a 
                href={repoLink} 
                className="card-link card-link-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code of ${title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View Code
              </a>
            )}
          </div>
        </div>
        
        {/* Highlight effect */}
        <div 
          className="card-highlight"
          style={getHighlightStyles()}
        ></div>
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