import { useSiteContent } from '../utils/firebaseUtils';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./WhyJaySection.css";

const strengths = [
  {
    number: "01",
    title: "Engineering-Led Approach",
    description: "Qualified telecom engineers support technical execution and help deliver reliable technology solutions.",
  },
  {
    number: "02",
    title: "Strategic Brand Alliances",
    description: "Established technology manufacturers and strategic partnerships support solution delivery across multiple technology domains.",
  },
  {
    number: "03",
    title: "Turnkey Execution",
    description: "Consulting, engineering, supply, installation and commissioning delivered through an integrated execution approach.",
  },
  {
    number: "04",
    title: "Service & Maintenance",
    description: "Post-commissioning support and SLA-based maintenance help keep deployed systems reliable and operational.",
  },
];

function WhyJaySection() {
  const { data: content, loading } = useSiteContent('whyJay', { heading: 'Built on experience.', description: 'Delivered with discipline.' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (loading) return null;

  return (
    <section className="why-jay-section" id="why-jay" ref={containerRef}>
      <motion.div 
        className="why-jay-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="why-jay-header"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
          }}
        >
          <div className="why-jay-label-wrap">
            <span className="why-jay-label-line"></span>
            <p className="why-jay-label">OUR PRINCIPLES</p>
          </div>
          <h2>
            {content?.heading || "Built on experience."}
            <span> {content?.description || "Delivered with discipline."}</span>
          </h2>
        </motion.div>

        <div className="why-jay-timeline">
          <motion.div className="timeline-line-bg" />
          <motion.div className="timeline-line-active" style={{ height: lineHeight }} />
          
          {strengths.map((strength, index) => (
            <motion.article 
              className="timeline-item"
              key={strength.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 0.2 } }
              }}
            >
              <div className="timeline-content">
                <div className="timeline-number">{strength.number}</div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
              <motion.div 
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, transition: { type: "spring", delay: 0.4 } }}
                viewport={{ once: true }}
              />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default WhyJaySection;