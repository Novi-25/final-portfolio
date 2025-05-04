import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Button from '../common/Button';
import blogPostsData from '../../data/blogPosts';
import './blog.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [tableOfContents, setTableOfContents] = useState([]);
  
  // Find the post and related posts based on tags
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      const currentPost = blogPostsData.find(post => post.id === id);
      
      if (currentPost) {
        setPost(currentPost);
        document.title = `${currentPost.title} | Novelyn Rampola's Blog`;
        
        // Extract headings for table of contents
        const headings = extractHeadings(currentPost.content);
        setTableOfContents(headings);
        
        // Find related posts that share tags with the current post
        const related = blogPostsData
          .filter(p => p.id !== id && p.tags.some(tag => currentPost.tags.includes(tag)))
          .slice(0, 3);
        
        setRelatedPosts(related);
        setIsLoading(false);
      } else {
        // Post not found, redirect to blog list
        navigate('/blog');
      }
    }, 800);
    
    // Cleanup on unmount
    return () => {
      document.title = 'Novelyn Rampola | Software Developer';
    };
  }, [id, navigate]);
  
  // Track scroll to highlight current section in TOC
  useEffect(() => {
    if (!post || tableOfContents.length === 0) return;
    
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('.blog-post-content h1, .blog-post-content h2');
      if (headingElements.length === 0) return;
      
      // Find the heading that's currently in view
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        
        if (rect.top <= 100) {
          const headingText = heading.textContent;
          if (activeHeading !== headingText) {
            setActiveHeading(headingText);
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, activeHeading, tableOfContents]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Extract headings from markdown content
  const extractHeadings = (markdown) => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      headings.push({ level, text, id });
    }
    
    return headings;
  };
  
  // Handle share options toggle
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  // Share functions
  const shareUrl = window.location.href;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    copyLink: shareUrl
  };
  
  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Link copied to clipboard!');
        setShowShareOptions(false);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };
  
  // Smooth scroll to heading
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Navbar height + some padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="blog-post-loading">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }
  
  return (
    <div className="blog-post-page">
      <div className="blog-post-header">
        <div className="container">
          <Link to="/blog" className="back-to-blog">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to Blog
          </Link>
          
          <div className="blog-meta">
            <span className="blog-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {formatDate(post.date)}
            </span>
            <span className="blog-category">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              {post.category}
            </span>
            <span className="blog-read-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {post.readTime} read
            </span>
            
            <div className="blog-share">
              <button 
                className="share-button" 
                onClick={toggleShareOptions}
                aria-expanded={showShareOptions}
                aria-label="Share this post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share
              </button>
              
              {showShareOptions && (
                <div className="share-options">
                  <a 
                    href={shareLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Twitter
                  </a>
                  <a 
                    href={shareLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                  </a>
                  <a 
                    href={shareLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="share-option"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn
                  </a>
                  <button 
                    className="share-option"
                    onClick={copyToClipboard}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <h1 className="blog-title">{post.title}</h1>
          
          <div className="blog-tags">
            {post.tags.map((tag, index) => (
              <Link key={index} to={`/blog?tag=${tag}`} className="blog-tag">#{tag}</Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="blog-post-cover">
        <img src={post.coverImage} alt={post.title} />
      </div>
      
      <div className="container blog-post-container">
        {/* Table of contents for desktop */}
        {tableOfContents.length > 0 && (
          <aside className="blog-toc">
            <div className="toc-container">
              <h3 className="toc-title">Table of Contents</h3>
              <ul className="toc-list">
                {tableOfContents.map((heading, index) => (
                  <li 
                    key={index} 
                    className={`toc-item level-${heading.level} ${activeHeading === heading.text ? 'active' : ''}`}
                  >
                    <a 
                      href={`#${heading.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(heading.id);
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
        
        <div className="blog-post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <div className="blog-post-footer">
          <div className="blog-post-author">
            <div className="author-image">
              <img src="/images/profile.jpg" alt="Author" />
            </div>
            <div className="author-info">
              <h3>Written by Novelyn Rampola</h3>
              <p>
                Software Developer passionate about creating beautiful and functional web experiences.
                When not coding, I enjoy writing about technology, design, and development.
              </p>
              <div className="author-links">
                <a href="https://github.com/novelynrampola" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/novelynrampola" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://twitter.com/novelynrampola" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="blog-post-nav">
            <Button 
              variant="primary" 
              onClick={() => navigate('/blog')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              }
              iconPosition="left"
            >
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
      
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <div className="container">
            <h2>You might also like</h2>
            <div className="related-posts-grid">
              {relatedPosts.map(relatedPost => (
                <Link 
                  to={`/blog/${relatedPost.id}`} 
                  className="related-post-card" 
                  key={relatedPost.id}
                >
                  <div className="related-post-image">
                    <img src={relatedPost.coverImage} alt={relatedPost.title} />
                  </div>
                  <div className="related-post-content">
                    <h3>{relatedPost.title}</h3>
                    <p>{relatedPost.summary}</p>
                    <div className="related-post-meta">
                      <span>{formatDate(relatedPost.date)}</span>
                      <span>{relatedPost.readTime} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;