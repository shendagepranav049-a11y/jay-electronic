import { motion } from "framer-motion";

function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}) {
  const hiddenPositions = {
    up: {
      opacity: 0,
      y: 70,
      scale: 0.96,
    },
    down: {
      opacity: 0,
      y: -70,
      scale: 0.96,
    },
    left: {
      opacity: 0,
      x: -80,
      scale: 0.96,
    },
    right: {
      opacity: 0,
      x: 80,
      scale: 0.96,
    },
    fade: {
      opacity: 0,
      scale: 0.98,
    },
  };

  return (
    <motion.div
      className={className}
      initial={hiddenPositions[direction] || hiddenPositions.up}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;