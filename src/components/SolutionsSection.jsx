import "./SolutionsSection.css";
import ScrollReveal from "./ScrollReveal";

const solutions = [
  {
    number: "01",
    title: "Electronic Security",
    description:
      "IP CCTV, video surveillance, PTZ cameras, VMS and AI-driven security solutions.",
  },
  {
    number: "02",
    title: "Networking",
    description:
      "LAN, WAN, structured cabling, network switching, wireless networks and firewall solutions.",
  },
  {
    number: "03",
    title: "Telecom",
    description:
      "EPABX, IP-PBX, enterprise telephony and fibre optic network solutions.",
  },
  {
    number: "04",
    title: "Audio Visual",
    description:
      "Professional displays, projectors, video conferencing, public address and AV integration.",
  },
  {
    number: "05",
    title: "Fire & Safety",
    description:
      "Fire security, detection and smart safety systems for modern environments.",
  },
  {
    number: "06",
    title: "Infrastructure",
    description:
      "Fibre laying, cable ducting, tower erection and electrical and mechanical infrastructure works.",
  },
  {
    number: "07",
    title: "City Surveillance",
    description:
      "Large-scale surveillance systems for cities, public infrastructure and command environments.",
  },
  {
    number: "08",
    title: "Solar",
    description:
      "Commercial and industrial solar power projects with integrated engineering capabilities.",
  },
];

function SolutionsSection() {
  return (
    <section className="solutions-section" id="solutions">
      <div className="logo-watermark"></div>
      <div className="solutions-container">

        {/* =========================
            SECTION HEADER
        ========================== */}

        <ScrollReveal direction="up">
          <div className="solutions-header">

            <div>
              <div className="solutions-label-wrap">
                <span className="solutions-label-line"></span>

                <p className="solutions-label">
                  OUR SOLUTIONS
                </p>
              </div>

              <h2>
                Technology solutions
                <span> built around your needs.</span>
              </h2>
            </div>

            <p className="solutions-intro">
              From electronic security and networking to telecom,
              audio visual and infrastructure projects, Jay Electronics
              delivers integrated technology solutions.
            </p>

          </div>
        </ScrollReveal>


        {/* =========================
            SOLUTION CARDS
        ========================== */}

        <div className="solutions-grid">

          {solutions.map((solution, index) => (
            <ScrollReveal
              key={solution.number}
              direction="up"
              delay={index * 0.08}
              duration={0.7}
            >
              <article className="solution-card">

                <div className="solution-top">

                  <span className="solution-number">
                    {solution.number}
                  </span>

                  <span className="solution-arrow">
                    ↗
                  </span>

                </div>


                <div className="solution-content">

                  <h3>
                    {solution.title}
                  </h3>

                  <p>
                    {solution.description}
                  </p>

                </div>


                <div className="solution-line"></div>

              </article>
            </ScrollReveal>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SolutionsSection;