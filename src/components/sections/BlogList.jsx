import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import blogPostsData from '../../data/blogPosts';
import './blog.css';

const BlogList = ({ previewMode = false }) => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(blogPostsData.map(post => post.category))];
  
  // Filter and limit posts based on preview mode and active category
  useEffect(() => {
    let filtered = [...blogPostsData];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // If in preview mode, limit to 3 posts
    if (previewMode) {
      filtered = filtered.slice(0, 3);
    }
    
    setVisiblePosts(filtered);
  }, [activeCategory, previewMode]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <section id="blog" className={`section blog-section ${previewMode ? 'blog-preview' : ''}`}>
      <div className="container">
        <SectionHeading
          title="Blog Posts"
          subtitle="Thoughts, tutorials, and insights from my journey"
        />
        
        {!previewMode && (
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
        )}
        
        <div className="blog-grid">
          {visiblePosts.map(post => (
            <Link to={`/blog/${post.id}`} className="blog-card-link" key={post.id}>
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
        
        {previewMode && (
          <div className="blog-actions">
            <Link to="/blog" className="view-all-link">
              View All Posts
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;