import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Button from '../common/Button';
import blogPostsData from '../../data/blogPosts';
import './blog.css';

const BlogList = ({ previewMode = false }) => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const blogRef = useRef(null);
  
  // Get unique categories
  const categories = ['all', ...new Set(blogPostsData.map(post => post.category))];
  
  // Animate on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!blogRef.current) return;
      
      const rect = blogRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      
      if (isVisible) {
        setAnimateIn(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter and limit posts based on preview mode, active category, and search
  useEffect(() => {
    let filtered = [...blogPostsData];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.summary.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // If in preview mode, limit to 3 posts
    if (previewMode) {
      filtered = filtered.slice(0, 3);
    }
    
    setVisiblePosts(filtered);
  }, [activeCategory, searchQuery, previewMode]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
  };
  
  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <section 
      id="blog" 
      className={`section blog-section ${previewMode ? 'blog-preview' : ''} ${animateIn ? 'animate-in' : ''}`}
      ref={blogRef}
    >
      <div className="container">
        <SectionHeading
          title="Blog Posts"
          subtitle="Thoughts, tutorials, and insights from my journey as a developer"
        />
        
        {!previewMode && (
          <div className="blog-filters">
            <div className="blog-categories">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
            
            <div className="blog-search">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="search-clear" onClick={clearSearch} aria-label="Clear search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                <span className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        )}
        
        {visiblePosts.length > 0 ? (
          <div className="blog-grid">
            {visiblePosts.map((post, index) => (
              <Link 
                to={`/blog/${post.id}`} 
                className={`blog-card-link animate-item item-${index}`} 
                key={post.id}
              >
                <Card
                  variant="blog"
                  image={post.coverImage}
                  title={post.title}
                  description={
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-date">{formatDate(post.date)}</span>
                        <span className="blog-category">{post.category}</span>
                        <span className="blog-read-time">{post.readTime} read</span>
                      </div>
                      <div className="blog-summary">{post.summary}</div>
                      <div className="blog-tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="blog-tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="blog-empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 15s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3>No Posts Found</h3>
            <p>No posts match your current search criteria.</p>
            <Button variant="primary" onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}>
              View All Posts
            </Button>
          </div>
        )}
        
        {previewMode && (
          <div className="blog-actions">
            <Link to="/blog" className="view-all-link">
              View All Posts
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="blog-decoration circle-decoration"></div>
      <div className="blog-decoration dots-decoration"></div>
    </section>
  );
};

export default BlogList;