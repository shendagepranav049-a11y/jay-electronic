import { useSiteCollection } from '../utils/firebaseUtils';
import { motion } from "framer-motion";
import "./IndustriesSection.css";

const fallbackIndustries = [
  { order: 1, title: "Government & Defense", description: "Securing critical national infrastructure with advanced surveillance and command center integrations." },
  { order: 2, title: "Corporate & Enterprise", description: "Smart building solutions, unified communications, and high-speed enterprise networking." },
  { order: 3, title: "Manufacturing & Industrial", description: "Ruggedized CCTV, industrial fire safety, and wide-area networking for manufacturing plants." },
  { order: 4, title: "Healthcare & Hospitals", description: "IP-PBX, public address systems, and secure access control for medical facilities." },
  { order: 5, title: "Education & Campuses", description: "Campus-wide Wi-Fi, digital classrooms, and perimeter security for educational institutions." },
  { order: 6, title: "Transport & Logistics", description: "Automated surveillance, boom barriers, and communication infrastructure for transport hubs." }
];

function IndustriesSection() {
  const { data: dbInd, loading } = useSiteCollection("industries");
  const industriesList = dbInd.length > 0 ? dbInd : fallbackIndustries;

  return (
    <section className="industries-section" id="industries">
      <div className="logo-watermark"></div>
      <motion.div 
        className="industries-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >

        <motion.div 
          className="industries-header"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <div>
            <div className="industries-label-wrap">
              <span className="industries-label-line"></span>
              <p className="industries-label">INDUSTRIES WE SERVE</p>
            </div>
            <h2>
              Tailored solutions for
              <span> diverse environments.</span>
            </h2>
          </div>
          <p className="industries-intro">
            Our engineering expertise spans across multiple sectors,
            understanding the unique compliance, operational, and
            scale requirements of each industry.
          </p>
        </motion.div>

        <div className="industries-grid">
          {industriesList.map((industry, index) => (
            <motion.div
              key={industry.id || index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05 }}
              className="industry-card ui-card"
            >
              <div className="industry-content">
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
              <motion.div 
                className="industry-hover-line"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              ></motion.div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default IndustriesSection;