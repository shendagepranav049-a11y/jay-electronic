import { useSiteCollection } from '../utils/firebaseUtils';
import "./SolutionsSection.css";
import { motion } from "framer-motion";

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
  const { data: dbSolutions } = useSiteCollection("solutions");
  const solutions = dbSolutions.length > 0 ? dbSolutions : fallbackSolutions;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="solutions-section" id="solutions">
      <div className="logo-watermark"></div>
      <motion.div 
        className="solutions-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >

        <motion.div className="solutions-header" variants={cardVariants}>
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
        </motion.div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id || index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="solution-card ui-card"
            >
              <motion.div 
                className="solution-number"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 5, color: 'var(--cyan)' }}
              >
                0{index + 1}
              </motion.div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default SolutionsSection;