import { useSiteContent } from '../utils/firebaseUtils';
import { motion } from "framer-motion";
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
    description: "Established technology manufacturers and strategic partnerships support solution delivery across multiple domains.",
  },
  {
    number: "03",
    title: "Turnkey Execution",
    description: "Consulting, engineering, supply, installation and commissioning delivered through an integrated approach.",
  },
  {
    number: "04",
    title: "Service & Maintenance",
    description: "Post-commissioning support and SLA-based maintenance help keep deployed systems reliable and operational.",
  },
];

function WhyJaySection() {
  const { data: content, loading } = useSiteContent('whyJay', { heading: 'Built on experience.', description: 'Delivered with discipline.' });

  if (loading) return null;

  return (
    <section className="why-jay-oblong-section" id="why-jay">
      <div className="why-jay-oblong-container">
        
        <motion.div 
          className="why-jay-oblong-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
        >
          <div className="why-jay-title-left">
            <p className="oblong-label">OUR PRINCIPLES</p>
            <h2>
              {content?.heading || "Built on experience."}
              <span> {content?.description || "Delivered with discipline."}</span>
            </h2>
          </div>
        </motion.div>

        {/* Oblong Moving Cards Layout */}
        <div className="oblong-cards-grid">
          {strengths.map((strength, index) => (
            <motion.div 
              className={`oblong-card oblong-delay-${index + 1}`}
              key={strength.number}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: index * 0.1 } }}
              viewport={{ once: true }}
            >
              <div className="oblong-card-inner">
                <div className="oblong-number-circle">
                  {strength.number}
                </div>
                <div className="oblong-text">
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </div>
                <div className="oblong-hover-glow"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyJaySection;