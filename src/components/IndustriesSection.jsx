import "./IndustriesSection.css";
import ScrollReveal from "./ScrollReveal";

const industries = [
  {
    number: "01",
    title: "Government",
    description:
      "Technology and infrastructure solutions for government and public-sector environments.",
  },
  {
    number: "02",
    title: "Corporate",
    description:
      "Integrated technology solutions supporting secure and connected corporate workplaces.",
  },
  {
    number: "03",
    title: "Healthcare",
    description:
      "Reliable networking, security and infrastructure solutions for healthcare environments.",
  },
  {
    number: "04",
    title: "Education",
    description:
      "Connected technology infrastructure for educational institutions and campuses.",
  },
  {
    number: "05",
    title: "Industrial",
    description:
      "Technology and infrastructure solutions designed for industrial environments.",
  },
  {
    number: "06",
    title: "Telecom",
    description:
      "Telecom, networking and communication infrastructure for connected operations.",
  },
  {
    number: "07",
    title: "Commercial",
    description:
      "Integrated security, networking and technology solutions for commercial spaces.",
  },
  {
    number: "08",
    title: "Residential",
    description:
      "Smart security and technology infrastructure solutions for residential environments.",
  },
];

function IndustriesSection() {
  return (
    <section className="industries-section" id="industries">
      <div className="industries-container">

        <ScrollReveal direction="up">
          <div className="industries-header">

            <div>
              <div className="industries-label-wrap">
                <span className="industries-label-line"></span>

                <p className="industries-label">
                  INDUSTRIES WE SERVE
                </p>
              </div>

              <h2>
                Technology for
                <span> every environment.</span>
              </h2>
            </div>

            <p className="industries-intro">
              Jay Electronics delivers integrated technology,
              security and infrastructure solutions across
              diverse environments and sectors.
            </p>

          </div>
        </ScrollReveal>


        <div className="industries-grid">

          {industries.map((industry, index) => (
            <ScrollReveal
              key={industry.number}
              direction="up"
              delay={index * 0.07}
              duration={0.7}
            >
              <article className="industry-card ui-card">

                <div className="industry-top">

                  <span className="industry-number">
                    {industry.number}
                  </span>

                  <span className="industry-arrow">
                    ↗
                  </span>

                </div>


                <div className="industry-content">

                  <h3>
                    {industry.title}
                  </h3>

                  <p>
                    {industry.description}
                  </p>

                </div>


                <div className="industry-line"></div>

              </article>
            </ScrollReveal>
          ))}

        </div>

      </div>
    </section>
  );
}

export default IndustriesSection;