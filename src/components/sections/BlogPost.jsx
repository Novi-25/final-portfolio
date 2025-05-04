import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import blogPostsData from '../../data/blogPosts';
import './blog.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  // Find the post and related posts based on tags
  useEffect(() => {
    const currentPost = blogPostsData.find(post => post.id === id);
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find related posts that share tags with the current post
      const related = blogPostsData
        .filter(p => p.id !== id && p.tags.some(tag => currentPost.tags.includes(tag)))
        .slice(0, 3);
      
      setRelatedPosts(related);
    } else {
      // Post not found, redirect to blog list
      navigate('/blog');
    }
  }, [id, navigate]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (!post) {
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
            <span className="blog-date">{formatDate(post.date)}</span>
            <span className="blog-category">{post.category}</span>
            <span className="blog-read-time">{post.readTime} read</span>
          </div>
          
          <h1 className="blog-title">{post.title}</h1>
          
          <div className="blog-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="blog-post-cover">
        <img src={post.coverImage} alt={post.title} />
      </div>
      
      <div className="container">
        <div className="blog-post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <div className="blog-post-author">
          <div className="author-image">
            <img src="/images/profile.jpg" alt="Author" />
          </div>
          <div className="author-info">
            <h3>Written by Your Name</h3>
            <p>
              Software Developer passionate about creating beautiful and functional web experiences.
              When not coding, I enjoy writing about technology, design, and development.
            </p>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="related-posts">
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
        )}
      </div>
    </div>
  );
};

export default BlogPost;