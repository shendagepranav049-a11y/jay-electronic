import "./PartnersSection.css";

const partnerCategories = [
  {
    number: "01",
    title: "Security",
    brands: [
      "CP PLUS",
      "Matrix",
      "Dahua",
      "Honeywell",
      "Prama",
    ],
  },
  {
    number: "02",
    title: "Networking",
    brands: [
      "D-Link",
      "TP-Link",
      "Netgear",
      "Molex",
    ],
  },
  {
    number: "03",
    title: "Telecom",
    brands: [
      "Matrix",
      "Panasonic",
      "BeeTel",
    ],
  },
  {
    number: "04",
    title: "Audio Visual",
    brands: [
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

        {/* Section Header */}
        <div className="partners-header">
          <span className="partners-label">
            TECHNOLOGY PARTNERS
          </span>

          <h2>
            Trusted technology.
            <br />
            Strategic partnerships.
          </h2>

          <p>
            Our technology ecosystem includes established brands
            across security, networking, telecom and audio visual
            solutions.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="partners-grid">
          {partnerCategories.map((category) => (
            <div
              className="partner-card"
              key={category.number}
            >
              <div className="partner-number">
                {category.number}
              </div>

              <div className="partner-line"></div>

              <h3>{category.title}</h3>

              <div className="brand-list">
                {category.brands.map((brand) => (
                  <span
                    className="brand-item"
                    key={brand}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="partners-note">
          <span className="partners-note-line"></span>

          <p>
            Brand logos and partner certifications can be added
            after confirmation of authorized usage.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PartnersSection;