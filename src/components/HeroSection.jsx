import { motion } from 'framer-motion';

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background-overlay"></div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-label-top" variants={itemVariants}>
          SINCE 1989 • TECHNOLOGY INTEGRATION
        </motion.p>

        <motion.h1 variants={itemVariants}>
          Securing Businesses.<br/>
          Empowering Connectivity.<br/>
          Delivering Excellence.
        </motion.h1>

        <motion.p className="hero-description-new" variants={itemVariants}>
          JAY ELECTRONICS PRIVATE LIMITED is one of Maharashtra's trusted system integration companies specializing in Electronic Security, CCTV Surveillance, Networking Infrastructure, Audio Visual Systems, Access Control, Telecom Solutions and Smart Technology Integration.
        </motion.p>

        <motion.div className="hero-buttons-new" variants={itemVariants}>
          <a href="#contact" className="btn-solid-gold">
            Get Free Site Survey
          </a>
          <a href="#contact" className="btn-outline-gold">
            Request Quotation
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
