import { useSiteContent } from '../utils/firebaseUtils';
import { motion } from "framer-motion";
import "./WhyJaySection.css";

const strengths = [
  {
    number: "01",
    title: "Engineering-Led Approach",
    description:
      "Qualified telecom engineers support technical execution and help deliver reliable technology solutions.",
  },
  {
    number: "02",
    title: "Strategic Brand Alliances",
    description:
      "Established technology manufacturers and strategic partnerships support solution delivery across multiple technology domains.",
  },
  {
    number: "03",
    title: "Turnkey Execution",
    description:
      "Consulting, engineering, supply, installation and commissioning delivered through an integrated execution approach.",
  },
  {
    number: "04",
    title: "Service & Maintenance",
    description:
      "Post-commissioning support and SLA-based maintenance help keep deployed systems reliable and operational.",
  },
];

function WhyJaySection() {
  const { data: content, loading } = useSiteContent('whyJay', { heading: 'Built on experience.', description: 'Delivered with discipline.' });
  if (loading) return null;
  return (
    <section className="why-jay-section" id="why-jay">
      <div className="logo-watermark"></div>
      <motion.div 
        className="why-jay-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >

        <motion.div 
          className="why-jay-header"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >

          <div>
            <div className="why-jay-label-wrap">
              <span className="why-jay-label-line"></span>

              <p className="why-jay-label">
                WHY JAY ELECTRONICS
              </p>
            </div>

            <h2>
              Built on experience.
              <span> Delivered with discipline.</span>
            </h2>
          </div>

          <p className="why-jay-intro">
            From engineering and technology partnerships to turnkey
            execution and ongoing maintenance, our approach is built
            around dependable project delivery.
          </p>

        </motion.div>


        <div className="why-jay-grid">

          {strengths.map((strength, index) => (
            <motion.article 
              className="why-jay-card"
              key={strength.number}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >

              <motion.div 
                className="why-jay-number"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.2 + 0.3 } }}
                viewport={{ once: true }}
              >
                {strength.number}
              </motion.div>

              <div className="why-jay-card-content">

                <h3>
                  {strength.title}
                </h3>

                <p>
                  {strength.description}
                </p>

              </div>

              <motion.div 
                className="why-jay-line"
                initial={{ width: 0 }}
                whileInView={{ width: "100%", transition: { duration: 0.8, delay: index * 0.2 + 0.1 } }}
                viewport={{ once: true }}
              ></motion.div>

            </motion.article>
          ))}

        </div>


        <motion.div 
          className="why-jay-statement"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
          }}
        >

          <div className="why-jay-statement-number">
            01—04
          </div>

          <div>
            <p className="why-jay-statement-label">
              OUR APPROACH
            </p>

            <h3>
              One integrated approach
              <span> from concept to execution.</span>
            </h3>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}

export default WhyJaySection;