import { useSiteContent } from '../utils/firebaseUtils';
import "./AboutSection.css";
import { motion } from "framer-motion";

function AboutSection() {
  const { data: content, loading } = useSiteContent("about", {
    heading: "Integrated technology\nfor a connected world.",
    description: "Jay Electronics Pvt Ltd delivers integrated technology, security and infrastructure solutions designed for modern organizations and connected environments.\n\nOur solutions bring together electronic security, networking, telecom, audio visual, fire and safety, infrastructure and other technology capabilities."
  });

  if (loading) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 60, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };
  
  const rightVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="logo-watermark"></div>
      <motion.div 
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        {/* Section Heading */}
        <motion.div className="about-heading" variants={textVariants}>
          <div className="about-label-wrap">
            <motion.span className="about-label-line" variants={lineVariants}></motion.span>

            <p className="section-label">
              ABOUT JAY ELECTRONICS
            </p>
            <div className="purple-gold-line"></div>
            <div className="purple-gold-line"></div>
            
          </div>

          <h2 style={{ whiteSpace: 'pre-line' }}>{content.heading}</h2>
        </motion.div>

        {/* Main Content */}
        <div className="about-content">

          {/* Left Text */}
          <motion.div className="about-text" variants={textVariants} style={{ whiteSpace: 'pre-line' }}>

            <p>{content.description}</p>

            <a href="#solutions" className="about-link">
              <span>Discover More</span>
              <span className="about-arrow">→</span>
            </a>

          </motion.div>

          {/* Right Highlight Card */}
          <motion.div className="about-highlight" variants={rightVariants}>

            <div className="highlight-top">
              <span className="highlight-number">01</span>
              <span className="highlight-line"></span>
            </div>

            <h3>
              Technology.
              <br />
              Security.
              <br />
              Infrastructure.
            </h3>

            <p>
              One integrated approach.
            </p>

            <div className="highlight-corner"></div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}

export default AboutSection;