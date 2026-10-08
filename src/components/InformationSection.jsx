import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./InformationSection.css";
import { motion } from "framer-motion";

function InformationSection() {
  const [content, setContent] = useState({
    heading: "Latest Information",
    description:
      "For the latest information about our technology solutions and services, please get in touch with Jay Electronics.",
    buttonText: "Get in Touch",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteContent", "information"),
      (snapshot) => {
        if (snapshot.exists()) {
          setContent((prev) => ({
            ...prev,
            ...snapshot.data(),
          }));
        }
      },
      (error) => {
        console.error("Information loading error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="information"
      className="information-section"
    >
      <div className="information-tech-bg"></div>
      
      <motion.div 
        className="information-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div 
          className="information-glass-panel"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "circOut" } }
          }}
        >
          <div className="information-label-wrap">
            <span className="information-label-line"></span>
            <span className="information-label">JAY ELECTRONICS</span>
          </div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {content.heading}
          </motion.h2>

          <motion.div
            className="information-divider"
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 1.2, delay: 0.4 } }
            }}
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {content.description}
          </motion.p>

          <motion.a
            href="#contact"
            className="btn-solid-primary"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {content.buttonText}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default InformationSection;