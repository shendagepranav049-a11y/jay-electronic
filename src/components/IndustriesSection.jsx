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
  const { data: dbInd } = useSiteCollection("industries");
  const baseIndustries = dbInd.length > 0 ? dbInd : fallbackIndustries;
  
  // Duplicate the list for the infinite seamless marquee effect
  const industriesList = [...baseIndustries, ...baseIndustries];

  return (
    <section className="industries-white-section" id="industries">
      
      <div className="industries-white-container">
        <motion.div 
          className="industries-white-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          viewport={{ once: true }}
        >
          <div>
            <p className="industries-white-label">INDUSTRIES WE SERVE</p>
            <h2 className="industries-white-title">
              Tailored solutions for
              <span> diverse environments.</span>
            </h2>
          </div>
          <p className="industries-white-intro">
            Our engineering expertise spans across multiple sectors,
            understanding the unique compliance, operational, and
            scale requirements of each industry.
          </p>
        </motion.div>
      </div>

      {/* Infinite Moving Marquee Wrapper */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {industriesList.map((industry, index) => (
            <div
              key={index}
              className="marquee-card"
            >
              <div className="marquee-card-inner">
                <div className="marquee-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                  </svg>
                </div>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default IndustriesSection;