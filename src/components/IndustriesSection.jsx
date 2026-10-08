import { useSiteCollection } from '../utils/firebaseUtils';
import { motion } from "framer-motion";
import "./IndustriesSection.css";

const fallbackIndustries = [
  { order: 1, title: "Government", description: "Securing critical national infrastructure with advanced surveillance and command center integrations." },
  { order: 2, title: "Corporate", description: "Smart building solutions, unified communications, and high-speed enterprise networking." },
  { order: 3, title: "Healthcare", description: "IP-PBX, public address systems, and secure access control for medical facilities." },
  { order: 4, title: "Education", description: "Campus-wide Wi-Fi, digital classrooms, and perimeter security for educational institutions." },
  { order: 5, title: "Industrial", description: "Ruggedized CCTV, industrial fire safety, and wide-area networking for manufacturing plants." },
  { order: 6, title: "Telecom", description: "Fiber optic networks, enterprise telephony, and communication infrastructure." },
  { order: 7, title: "Commercial", description: "Integrated security, access control, and AV solutions for commercial real estate." },
  { order: 8, title: "Residential", description: "Smart home automation, video door phones, and community surveillance." }
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
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >

        <motion.div 
          className="industries-header"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
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
              <div className="industry-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="industry-content">
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
              <div className="industry-connector-line"></div>
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