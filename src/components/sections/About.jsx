import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import './about.css';

const About = () => {
  // Skills data
  const skills = {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'TypeScript', 'Sass/SCSS', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'RESTful APIs', 'PHP', 'MySQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Adobe XD', 'Responsive Design', 'Vercel', 'Netlify']
  };
  
  return (
    <section id="about" className="section about-section">
      <div className="wave-decoration about-wave-top"></div>
      
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my skills"
        />
        
        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image">
              <img src="/profile.jpg" alt="Profile" />
            </div>
            
            <div className="about-image-decoration circle-1"></div>
            <div className="about-image-decoration circle-2"></div>
            <div className="about-image-decoration dots"></div>
          </div>
          
          <div className="about-text">
            <h3>Hi there! I'm <span className="highlight">Novelyn Rampola</span></h3>
            
            <p>
              I'm a passionate software developer from Davao City, specializing in creating beautiful, 
              responsive websites and web applications. With expertise in both frontend and backend 
              technologies, I enjoy bringing creative ideas to life through clean and efficient code.
            </p>
            
            <p>
              My journey in web development began 4 years ago, and I've been continuously expanding 
              my skills ever since. I believe in writing maintainable code that provides exceptional 
              user experiences across all devices.
            </p>
            
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, and enjoying outdoor activities to maintain a healthy work-life balance.
            </p>
            
            <div className="about-buttons">
              <Button variant="primary">Download Resume</Button>
              <Button variant="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        
        <div className="skills-container">
          <h3 className="skills-title">My Skills</h3>
          
          <div className="skills-grid">
            <div className="skill-category">
              <h4 className="skill-category-title">Frontend Development</h4>
              <div className="skill-list">
                {skills.frontend.map((skill, index) => (
                  <div key={index} className="skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h4 className="skill-category-title">Backend Development</h4>
              <div className="skill-list">
                {skills.backend.map((skill, index) => (
                  <div key={index} className="skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h4 className="skill-category-title">Tools & Technologies</h4>
              <div className="skill-list">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wave-decoration about-wave-bottom"></div>
    </section>
  );
};

export default About;