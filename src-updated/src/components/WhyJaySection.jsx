import "./WhyJaySection.css";

const reasons = [
  {
    number: "01",
    title: "Engineering-Led Approach",
    description:
      "Qualified telecom engineers support the technical execution of projects with a focus on practical and reliable solutions.",
  },
  {
    number: "02",
    title: "Strategic Brand Alliances",
    description:
      "Established technology manufacturers and strategic partnerships support the delivery of suitable technology solutions.",
  },
  {
    number: "03",
    title: "Turnkey Execution",
    description:
      "From consulting and engineering to supply, installation and commissioning, projects can be executed through a complete turnkey approach.",
  },
  {
    number: "04",
    title: "Service & Maintenance",
    description:
      "Post-commissioning support and SLA-based maintenance help maintain system performance after deployment.",
  },
];

function WhyJaySection() {
  return (
    <section className="why-jay-section" id="why-jay">
      <div className="why-jay-container">

        <div className="why-jay-header">
          <span className="why-jay-label">WHY JAY ELECTRONICS</span>

          <h2>
            Engineering-led execution.
            <br />
            Long-term support.
          </h2>

          <p>
            A structured approach that combines technical expertise,
            strategic partnerships, turnkey execution and service support.
          </p>
        </div>

        <div className="why-jay-grid">
          {reasons.map((reason) => (
            <div className="why-jay-card" key={reason.number}>

              <div className="why-jay-number">
                {reason.number}
              </div>

              <div className="why-jay-line"></div>

              <h3>{reason.title}</h3>

              <p>{reason.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyJaySection;