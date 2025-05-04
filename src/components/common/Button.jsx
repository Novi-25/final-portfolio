import { useState, useEffect } from 'react';
import './button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  target = null,
  className = '',
  ariaLabel = '',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  // Handle ripple effect for click
  const handleRipple = (e) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rippleSize = Math.max(rect.width, rect.height) * 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: rippleSize
    };
    
    setRipples(prevRipples => [...prevRipples, newRipple]);
  };
  
  // Remove ripples after animation completes
  useEffect(() => {
    if (ripples.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      setRipples(prevRipples => prevRipples.slice(1));
    }, 600);
    
    return () => clearTimeout(timeoutId);
  }, [ripples]);
  
  // Render button or anchor tag
  const renderButton = () => {
    const classNames = `
      btn 
      btn-${variant} 
      btn-${size} 
      ${fullWidth ? 'btn-full-width' : ''} 
      ${icon ? 'btn-with-icon' : ''}
      ${isHovered ? 'btn-hovered' : ''}
      ${isPressed ? 'btn-pressed' : ''}
      ${className}
    `;
    
    const buttonProps = {
      className: classNames,
      onClick: (e) => {
        handleRipple(e);
        onClick && onClick(e);
      },
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsPressed(false);
      },
      onMouseEnter: () => setIsHovered(true),
      type,
      disabled,
      'aria-label': ariaLabel || undefined,
      ...props
    };
    
    const content = (
      <>
        {ripples.map(ripple => (
          <span 
            key={ripple.id} 
            className="btn-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              transform: `translate(-50%, -50%) scale(1)`,
            }}
          />
        ))}
        
        {icon && iconPosition === 'left' && (
          <span className="btn-icon btn-icon-left">{icon}</span>
        )}
        
        <span className="btn-text">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="btn-icon btn-icon-right">{icon}</span>
        )}
      </>
    );
    
    if (href) {
      return (
        <a 
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          {...buttonProps}
        >
          {content}
        </a>
      );
    }
    
    return (
      <button {...buttonProps}>
        {content}
      </button>
    );
  };
  
  return renderButton();
};

export default Button;