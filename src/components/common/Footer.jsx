import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    }
  ];

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' }
  ];
  
  // Contact items
  const contactItems = [
    {
      label: 'Phone',
      value: '(+63) 912-345-6789',
      link: 'tel:+639123456789',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    },
    {
      label: 'Email',
      value: 'novelyn.rampola@gmail.com',
      link: 'mailto:novelyn.rampola@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    {
      label: 'Location',
      value: 'Davao City, Philippines',
      link: 'https://maps.google.com/?q=Davao+City,Philippines',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    }
  ];
  
  // Handle smooth scroll for anchor links
  const handleAnchorClick = (e, targetId) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(targetId.substring(1));
      if (element) {
        const yOffset = -70; // Navbar height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer-decoration wave-decoration"></div>
      
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Novelyn</span>
              <span className="logo-dot"></span>
            </Link>
            <p className="footer-tagline">
              Software Developer creating beautiful, functional web experiences based in Davao City.
            </p>
            
            <div className="footer-availability">
              <div className="availability-badge">
                <span className="availability-indicator"></span>
                Available for Freelance
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-menu">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    {link.path.includes('#') ? (
                      <a 
                        href={link.path} 
                        onClick={(e) => handleAnchorClick(e, link.path.substring(link.path.indexOf('#')))}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.path}>{link.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-heading">Contact</h3>
              <ul className="footer-info">
                {contactItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : null} rel="noopener noreferrer">
                      <span className="footer-icon">
                        {item.icon}
                      </span>
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-newsletter">
              <h3 className="footer-heading">Stay Updated</h3>
              <p className="newsletter-text">
                Subscribe to my newsletter to get updates on my latest projects and blog posts.
              </p>
              <form className="newsletter-form">
                <div className="newsletter-input-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="newsletter-input"
                    aria-label="Email for newsletter"
                  />
                  <button type="submit" className="newsletter-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="social-links-container">
            <h3 className="social-title">Connect With Me</h3>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="social-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span className="social-name">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Novelyn Rampola. All Rights Reserved.
          </div>
          
          <div className="credits">
            <p>
              Designed and built with
              <span className="heart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#c45c8e" stroke="#c45c8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
              by Novelyn Rampola
            </p>
          </div>
          
          <div className="back-to-top">
            <a 
              href="#home" 
              onClick={(e) => handleAnchorClick(e, '#home')}
              aria-label="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;