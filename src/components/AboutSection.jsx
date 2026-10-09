import { useSiteContent } from '../utils/firebaseUtils';
import "./AboutSection.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';

function AboutSection() {
  const { data: content, loading } = useSiteContent("about", {
    heading: "Integrated technology for a connected world.",
    description: "Jay Electronics Pvt Ltd delivers integrated technology, security and infrastructure solutions designed for modern organizations and connected environments.\n\nOur solutions bring together electronic security, networking, telecom, audio visual, fire and safety, infrastructure and other technology capabilities."
  });
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (loading) return null;

  const standardFadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="about-standard-light" id="about" ref={sectionRef}>
      
      <div className="about-standard-container">
        <div className="about-standard-grid">
          
          {/* LEFT: Clean Typography */}
          <motion.div 
            className="about-standard-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div className="about-standard-badge" variants={standardFadeUp}>
              <span className="badge-line"></span>
              ABOUT THE COMPANY
            </motion.div>

            <motion.h2 className="about-standard-heading" variants={standardFadeUp}>
              {content.heading}
            </motion.h2>

            <motion.div className="about-standard-description" variants={standardFadeUp}>
              <p style={{ whiteSpace: 'pre-line' }}>{content.description}</p>
            </motion.div>

            <motion.div variants={standardFadeUp} className="about-standard-actions">
              <a href="#solutions" className="about-standard-btn">
                Discover Solutions
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Minimalist Parallax Grid */}
          <div className="about-standard-visuals">
            
            <motion.div 
              className="standard-card primary-card"
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="standard-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Integrated Engineering</h3>
              <p>A unified approach to technology, security, and infrastructure.</p>
            </motion.div>

            <motion.div 
              className="standard-card secondary-card"
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-stat">
                <strong>34+</strong>
                <span>Years of Trust</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;