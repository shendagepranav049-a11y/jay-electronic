import "./IndustriesSection.css";

const industries = [
  {
    number: "01",
    title: "Government",
    description:
      "Technology, surveillance, networking and infrastructure solutions for government environments.",
  },
  {
    number: "02",
    title: "Corporate",
    description:
      "Integrated technology solutions for offices, enterprises and corporate environments.",
  },
  {
    number: "03",
    title: "Healthcare",
    description:
      "Security, networking, communication and AV infrastructure for healthcare environments.",
  },
  {
    number: "04",
    title: "Education",
    description:
      "Technology infrastructure supporting educational institutions and connected environments.",
  },
  {
    number: "05",
    title: "Industrial",
    description:
      "Security, telecom, networking and infrastructure solutions for industrial facilities.",
  },
  {
    number: "06",
    title: "Telecom",
    description:
      "Telecommunication and fibre-based infrastructure solutions for connected environments.",
  },
  {
    number: "07",
    title: "Commercial",
    description:
      "Integrated technology and security solutions for commercial spaces and businesses.",
  },
  {
    number: "08",
    title: "Residential",
    description:
      "Technology and security solutions designed for residential environments.",
  },
];

function IndustriesSection() {
  return (
    <section className="industries-section" id="industries">
      <div className="industries-container">

        <div className="industries-header">
          <div>
            <p className="industries-label">
              INDUSTRIES WE SERVE
            </p>

            <h2>
              Technology for
              <span> every environment.</span>
            </h2>
          </div>

          <p className="industries-intro">
            Our technology, security and infrastructure capabilities
            can support a wide range of connected environments.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry) => (
            <article
              className="industry-card"
              key={industry.number}
            >
              <div className="industry-top">
                <span className="industry-number">
                  {industry.number}
                </span>

                <span className="industry-arrow">
                  ↗
                </span>
              </div>

              <div className="industry-content">
                <h3>{industry.title}</h3>

                <p>{industry.description}</p>
              </div>

              <div className="industry-line"></div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default IndustriesSection;