import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import projectsData from '../../data/projects';
import './projects.css';

// Get all unique tags from projects
const getAllTags = () => {
  const tagsSet = new Set();
  projectsData.forEach(project => {
    project.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  return ['All', ...Array.from(tagsSet)];
};

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [tags] = useState(getAllTags());
  const projectsRef = useRef(null);
  
  // Filter and pagination
  useEffect(() => {
    let filtered = [...projectsData];
    
    // Apply tag filter if not 'All'
    if (filter !== 'All') {
      filtered = filtered.filter(project => project.tags.includes(filter));
    }
    
    // Limit if not showing all
    if (!showAll) {
      filtered = filtered.slice(0, 3);
    }
    
    setVisibleProjects(filtered);
  }, [filter, showAll]);
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowAll(false);
  };
  
  // Toggle show all
  const toggleShowAll = () => {
    setShowAll(!showAll);
    
    // Scroll to view newly loaded projects
    if (!showAll && projectsRef.current) {
      setTimeout(() => {
        const projectHeight = 400; // Approximate height of a project card
        window.scrollBy({
          top: projectHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  
  // Animation variants for the grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const tagVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  };
  
  return (
    <section id="projects" className="section projects-section" ref={projectsRef}>
      <div className="container">
        <SectionHeading 
          title="My Projects" 
          subtitle="Check out some of my recent work"
        />
        
        <div className="projects-filter">
          <div className="filter-tags">
            {tags.map((tag, index) => (
              <motion.button 
                key={tag}
                className={`filter-tag ${filter === tag ? 'active' : ''}`}
                onClick={() => handleFilterChange(tag)}
                variants={tagVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-item"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                layout
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Card
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  repoLink={project.repoLink}
                  liveLink={project.liveLink}
                  isHovered={hovered === project.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Show more/less button */}
        {filter === 'All' && projectsData.length > 3 || 
         filter !== 'All' && projectsData.filter(p => p.tags.includes(filter)).length > 3 ? (
          <div className="projects-actions">
            <Button 
              variant="outline" 
              onClick={toggleShowAll}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showAll ? (
                    <>
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </>
                  ) : (
                    <>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </>
                  )}
                </svg>
              }
            >
              {showAll ? 'Show Less' : 'Load More'}
            </Button>
          </div>
        ) : (
          <div className="projects-empty-state">
            {visibleProjects.length === 0 && (
              <div className="empty-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h3>No projects found for this filter</h3>
                <p>Try selecting a different technology or view all projects</p>
                <Button variant="primary" size="small" onClick={() => handleFilterChange('All')}>
                  View All Projects
                </Button>
              </div>
            )}
          </div>
        )}
        

      </div>
      
      {/* Background elements */}
      <div className="projects-bg-element projects-bg-circle"></div>
      <div className="projects-bg-element projects-bg-dots"></div>
    </section>
  );
};

export default Projects;