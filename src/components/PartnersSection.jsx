import "./PartnersSection.css";
import { motion } from "framer-motion";

const partnerGroups = [
  {
    number: "01",
    category: "Security",
    partners: [
      "CP PLUS",
      "Matrix",
      "Dahua",
      "Honeywell",
      "Prama",
    ],
  },
  {
    number: "02",
    category: "Networking",
    partners: [
      "D-Link",
      "TP-Link",
      "Netgear",
      "Molex",
    ],
  },
  {
    number: "03",
    category: "Telecom",
    partners: [
      "Matrix",
      "Panasonic",
      "BeeTel",
    ],
  },
  {
    number: "04",
    category: "Audio Visual",
    partners: [
      "Sony",
      "Samsung",
      "BenQ",
      "Ahuja",
      "Bosch",
      "PeopleLink",
      "Kramer",
      "Milestone",
    ],
  },
];

function PartnersSection() {
  return (
    <section className="partners-section" id="partners">
      <motion.div 
        className="partners-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.155 } }
        }}
      >

        <motion.div 
          className="partners-header"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
          }}
        >

          <div>
            <div className="partners-label-wrap">
              <span className="partners-label-line"></span>

              <p className="partners-label">
                TECHNOLOGY PARTNERS
              </p>
            <div className="purple-gold-line"></div>
            </div>

            <h2 className="text-shine">
              Trusted technology
              <span> ecosystems.</span>
            </h2>
          </div>

          <p className="partners-intro">
            Jay Electronics works with established technology
            manufacturers and strategic brand partners across
            multiple solution categories.
          </p>

        </motion.div>


        <div className="partners-grid">

          {partnerGroups.map((group, index) => (
            <motion.article 
              className="partner-card"
              key={group.number}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
              }}
            >

              <div className="partner-top">

                <motion.span 
                  className="partner-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { delay: index * 0.2 + 0.3 } }}
                  viewport={{ once: true }}
                >
                  {group.number}
                </motion.span>

                <span className="partner-category">
                  {group.category}
                </span>

              </div>


              <div className="partner-content">

                <h3>
                  {group.category}
                </h3>

                <div className="partner-list">

                  {group.partners.map((partner) => (
                    <span key={partner}>
                      {partner}
                    </span>
                  ))}

                </div>

              </div>


              <motion.div 
                className="partner-line"
                initial={{ width: 0 }}
                whileInView={{ width: "100%", transition: { duration: 1.2, delay: index * 0.2 + 0.1 } }}
                viewport={{ once: true }}
              ></motion.div>

            </motion.article>
          ))}

        </div>


        <motion.div 
          className="partners-note"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
          }}
        >

          <span className="partners-note-mark">
            *
          </span>

          <p>
            Partner names shown for technology ecosystem
            representation. Final partner logos and certifications
            should be used only after client confirmation.
          </p>

        </motion.div>

      </motion.div>
    </section>
  );
}

export default PartnersSection;