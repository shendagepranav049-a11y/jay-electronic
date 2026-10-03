import "./ProjectsSection.css";

const projects = [
  {
    number: "01",
    location: "Paithan",
    title: "City Surveillance",
    details: "91 Cameras",
    description:
      "City-wide surveillance system including PTZ and varifocal cameras.",
    tags: ["PTZ", "VARIFOCAL 4MP", "IP SURVEILLANCE"],
  },
  {
    number: "02",
    location: "Tasgaon",
    title: "City Surveillance",
    details: "96 Cameras + IP PA System",
    description:
      "Integrated surveillance and public address infrastructure.",
    tags: ["PTZ", "VARIFOCAL 4MP", "IP PA"],
  },
  {
    number: "03",
    location: "Hinjewadi",
    title: "City Surveillance",
    details: "96 Cameras",
    description:
      "IP-based city surveillance infrastructure with centralized monitoring.",
    tags: ["PTZ", "VARIFOCAL 4MP", "SURVEILLANCE"],
  },
  {
    number: "04",
    location: "Ichalkaranji",
    title: "City Surveillance",
    details: "261 Cameras",
    description:
      "Large-scale city surveillance deployment with IP camera infrastructure.",
    tags: ["PTZ", "VARIFOCAL 4MP", "IP SURVEILLANCE"],
  },
  {
    number: "05",
    location: "Kolhapur",
    title: "City Surveillance",
    details: "165 Cameras",
    description:
      "Integrated surveillance infrastructure for city-level monitoring.",
    tags: ["PTZ", "VARIFOCAL 4MP", "SURVEILLANCE"],
  },
  {
    number: "06",
    location: "Sangli",
    title: "LAN Infrastructure",
    details: "300 Ports",
    description:
      "Structured LAN infrastructure implemented for enterprise requirements.",
    tags: ["LAN", "STRUCTURED CABLING", "NETWORKING"],
  },
  {
    number: "07",
    location: "Prakash Hospital",
    title: "LAN Infrastructure",
    details: "500 Ports",
    description:
      "Enterprise networking infrastructure supporting a large-scale environment.",
    tags: ["LAN", "NETWORKING", "INFRASTRUCTURE"],
  },
  {
    number: "08",
    location: "Enterprise Projects",
    title: "EPABX Solutions",
    details: "500 Port System",
    description:
      "Enterprise telephony infrastructure using EPABX technology.",
    tags: ["EPABX", "TELECOM", "ENTERPRISE"],
  },
];

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Header */}
        <div className="projects-header">
          <div>
            <p className="projects-label">
              PROJECT EXPERIENCE
            </p>

            <h2>
              Real projects.
              <span> Real infrastructure.</span>
            </h2>
          </div>

          <p className="projects-intro">
            Selected project experience across surveillance,
            networking and telecom infrastructure.
          </p>
        </div>

        {/* Projects */}
        <div className="projects-list">

          {projects.map((project) => (
            <article
              className="project-card"
              key={project.number}
            >
              <div className="project-number">
                {project.number}
              </div>

              <div className="project-main">

                <p className="project-location">
                  {project.location}
                </p>

                <h3>
                  {project.title}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              <div className="project-details">
                <p>PROJECT SCOPE</p>

                <strong>
                  {project.details}
                </strong>

                <span className="project-arrow">
                  ↗
                </span>
              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;