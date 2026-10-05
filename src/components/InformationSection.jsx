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
      <div className="logo-watermark"></div>
      <motion.div 
        className="information-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >

        <motion.div 
          className="information-label"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          JAY ELECTRONICS
        </motion.div>

        <motion.div
          className="information-divider"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "circOut" } }
          }}
          style={{ height: '1px', backgroundColor: 'var(--cyan)', transformOrigin: 'left', margin: '20px auto', width: '100px' }}
        />

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {content.heading}
        </motion.h2>

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
          className="information-button"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {content.buttonText}
        </motion.a>

      </motion.div>
    </section>
  );
}

export default InformationSection;