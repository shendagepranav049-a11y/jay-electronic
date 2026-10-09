import { useSiteCollection } from '../utils/firebaseUtils';
import "./SolutionsSection.css";
import { motion } from "framer-motion";
import { useRef } from "react";

const fallbackSolutions = [
  { order: 1, title: "Electronic Security", description: "IP CCTV, video surveillance, PTZ cameras, VMS and AI-driven security solutions." },
  { order: 2, title: "Networking", description: "LAN, WAN, structured cabling, network switching, wireless networks and firewall solutions." },
  { order: 3, title: "Telecom", description: "EPABX, IP-PBX, enterprise telephony and fibre optic network solutions." },
  { order: 4, title: "Audio Visual", description: "Professional displays, projectors, video conferencing, public address and AV integration." },
  { order: 5, title: "Fire & Safety", description: "Fire security, detection and smart safety systems for modern environments." },
  { order: 6, title: "Infrastructure", description: "Fibre laying, cable ducting, tower erection and electrical and mechanical infrastructure works." },
  { order: 7, title: "City Surveillance", description: "Large-scale surveillance systems for cities, public infrastructure and command environments." },
  { order: 8, title: "Solar", description: "Commercial and industrial solar power projects with integrated engineering capabilities." },
];

function SolutionsSection() {
  const { data: dbSolutions } = useSiteCollection("solutions");
  const solutions = dbSolutions.length > 0 ? dbSolutions : fallbackSolutions;
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="solutions-slider-section" id="solutions">
      
      <motion.div 
        className="solutions-slider-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >

        {/* Header Area */}
        <motion.div className="solutions-slider-header" variants={headerVariants}>
          <div className="solutions-title-area">
            <p className="solutions-slider-label">OUR SOLUTIONS</p>
            <h2 className="solutions-slider-heading">
              Technology solutions <span>built around your needs.</span>
            </h2>
          </div>

          {/* Custom Navigation Arrows for Desktop */}
          <div className="solutions-slider-nav">
            <button onClick={scrollLeft} className="slider-arrow" aria-label="Previous">
              ←
            </button>
            <button onClick={scrollRight} className="slider-arrow" aria-label="Next">
              →
            </button>
          </div>
        </motion.div>

        {/* Horizontal Slider Area */}
        <div className="solutions-slider-wrapper" ref={sliderRef}>
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id || index}
              className="solution-slide-card"
              variants={cardVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <div className="slide-card-inner">
                <div className="slide-card-front">
                  <span className="slide-number">0{index + 1}</span>
                  <h3>{solution.title}</h3>
                  <div className="slide-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>

                <div className="slide-card-back">
                  <span className="slide-number-back">0{index + 1}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default SolutionsSection;