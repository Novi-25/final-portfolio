import { useRef, useState, useEffect } from 'react';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import useForm from '../../hooks/useForm';
import './contact.css';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [activeSocialLink, setActiveSocialLink] = useState(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contactRef.current) return;
      
      const rect = contactRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      
      if (isVisible) {
        contactRef.current.classList.add('visible');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Form validation
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  
  // Initialize form with useForm hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    resetForm
  } = useForm(
    { name: '', email: '', subject: '', message: '' },
    validateForm
  );
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm(values);
    
    if (Object.keys(formErrors).length === 0) {
      try {
        setSubmitStatus({ success: false, message: 'Sending message...' });
        
        // Create a new FormData instance
        const formData = new FormData(formRef.current);
        
        // FormSubmit.co AJAX submission
        const response = await fetch('https://formsubmit.co/ajax/novelyn.rampola@gmail.com', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success === "true" || data.success === true) {
          // Show success message
          setSubmitStatus({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
          });
          
          // Mark form as submitted
          setIsFormSubmitted(true);
          
          // Reset form
          resetForm();
          
          // Reset success message after some time
          setTimeout(() => {
            setSubmitStatus({ success: false, message: '' });
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again or contact me directly via email.'
        });
      }
    }
  };
  
  // Social media links
  const socialLinks = [
    {
      name: 'Github',
      url: 'https://github.com/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/novelynrampola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    }
  ];
  
  return (
    <section id="contact" className="section contact-section" ref={contactRef}>
      <div className="container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Send me a message!"
        />
        
        <div className="contact-container">
          <div className="contact-info fade-in-left">
            <div className="contact-card">
              <div className="contact-card-pattern"></div>
              <h3 className="contact-card-title">Contact Information</h3>
              <p className="contact-text">
                Feel free to reach out using the form or through my direct contact details below. I'll get back to you as soon as possible!
              </p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p><a href="tel:+639123456789">(+63) 912-345-6789</a></p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:novelyn.rampola@gmail.com">novelyn.rampola@gmail.com</a></p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Davao City, Philippines</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-availability">
                <h4>Availability</h4>
                <div className="availability-status">
                  <span className="availability-indicator available"></span>
                  <span>Available for freelance</span>
                </div>
              </div>
              
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    className={`social-link ${activeSocialLink === index ? 'active' : ''}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    onMouseEnter={() => setActiveSocialLink(index)}
                    onMouseLeave={() => setActiveSocialLink(null)}
                  >
                    {link.icon}
                    <span className="social-link-tooltip">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="contact-form-container fade-in-right">
            <div className="contact-form-header">
              <h3>Send Me a Message</h3>
              <p>I'd love to hear from you! Fill out the form below.</p>
            </div>
            
            {/* First time submission requires a non-AJAX form submission to activate FormSubmit.co */}
            {!isFormSubmitted ? (
              <form 
                className="contact-form" 
                action="https://formsubmit.co/novelyn.rampola@gmail.com" 
                method="POST"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                {/* FormSubmit.co configuration */}
                <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting me! I've received your message and will get back to you soon. - Novelyn Rampola" />
                
                {/* Honeypot field to prevent spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.name && errors.name ? 'error' : ''}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Your Email
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.email && errors.email ? 'error' : ''}
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject (Optional)</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="9" x2="20" y2="9"></line>
                        <line x1="4" y1="15" x2="20" y2="15"></line>
                        <line x1="10" y1="3" x2="8" y2="21"></line>
                        <line x1="16" y1="3" x2="14" y2="21"></line>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    Your Message
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper textarea-wrapper">
                    <span className="input-icon textarea-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.message && errors.message ? 'error' : ''}
                      placeholder="Hello, I'd like to talk about..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  {touched.message && errors.message && (
                    <div className="error-message">{errors.message}</div>
                  )}
                </div>
                
                {submitStatus.message && (
                  <div className={`form-status ${submitStatus.success ? 'success' : 'error'}`}>
                    <span className="status-icon">
                      {submitStatus.success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    {submitStatus.message}
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-indicator"></span>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </Button>
              </form>
            ) : (
              /* After first submission, use AJAX for better UX */
              <form 
                className="contact-form" 
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.name && errors.name ? 'error' : ''}
                        placeholder="John Doe"
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Your Email
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={touched.email && errors.email ? 'error' : ''}
                        placeholder="example@gmail.com"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject (Optional)</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="9" x2="20" y2="9"></line>
                        <line x1="4" y1="15" x2="20" y2="15"></line>
                        <line x1="10" y1="3" x2="8" y2="21"></line>
                        <line x1="16" y1="3" x2="14" y2="21"></line>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    Your Message
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper textarea-wrapper">
                    <span className="input-icon textarea-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.message && errors.message ? 'error' : ''}
                      placeholder="Hello, I'd like to talk about..."
                      rows="5"
                    ></textarea>
                  </div>
                  {touched.message && errors.message && (
                    <div className="error-message">{errors.message}</div>
                  )}
                </div>
                
                {submitStatus.message && (
                  <div className={`form-status ${submitStatus.success ? 'success' : 'error'}`}>
                    <span className="status-icon">
                      {submitStatus.success ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      )}
                    </span>
                    {submitStatus.message}
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-indicator"></span>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className="contact-decoration dot-pattern"></div>
      <div className="contact-decoration circle-pattern"></div>
    </section>
  );
};

export default Contact;