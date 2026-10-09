import { useSiteCollection } from '../utils/firebaseUtils';
import { motion } from "framer-motion";
import { useState } from "react";
import "./ProjectsSection.css";

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
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
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
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
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
    image: "https://images.unsplash.com/photo-1541884323281-229d44c80cb1?auto=format&fit=crop&w=1200&q=80"
  }
];

function ProjectsSection() {
  const { data: dbProjects } = useSiteCollection("projects");
  const projectsList = dbProjects.length > 0 ? dbProjects : fallbackProjects;
  
  // By default, the first project is expanded
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="projects-accordion-section" id="projects">
      <div className="projects-accordion-container">

        <motion.div 
          className="projects-accordion-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
        >
          <div className="projects-title-left">
            <p className="accordion-label">FEATURED PROJECTS</p>
            <h2>
              Delivering excellence <span>at scale.</span>
            </h2>
          </div>
          <p className="accordion-intro">
            Explore our portfolio of integrated technology deployments 
            across government, enterprise, and industrial sectors. 
            <strong> Hover or tap a panel to expand.</strong>
          </p>
        </motion.div>

        {/* Interactive Image Accordion */}
        <div className="accordion-gallery">
          {projectsList.map((project, index) => {
            const isActive = activeProject === index;
            return (
              <div 
                key={index} 
                className={`accordion-panel ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => setActiveProject(index)}
                style={{ backgroundImage: `url(${project.image})` }}
              >
                {/* Always visible vertical title on non-active panels */}
                <div className="panel-vertical-title">
                  <span>{project.number}</span>
                  <h4>{project.title}</h4>
                </div>

                {/* Content overlay that fades in when active */}
                <div className="panel-content-overlay">
                  <div className="panel-content-inner">
                    <div className="panel-badge">
                      <span className="icon">📍</span> {project.location}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="panel-stats">
                      {project.stats && project.stats.map((stat, i) => (
                        <div key={i} className="p-stat">
                          <strong>{stat.value}</strong>
                          <small>{stat.label}</small>
                        </div>
                      ))}
                    </div>

                    <button className="panel-btn">
                      View Case Study
                    </button>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;