import { useSiteCollection } from '../utils/firebaseUtils';
import "./IndustriesSection.css";
import ScrollReveal from "./ScrollReveal";

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
      <div className="industries-container">

        <ScrollReveal direction="up">
          <div className="industries-header">
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
          </div>
        </ScrollReveal>

        <div className="industries-grid">
          {industriesList.map((industry, index) => (
            <ScrollReveal
              key={industry.id || index}
              direction="up"
              delay={index * 0.1}
            >
              <div className="industry-card ui-card">
                <div className="industry-content">
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </div>
                <div className="industry-hover-line"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default IndustriesSection;