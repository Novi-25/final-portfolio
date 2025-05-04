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
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`
        btn 
        btn-${variant} 
        btn-${size} 
        ${fullWidth ? 'btn-full-width' : ''} 
        ${icon ? 'btn-with-icon' : ''} 
        ${className}
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;