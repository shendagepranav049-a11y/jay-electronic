import "./AboutSection.css";
import ScrollReveal from "./ScrollReveal";

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="logo-watermark"></div>
      <div className="about-container">

        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="about-heading">
            <div className="about-label-wrap">
              <span className="about-label-line"></span>

              <p className="section-label">
                ABOUT JAY ELECTRONICS
              </p>
            </div>

            <h2>
              Integrated technology
              <span> for a connected world.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="about-content">

          {/* Left Text */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="about-text">

              <p>
                Jay Electronics Pvt Ltd delivers integrated technology,
                security and infrastructure solutions designed for modern
                organizations and connected environments.
              </p>

              <p>
                Our solutions bring together electronic security,
                networking, telecom, audio visual, fire and safety,
                infrastructure and other technology capabilities.
              </p>

              <a href="/about" className="about-link">
                <span>Discover More</span>
                <span className="about-arrow">→</span>
              </a>

            </div>
          </ScrollReveal>

          {/* Right Highlight Card */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="about-highlight">

              <div className="highlight-top">
                <span className="highlight-number">01</span>
                <span className="highlight-line"></span>
              </div>

              <h3>
                Technology.
                <br />
                Security.
                <br />
                Infrastructure.
              </h3>

              <p>
                One integrated approach.
              </p>

              <div className="highlight-corner"></div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;