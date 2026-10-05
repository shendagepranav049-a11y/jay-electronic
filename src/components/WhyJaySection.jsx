import "./WhyJaySection.css";
import ScrollReveal from "./ScrollReveal";

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
  return (
    <section className="why-jay-section" id="why-jay">
      <div className="why-jay-container">

        <ScrollReveal direction="up">
          <div className="why-jay-header">

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

          </div>
        </ScrollReveal>


        <div className="why-jay-grid">

          {strengths.map((strength, index) => (
            <ScrollReveal
              key={strength.number}
              direction="up"
              delay={index * 0.1}
              duration={0.75}
            >
              <article className="why-jay-card ui-card">

                <div className="why-jay-number">
                  {strength.number}
                </div>

                <div className="why-jay-card-content">

                  <h3>
                    {strength.title}
                  </h3>

                  <p>
                    {strength.description}
                  </p>

                </div>

                <div className="why-jay-line"></div>

              </article>
            </ScrollReveal>
          ))}

        </div>


        <ScrollReveal direction="up" delay={0.15}>

          <div className="why-jay-statement">

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

          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}

export default WhyJaySection;