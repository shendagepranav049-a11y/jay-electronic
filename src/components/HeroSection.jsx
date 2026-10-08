import { motion } from 'framer-motion';
import { useSiteContent } from '../utils/firebaseUtils';
import './HeroSection.css';
import cctvBg from '../assets/cctv-bg.jpg';

function HeroSection() {
  const { data: content, loading } = useSiteContent("hero", {
    label: "SINCE 1989 • TECHNOLOGY INTEGRATION",
    heading: "Securing Businesses.\nEmpowering Connectivity.\nDelivering Excellence.",
    description: "JAY ELECTRONICS PRIVATE LIMITED is one of Maharashtra's trusted system integration companies specializing in Electronic Security, CCTV Surveillance, Networking Infrastructure, Audio Visual Systems, Access Control, Telecom Solutions and Smart Technology Integration.",
    primaryCTA: "Get Free Site Survey",
    secondaryCTA: "Request Quotation"
  });

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.155, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const headingLines = content.heading ? content.heading.split('\n') : [];

  return (
    <section className="hero-cinematic" id="home">
      {/* CCTV Background Image with Dark Overlay */}
      <div 
        className="hero-image-bg" 
        style={{ backgroundImage: `url(${cctvBg})` }}
      ></div>
      <div className="hero-image-overlay"></div>
      
      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-text-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="hero-label-premium" variants={itemVariants}>
            {content.label}
          </motion.div>

          <h1 className="hero-title-premium">
            {headingLines.map((line, idx) => (
              <motion.span key={idx} variants={itemVariants} className="hero-title-line">
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p className="hero-description-premium" variants={itemVariants}>
            {content.description}
          </motion.p>

          <motion.div className="hero-actions-premium" variants={itemVariants}>
            <a href="#contact" className="btn-solid-gold">
              {content.primaryCTA}
            </a>
            <a href="#contact" className="btn-outline-gold">
              {content.secondaryCTA}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
