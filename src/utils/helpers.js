// Format a date string to a readable format
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Truncate text to a certain length and add ellipsis
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Generate a unique ID
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  // Smooth scroll to an element by ID
  export const scrollToElement = (id, offset = 0, behavior = 'smooth') => {
    const element = document.getElementById(id);
    
    if (element) {
      const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: position,
        behavior: behavior
      });
      
      return true;
    }
    
    return false;
  };
  
  // Detect if an element is in viewport
  export const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    
    return (
      rect.top + offset < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom > 0 &&
      rect.right > 0
    );
  };
  
  // Debounce function to limit how often a function is called
  export const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Create social media share links
  export const createShareLinks = (url, title, description) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
    };
  };
  
  // Helper to validate form fields
  export const validateField = (value, type) => {
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
        
      case 'text':
        return value.trim() ? '' : 'This field is required';
        
      case 'phone':
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
        
      default:
        return '';
    }
  };