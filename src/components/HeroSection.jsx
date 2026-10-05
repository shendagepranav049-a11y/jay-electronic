import { useSiteContent } from '../utils/firebaseUtils';
import { motion } from 'framer-motion';

function HeroSection() {
  const { data: content, loading } = useSiteContent("hero", {
    subheading: "JAY ELECTRONICS PVT LTD",
    heading: "Technology.\nSecurity.\nInfrastructure.",
    description: "Integrated technology solutions for secure, connected and efficient environments.",
    primaryCtaText: "Explore Solutions",
  });

  if (loading) {
    return <section className="hero" id="home"></section>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="home">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-label" variants={itemVariants}>
          {content.subheading}
        </motion.p>

        <motion.h1 style={{ whiteSpace: 'pre-line' }} variants={itemVariants}>
          {content.heading}
        </motion.h1>

        <motion.p className="hero-description" variants={itemVariants}>
          {content.description}
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <a href="#solutions" className="btn-primary">
            {content.primaryCtaText}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
