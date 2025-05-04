import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import projectsData from '../../data/projects';
import './projects.css';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  
  // Initial display and filtering
  useEffect(() => {
    let filtered = projectsData;
    
    if (filter === 'featured') {
      filtered = projectsData.filter(project => project.featured);
    }
    
    if (!showAll) {
      filtered = filtered.slice(0, 3);
    }
    
    setVisibleProjects(filtered);
  }, [filter, showAll]);
  
  // Filter handlers
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowAll(false);
  };
  
  // Toggle show all
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeading 
          title="My Projects" 
          subtitle="Check out some of my recent work"
        />
        
        <div className="projects-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Projects
          </button>
          <button 
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => handleFilterChange('featured')}
          >
            Featured
          </button>
        </div>
        
        <div className="projects-grid">
          {visibleProjects.map(project => (
            <Card
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
              repoLink={project.repoLink}
              liveLink={project.liveLink}
            />
          ))}
        </div>
        
        {(filter === 'all' && projectsData.length > 3) || 
         (filter === 'featured' && projectsData.filter(p => p.featured).length > 3) ? (
          <div className="projects-actions">
            <Button 
              variant="outline" 
              onClick={toggleShowAll}
            >
              {showAll ? 'Show Less' : 'Load More'}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Projects;