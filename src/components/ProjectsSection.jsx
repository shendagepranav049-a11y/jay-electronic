import { useSiteCollection } from '../utils/firebaseUtils';
import "./ProjectsSection.css";
import ScrollReveal from "./ScrollReveal";

const fallbackProjects = [
  {
    number: "01",
    title: "City Surveillance System",
    location: "Metro City Phase I",
    description: "Deployment of 500+ IP PTZ cameras with centralized AI video analytics and command center integration.",
    stats: [
      { label: "Cameras", value: "500+" },
      { label: "Analytics", value: "12 Types" }
    ],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "02",
    title: "Enterprise Networking",
    location: "Global Tech Park",
    description: "Complete structured cabling and active networking for a 10-story IT park supporting 5,000+ endpoints.",
    stats: [
      { label: "Endpoints", value: "5000+" },
      { label: "Fiber", value: "12km" }
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "03",
    title: "Industrial Fire & Safety",
    location: "Manufacturing Hub",
    description: "Intelligent fire detection and suppression system integrated with public address and access control.",
    stats: [
      { label: "Sensors", value: "1200+" },
      { label: "Zones", value: "45" }
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "04",
    title: "Command Center AV",
    location: "State Police HQ",
    description: "State-of-the-art video wall integration and audio conferencing system for mission critical operations.",
    stats: [
      { label: "Displays", value: "24x" },
      { label: "Uptime", value: "99.99%" }
    ],
    image: "https://images.unsplash.com/photo-1541884323281-229d44c80cb1?auto=format&fit=crop&w=800&q=80"
  }
];

function ProjectsSection() {
  const { data: dbProjects, loading } = useSiteCollection("projects");
  const projectsList = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  return (
    <section className="projects-section" id="projects">
      <div className="logo-watermark"></div>
      <div className="projects-container">

        <ScrollReveal direction="up">
          <div className="projects-header">
            <div>
              <div className="projects-label-wrap">
                <span className="projects-label-line"></span>
                <p className="projects-label">FEATURED PROJECTS</p>
              </div>
              <h2>
                Delivering excellence
                <span> at scale.</span>
              </h2>
            </div>
            <p className="projects-intro">
              Explore our portfolio of integrated technology deployments 
              across government, enterprise, and industrial sectors.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {projectsList.map((project, index) => (
            <ScrollReveal
              key={project.id || index}
              direction="up"
              delay={index * 0.1}
            >
              <div className="project-card ui-card">
                <div className="project-image-wrapper">
                  <div className="project-number">
                    {project.number || `0\${index + 1}`}
                  </div>
                  <img src={project.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <a href="#" className="project-view-btn">View Details</a>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-location">
                      <span className="icon">📍</span> 
                      {project.location || 'Location missing'}
                    </span>
                  </div>
                  
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  {project.stats && (
                    <div className="project-stats">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="stat-item">
                          <span className="stat-value">{stat.value}</span>
                          <span className="stat-label">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="projects-footer">
          <a href="#" className="btn-secondary">View All Projects</a>
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;