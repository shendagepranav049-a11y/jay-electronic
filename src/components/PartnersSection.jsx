import "./PartnersSection.css";
import ScrollReveal from "./ScrollReveal";

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
      <div className="partners-container">

        <ScrollReveal direction="up">
          <div className="partners-header">

            <div>
              <div className="partners-label-wrap">
                <span className="partners-label-line"></span>

                <p className="partners-label">
                  TECHNOLOGY PARTNERS
                </p>
              </div>

              <h2>
                Trusted technology
                <span> ecosystems.</span>
              </h2>
            </div>

            <p className="partners-intro">
              Jay Electronics works with established technology
              manufacturers and strategic brand partners across
              multiple solution categories.
            </p>

          </div>
        </ScrollReveal>


        <div className="partners-grid">

          {partnerGroups.map((group, index) => (
            <ScrollReveal
              key={group.number}
              direction="up"
              delay={index * 0.1}
              duration={0.75}
            >
              <article className="partner-card ui-card">

                <div className="partner-top">

                  <span className="partner-number">
                    {group.number}
                  </span>

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


                <div className="partner-line"></div>

              </article>
            </ScrollReveal>
          ))}

        </div>


        <ScrollReveal direction="up" delay={0.2}>

          <div className="partners-note">

            <span className="partners-note-mark">
              *
            </span>

            <p>
              Partner names shown for technology ecosystem
              representation. Final partner logos and certifications
              should be used only after client confirmation.
            </p>

          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}

export default PartnersSection;