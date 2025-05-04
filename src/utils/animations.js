// Initialize AOS (Animate On Scroll) library
export const initializeAnimations = () => {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  };
  
  // Typing animation for text elements
  export const createTypingAnimation = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
    
    return typing;
  };
  
  // Parallax effect for background elements
  export const addParallaxEffect = (element, speed = 0.5) => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  };
  
  // Scroll animation for elements
  export const scrollFadeIn = (elements, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      className: 'fade-in'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(mergedOptions.className);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: mergedOptions.threshold,
      rootMargin: mergedOptions.rootMargin
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
    
    // Return cleanup function
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  };