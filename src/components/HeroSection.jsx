import { motion } from 'framer-motion';
import './HeroSection.css';

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const headingLineVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="hero-cinematic" id="home">
      {/* Background elements */}
      <div className="hero-grid-bg"></div>
      <div className="hero-ambient-glow"></div>
      <div className="hero-ambient-glow right-glow"></div>
      <div className="hero-particles"></div>
      
      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-text-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-label-premium" variants={itemVariants}>
            <span className="label-line"></span>
            JAY ELECTRONICS PVT LTD
          </motion.div>

          <h1 className="hero-title-premium">
            <motion.span variants={headingLineVariants} className="hero-title-line">Technology.</motion.span>
            <motion.span variants={headingLineVariants} className="hero-title-line">Security.</motion.span>
            <motion.span variants={headingLineVariants} className="hero-title-line accent">Infrastructure.</motion.span>
          </h1>

          <motion.p className="hero-description-premium" variants={itemVariants}>
            Integrated technology solutions for secure, connected and efficient environments.
          </motion.p>

          <motion.div className="hero-actions-premium" variants={itemVariants}>
            <a href="#contact" className="btn-premium-primary">
              <span className="btn-text">Consult With Us</span>
              <span className="btn-glow"></span>
            </a>
            <a href="#solutions" className="btn-premium-secondary">
              Explore Solutions
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
