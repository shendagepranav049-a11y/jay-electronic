import { useSiteContent } from '../utils/firebaseUtils';
import "./AboutSection.css";
import { motion } from "framer-motion";

function AboutSection() {
  const { data: content, loading } = useSiteContent("about", {
    heading: "Engineering the future of enterprise security and connected infrastructure.",
    description: "Jay Electronics Pvt Ltd delivers integrated technology, security and infrastructure solutions designed for modern organizations and connected environments.\n\nOur solutions bring together electronic security, networking, telecom, audio visual, fire and safety, infrastructure and other technology capabilities."
  });

  if (loading) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const blurReveal = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const lineDraw = {
    hidden: { scaleX: 0, transformOrigin: "left" },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="about-unique-section" id="about">
      {/* Dynamic Background Blob */}
      <div className="about-blob-bg"></div>
      
      <div className="logo-watermark"></div>

      <motion.div 
        className="about-unique-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="about-unique-grid">
          
          {/* LEFT: Typography & Editorial */}
          <div className="about-editorial">
            <motion.div className="about-badge" variants={blurReveal}>
              <span className="badge-dot"></span>
              THE COMPANY
            </motion.div>

            <motion.h2 variants={blurReveal} className="about-main-title">
              {content.heading.split(' ').map((word, i) => (
                <span key={i} className={i === 2 || i === 3 ? 'teal-highlight' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h2>

            <motion.div className="about-divider" variants={lineDraw}></motion.div>

            <motion.div className="about-stats-row" variants={blurReveal}>
              <div className="about-stat">
                <h4>34+</h4>
                <p>Years of Excellence</p>
              </div>
              <div className="about-stat">
                <h4>500+</h4>
                <p>Enterprise Clients</p>
              </div>
              <div className="about-stat">
                <h4>100%</h4>
                <p>Integrated Approach</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Glassmorphism Floating Card */}
          <motion.div className="about-glass-wrapper" variants={blurReveal}>
            <div className="about-glass-card">
              <div className="glass-card-header">
                <div className="glass-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="glass-label">MISSION.SYS</div>
              </div>
              
              <div className="glass-card-body">
                <p style={{ whiteSpace: 'pre-line' }}>{content.description}</p>
              </div>

              <div className="glass-card-footer">
                <a href="#solutions" className="glass-btn">
                  Explore Capabilities
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Decorative technical elements around the card */}
            <div className="tech-cross cross-tl"></div>
            <div className="tech-cross cross-br"></div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;