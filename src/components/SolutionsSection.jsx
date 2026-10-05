import { useSiteCollection } from '../utils/firebaseUtils';
import "./SolutionsSection.css";
import ScrollReveal from "./ScrollReveal";

const fallbackSolutions = [
  {
    order: 1,
    title: "Electronic Security",
    description: "IP CCTV, video surveillance, PTZ cameras, VMS and AI-driven security solutions.",
  },
  {
    order: 2,
    title: "Networking",
    description: "LAN, WAN, structured cabling, network switching, wireless networks and firewall solutions.",
  },
  {
    order: 3,
    title: "Telecom",
    description: "EPABX, IP-PBX, enterprise telephony and fibre optic network solutions.",
  },
  {
    order: 4,
    title: "Audio Visual",
    description: "Professional displays, projectors, video conferencing, public address and AV integration.",
  },
  {
    order: 5,
    title: "Fire & Safety",
    description: "Fire security, detection and smart safety systems for modern environments.",
  },
  {
    order: 6,
    title: "Infrastructure",
    description: "Fibre laying, cable ducting, tower erection and electrical and mechanical infrastructure works.",
  },
  {
    order: 7,
    title: "City Surveillance",
    description: "Large-scale surveillance systems for cities, public infrastructure and command environments.",
  },
  {
    order: 8,
    title: "Solar",
    description: "Commercial and industrial solar power projects with integrated engineering capabilities.",
  },
];

function SolutionsSection() {
  const { data: dbSolutions, loading } = useSiteCollection("solutions");
  const solutions = dbSolutions.length > 0 ? dbSolutions : fallbackSolutions;

  return (
    <section className="solutions-section" id="solutions">
      <div className="logo-watermark"></div>
      <div className="solutions-container">

        <ScrollReveal direction="up">
          <div className="solutions-header">
            <div>
              <div className="solutions-label-wrap">
                <span className="solutions-label-line"></span>
                <p className="solutions-label">OUR SOLUTIONS</p>
              </div>
              <h2>
                Technology solutions
                <span> built around your needs.</span>
              </h2>
            </div>
            <p className="solutions-intro">
              From electronic security and networking to telecom,
              audio visual and infrastructure projects, Jay Electronics
              delivers integrated technology solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <ScrollReveal
              key={solution.id || index}
              direction="up"
              delay={index * 0.1}
            >
              <div className="solution-card ui-card">
                <div className="solution-number">
                  0{index + 1}
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SolutionsSection;